import os


class DatasetCatalog:
    DATA_DIR = "datasets"
    DATASETS = {
        "cuhkpedes_train": {
            "img_dir": "",
            "ann_file": "annotations/annotations.json",
        },
        "cuhkpedes_val": {
            "img_dir": "",
            "ann_file": "annotations/annotations.json",
        },
        "cuhkpedes_test": {
            "img_dir": "",
            "ann_file": "annotations/annotations.json",
        },
    }

    @staticmethod
    def get(root, name):
        if "cuhkpedes" in name:
            data_dir = DatasetCatalog.DATA_DIR
            attrs = DatasetCatalog.DATASETS[name]
            args = dict(
                root=os.path.join(root, data_dir, attrs["img_dir"]),
                ann_file=os.path.join(root, data_dir, attrs["ann_file"]),
            )
            return dict(
                factory="CUHKPEDESDataset",
                args=args,
            )
        raise RuntimeError("Dataset not available: {}".format(name))