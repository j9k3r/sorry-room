import os
from django.conf import settings
import time
import sys
from collections import namedtuple
from pathlib import Path

import cv2
import matplotlib.pyplot as plt
import numpy as np

import openvino as ov
import torch

from pathlib import Path
import time

class ImageCleaner:
    def process(self, image, request_data):
        # Ваша логика обработки изображения
        current_time = str(time.time()).replace('.', '_')
        BASE_DIR = settings.BASE_DIR
        utils_file_path = Path(__file__).resolve().parent / "notebooks/utils/notebook_utils.py"
        notebook_directory_path = Path(__file__).resolve().parent / "notebooks/205-vision-background-removal/"

        sys.path.append(str(utils_file_path.parent))
        sys.path.append(str(notebook_directory_path))

        from notebook_utils import load_image
        from model.u2net import U2NET, U2NETP

        model_config = namedtuple("ModelConfig", ["name", "url", "model", "model_args"])

        u2net_lite = model_config(
            name="u2net_lite",
            url="https://drive.google.com/uc?id=1rbSTGKAE-MTxBYHd-51l2hMOQPT_7EPy",
            model=U2NETP,
            model_args=(),
        )
        u2net = model_config(
            name="u2net",
            url="https://drive.google.com/uc?id=1ao1ovG1Qtx4b7EoskHXmi2E9rp5CHLcZ",
            model=U2NET,
            model_args=(3, 1),
        )
        u2net_human_seg = model_config(
            name="u2net_human_seg",
            url="https://drive.google.com/uc?id=1-Yg0cxgrNhHP-016FPdp902BR-kSsA4P",
            model=U2NET,
            model_args=(3, 1),
        )

        u2net_model = u2net_human_seg
        # MODEL_DIR = "/code/django/vino/image_cleaner/model"
        MODEL_DIR = Path(__file__).resolve().parent / "model"
        model_path = Path(MODEL_DIR) / u2net_model.name / Path(u2net_model.name).with_suffix(".pth")

        # Load the model.
        net = u2net_model.model(*u2net_model.model_args)
        net.eval()

        # Load the weights.
        print(f"Loading model weights from: '{model_path}'")
        net.load_state_dict(state_dict=torch.load(model_path, map_location="cpu"))

        model_ir = ov.convert_model(net, example_input=torch.zeros((1, 3, 512, 512)), input=([1, 3, 512, 512]))

        # IMAGE_URI = str(Path(__file__).resolve().parent / "files/src.jpg")
        # IMAGE_URI = os.path.join(BASE_DIR, 'files', 'src.jpg')
        # Получаем изображение из запроса POST
        image_data = request_data.FILES['img_src']

        image_src_name = os.path.splitext(image_data.name)[0]

        # Конвертируем данные изображения в формат, который можно использовать cv2
        nparr = np.fromstring(image_data.read(), np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        # Инвертируем цветовые каналы
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        # Можно сразу обрабатывать изображение без его сохранения на диск


        # IMAGE_URI = os.path.join(BASE_DIR, 'files', 'src.jpg')

        input_mean = np.array([123.675, 116.28, 103.53]).reshape(1, 3, 1, 1)
        input_scale = np.array([58.395, 57.12, 57.375]).reshape(1, 3, 1, 1)

        # image = cv2.cvtColor(
        #     src=load_image(IMAGE_URI),
        #     code=cv2.COLOR_BGR2RGB,
        # )

        resized_image = cv2.resize(src=image, dsize=(512, 512))

        # resized_image = cv2.resize(src=image, dsize=(512, 512))
        # Convert the image shape to a shape and a data type expected by the network
        # for OpenVINO IR model: (1, 3, 512, 512).
        input_image = np.expand_dims(np.transpose(resized_image, (2, 0, 1)), 0)

        input_image = (input_image - input_mean) / input_scale

        import ipywidgets as widgets

        core = ov.Core()
        device = widgets.Dropdown(
            options=core.available_devices + ["AUTO"],
            value='AUTO',
            description='Device:',
            disabled=False,
        )

        device

        core = ov.Core()
        # Load the network to OpenVINO Runtime.
        compiled_model_ir = core.compile_model(model=model_ir, device_name=device.value)
        # Get the names of input and output layers.
        input_layer_ir = compiled_model_ir.input(0)
        output_layer_ir = compiled_model_ir.output(0)

        # Do inference on the input image.
        start_time = time.perf_counter()
        result = compiled_model_ir([input_image])[output_layer_ir]
        end_time = time.perf_counter()
        print(
            f"Inference finished. Inference time: {end_time - start_time:.3f} seconds, "
            f"FPS: {1 / (end_time - start_time):.2f}."
        )

        # Визуализация результатов

        # Resize the network result to the image shape and round the values
        # to 0 (background) and 1 (foreground).
        # The network result has (1,1,512,512) shape. The `np.squeeze` function converts this to (512, 512).
        resized_result = np.rint(
            cv2.resize(src=np.squeeze(result), dsize=(image.shape[1], image.shape[0]))
        ).astype(np.uint8)

        # Create a copy of the image and set all background values to 255 (white).
        bg_removed_result = image.copy()
        bg_removed_result[resized_result == 0] = 255

        # fig, ax = plt.subplots(nrows=1, ncols=3, figsize=(20, 7))
        # ax[0].imshow(image)
        # ax[1].imshow(resized_result, cmap="gray")
        # ax[2].imshow(bg_removed_result)
        # for a in ax:
        #     a.axis("off")

        OUTPUT_DIR = os.path.join(BASE_DIR, 'files/res')
        os.makedirs(name=OUTPUT_DIR, exist_ok=True)


        new_image_path = Path(f"{OUTPUT_DIR}/{image_src_name}_{current_time}.png")

        # прозрачный фон
        # новое изображение с альфа-каналом и прозрачностью 0
        bg_removed_result_with_alpha = np.dstack((bg_removed_result, resized_result * 255)).astype(np.uint8)
        #меняем каналы
        bg_removed_result_with_alpha_rgb = cv2.cvtColor(bg_removed_result_with_alpha, cv2.COLOR_BGRA2RGBA)
        # сохраняем новое изображение с альфа-каналом
        cv2.imwrite(str(new_image_path), bg_removed_result_with_alpha_rgb, [cv2.IMWRITE_PNG_COMPRESSION, 9])

        # белый фон
        # new_image_path = Path(f"{OUTPUT_DIR}/{image_src_name}_{current_time}.png")
        # cv2.imwrite(filename=str(new_image_path), img=cv2.cvtColor(bg_removed_result, cv2.COLOR_RGB2BGR))

        if 'img_bgr' in request_data.data:
            # фон
            # BACKGROUND_FILE = "https://storage.openvinotoolkit.org/repositories/openvino_notebooks/data/data/image/wall.jpg"
            # BACKGROUND_FILE = str(Path(__file__).resolve().parent / "files/bgr.jpeg")
            BACKGROUND_FILE = os.path.join(BASE_DIR, 'files', 'bgr.jpeg')
            # OUTPUT_DIR = str(Path(__file__).resolve().parent / "files/res")

            background_image = cv2.cvtColor(src=load_image(BACKGROUND_FILE), code=cv2.COLOR_BGR2RGB)
            background_image = cv2.resize(src=background_image, dsize=(image.shape[1], image.shape[0]))

            # Set all the foreground pixels from the result to 0
            # in the background image and add the image with the background removed.
            background_image[resized_result == 1] = 0
            new_image = background_image + bg_removed_result

            # Save the generated image.
            # new_image_path = Path(f"{OUTPUT_DIR}/{Path(IMAGE_URI).stem}-{Path(BACKGROUND_FILE).stem}.jpg")
            new_image_path = Path(f"{OUTPUT_DIR}/{image_src_name}_{Path(BACKGROUND_FILE).stem}_{current_time}.jpg")
            cv2.imwrite(filename=str(new_image_path), img=cv2.cvtColor(new_image, cv2.COLOR_RGB2BGR))

            # Display the original image and the image with the new background side by side
            fig, ax = plt.subplots(nrows=1, ncols=2, figsize=(18, 7))
            ax[0].imshow(image)
            ax[1].imshow(new_image)
            for a in ax:
                a.axis("off")
            plt.show()

        processed_data = {
            'message': 'Image processed successfully',
            'image_url': 'https://example.com/processed_image.jpg'
        }

        return processed_data