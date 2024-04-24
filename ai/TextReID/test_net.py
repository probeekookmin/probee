import argparse
import os
from argparse import Namespace

import torch
import torch.nn.parallel
import torch.optim
import torch.utils.data
import torch.utils.data.distributed

from lib.config import cfg
from lib.data import make_data_loader
from lib.engine.inference import inference
from lib.models.model import build_model
from lib.utils.checkpoint import Checkpointer
from lib.utils.comm import get_rank, synchronize
from lib.utils.directory import makedir
from lib.utils.logger import setup_logger


def main():
    parser = argparse.ArgumentParser(
        description="PyTorch Image-Text Matching Inference"
    )
    parser.add_argument(
        "--root",
        default="./",
        help="root path",
        type=str,
    )
    parser.add_argument(
        "--config-file",
        default="",
        metavar="FILE",
        help="path to config file",
        type=str,
    )
    parser.add_argument(
        "--checkpoint-file",
        default="",
        metavar="FILE",
        help="path to checkpoint file",
        type=str,
    )
    parser.add_argument(
        "--local_rank",
        default=0,
        type=int,
    )
    parser.add_argument(
        "opts",
        help="Modify config options using the command-line",
        default=None,
        nargs=argparse.REMAINDER,
    )
    parser.add_argument(
        "--load-result",
        help="Use saved reslut as prediction",
        action="store_true",
    )
    parser.add_argument(
        "--data-dir",
        default="./datasets/",
        type=str,
    )
    parser.add_argument(
        "--search-num",
        default=0,
        type=int,
    )
    parser.add_argument(
        "--query",
        default="a man wearing a white shirts and black pants",
        type=str,
    )
    parser.add_argument(
        "--save-folder",
        default="./output/output.json",
        type=str,
    )

    args = parser.parse_args()
    detect(args)

def findByText(root="./", config_file="configs/cuhkpedes/moco_gru_cliprn50_ls_bs128_2048.yaml", checkpoint_file="output/cuhkpedes/moco_gru_cliprn50_ls_bs128_2048/best.pth", 
               local_rank=0, opts=[], load_result=False, search_num=0,query="",data_dir = "./datasets/", save_folder = "./output/output.json"):
    # 매개변수를 Namespace 객체로 묶기
    args = Namespace(
        root=root,
        config_file=root+"/"+config_file,
        checkpoint_file=root+"/"+checkpoint_file,
        local_rank=local_rank,
        opts=opts,
        load_result=load_result,
        search_num=search_num,
        query = query,
        data_dir = data_dir,
        save_folder = save_folder
    )
    detect(args)

# server에서 쓸 수 있게 함수화
def detect(args):
    num_gpus = int(os.environ["WORLD_SIZE"]) if "WORLD_SIZE" in os.environ else 1
    distributed = num_gpus > 1

    if distributed:
        torch.cuda.set_device(args.local_rank)
        torch.distributed.init_process_group(backend="nccl", init_method="env://")
        synchronize()

    cfg.defrost()
    cfg.merge_from_file(args.config_file)
    cfg.merge_from_list(args.opts)
    cfg.ROOT = args.root
    cfg.DATASETS.DIR = args.data_dir
    cfg.freeze()

    model = build_model(cfg)
    model.to(cfg.MODEL.DEVICE)

    output_dir = os.path.join(
        args.root, "./output", "/".join(args.config_file.split("/")[-2:])[:-5]
    )
    checkpointer = Checkpointer(model, save_dir=output_dir)
    _ = checkpointer.load(args.checkpoint_file)

    output_folders = list()
    dataset_names = cfg.DATASETS.TEST
    for dataset_name in dataset_names:
        output_folder = os.path.join(output_dir, "inference", dataset_name)
        makedir(output_folder)
        output_folders.append(output_folder)

    data_loaders_val = make_data_loader(cfg, is_train=False, is_distributed=distributed)
    for output_folder, dataset_name, data_loader_val in zip(
        output_folders, dataset_names, data_loaders_val
    ):  
        logger = setup_logger("PersonSearch", output_folder, get_rank())
        logger.info("Using {} GPUs".format(num_gpus))
        logger.info(cfg)

        inference(
            model,
            data_loader_val,
            dataset_name=dataset_name,
            device=cfg.MODEL.DEVICE,
            output_folder=output_folder,
            save_data=False,
            rerank=True,
            search_num = args.search_num,
            query = args.query,
            save_folder = args.save_folder
        )
        synchronize()


if __name__ == "__main__":
    main()
