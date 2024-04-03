import logging
import os

import numpy as np
import torch
import torch.nn.functional as F
from torchvision.transforms.functional import to_pil_image
import matplotlib.pyplot as plt
from PIL import Image

from lib.utils.logger import table_log

# 텐서보드 import
from torchvision.utils import make_grid
from torch.utils.tensorboard import SummaryWriter

def rank(similarity, q_pids, g_pids, topk=[1, 5, 10], get_mAP=True):
    max_rank = max(topk)
    if get_mAP:
        indices = torch.argsort(similarity, dim=1, descending=True)
    else:
        # acclerate sort with topk
        _, indices = torch.topk(
            similarity, k=max_rank, dim=1, largest=True, sorted=True
        )  # q * topk
    indices = indices.to(g_pids.device)
    pred_labels = g_pids[indices]  # q * k
    matches = pred_labels.eq(q_pids.view(-1, 1))  # q * k

    all_cmc = matches[:, :max_rank].cumsum(1)
    all_cmc[all_cmc > 1] = 1
    all_cmc = all_cmc.float().mean(0) * 100
    all_cmc = all_cmc[topk - 1]

    if not get_mAP:
        return all_cmc, indices

    num_rel = matches.sum(1)  # q
    tmp_cmc = matches.cumsum(1)  # q * k
    tmp_cmc = [tmp_cmc[:, i] / (i + 1.0) for i in range(tmp_cmc.shape[1])]
    tmp_cmc = torch.stack(tmp_cmc, 1) * matches
    AP = tmp_cmc.sum(1) / num_rel  # q
    mAP = AP.mean() * 100
    return all_cmc, mAP, indices


def jaccard(a_list, b_list):
    return float(len(set(a_list) & set(b_list))) / float(len(set(a_list) | set(b_list)))


def jaccard_mat(row_nn, col_nn):
    jaccard_sim = np.zeros((row_nn.shape[0], col_nn.shape[0]))
    # FIXME: need optimization
    for i in range(row_nn.shape[0]):
        for j in range(col_nn.shape[0]):
            jaccard_sim[i, j] = jaccard(row_nn[i], col_nn[j])
    return torch.from_numpy(jaccard_sim)


def k_reciprocal(q_feats, g_feats, neighbor_num=5, alpha=0.05):
    qg_sim = torch.matmul(q_feats, g_feats.t())  # q * g
    gg_sim = torch.matmul(g_feats, g_feats.t())  # g * g

    qg_indices = torch.argsort(qg_sim, dim=1, descending=True)
    gg_indices = torch.argsort(gg_sim, dim=1, descending=True)

    qg_nn = qg_indices[:, :neighbor_num]  # q * n
    gg_nn = gg_indices[:, :neighbor_num]  # g * n

    jaccard_sim = jaccard_mat(qg_nn.cpu().numpy(), gg_nn.cpu().numpy())  # q * g
    jaccard_sim = jaccard_sim.to(qg_sim.device)
    return alpha * jaccard_sim  # q * g


def get_unique(image_ids):
    keep_idx = {}
    for idx, image_id in enumerate(image_ids):
        if image_id not in keep_idx.keys():
            keep_idx[image_id] = idx
    return torch.tensor(list(keep_idx.values()))


def evaluation(
    dataset,
    predictions,
    output_folder,
    topk,
    cap,
    save_data=True,
    rerank=True,
):
    logger = logging.getLogger("PersonSearch.inference")
    data_dir = os.path.join(output_folder, "inference_data.npz")

    if predictions is None:
        inference_data = np.load(data_dir)
        logger.info("Load inference data from {}".format(data_dir))
        image_pid = torch.tensor(inference_data["image_pid"])
        text_pid = torch.tensor(inference_data["text_pid"])
        similarity = torch.tensor(inference_data["similarity"])
        if rerank:
            rvn_mat = torch.tensor(inference_data["rvn_mat"])
            rtn_mat = torch.tensor(inference_data["rtn_mat"])
    else:
        image_ids, pids = [], []
        image_global, text_global = [], []

        # FIXME: need optimization
        for idx, prediction in predictions.items():
            image_id, pid = dataset.get_id_info(idx)
            image_ids.append(image_id)
            pids.append(pid)
            image_global.append(prediction[0])
            if len(prediction) == 2:
                # text query를 하나만 넣었으므로, text emgedding은 배치의 제일 처음 이미지에만 들어감
                # 왜냐하면 유사도 검사 시 배치 별로 검사를 했으니까
                text_global.append(prediction[1])

        pids = list(map(int, pids))
        image_pid = torch.tensor(pids)
        text_pid = torch.tensor(pids)
        image_global = torch.stack(image_global, dim=0)
        text_global = torch.stack(text_global, dim=0)

        keep_idx = get_unique(image_ids)
        image_global = image_global[keep_idx]
        image_pid = image_pid[keep_idx]

        image_global = F.normalize(image_global, p=2, dim=1)
        text_global = F.normalize(text_global, p=2, dim=1)

        similarity = torch.matmul(text_global, image_global.t())

        writer = SummaryWriter()
        # top 10 results 반환
        sorted_indices = torch.argsort(similarity[0], descending=True)
        sorted_values = similarity[0][sorted_indices]
        top_k = 10
        images = []
        # similarities = ""
        print(cap[0])
        for index, value in zip(sorted_indices[:top_k], sorted_values[:top_k]):
            image_id, pid = dataset.get_id_info(idx)
            img, caption, idx, query = dataset.__getitem__(index)
            images.append(img)
            print(f"Index: {index}, Similarity: {value}, pid: {pid}")
            # similarities += str(value) + "\t"
        grid_img = make_grid(images, nrow=10)
        writer.add_image("Query <%s>"%cap[0], grid_img)
        # writer.add_text(f"Captions for Query {i}", cap[i])
        writer.close()