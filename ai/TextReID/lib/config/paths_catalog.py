import os


class DatasetCatalog:
    DATA_DIR = ""
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
    def get(root, name, data_dir):
        if "cuhkpedes" in name:
            # data_dir = input("Input Dataset Directory: ")
            # annotation_dir = input("Input Annotation Directory: ")
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