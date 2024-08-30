from flask import Flask, request, jsonify
import os
import numpy as np
from PIL import Image
import base64
import io
from carvekit.web.schemas.config import MLConfig
from carvekit.web.utils.init_utils import init_interface
from flask_cors import CORS
import subprocess 

app = Flask(__name__)
CORS(app) 

SHOW_FULLSIZE = False
PREPROCESSING_METHOD = "none"
SEGMENTATION_NETWORK = "tracer_b7"
POSTPROCESSING_METHOD = "fba"
SEGMENTATION_MASK_SIZE = 640
TRIMAP_DILATION = 30
TRIMAP_EROSION = 5
DEVICE = 'cpu'

config = MLConfig(
    segmentation_network=SEGMENTATION_NETWORK,
    preprocessing_method=PREPROCESSING_METHOD,
    postprocessing_method=POSTPROCESSING_METHOD,
    seg_mask_size=SEGMENTATION_MASK_SIZE,
    trimap_dilation=TRIMAP_DILATION,
    trimap_erosion=TRIMAP_EROSION,
    device=DEVICE
)

interface = init_interface(config)

def decode_base64_image(data):
    image_data = base64.b64decode(data)
    image = Image.open(io.BytesIO(image_data))
    return image

def encode_image_to_base64(image_path):
    """Reads an image from the path and returns its base64 string."""
    with open(image_path, "rb") as img_file:
        return base64.b64encode(img_file.read()).decode('utf-8')

@app.route('/process', methods=['POST'])
def process_images():
    upload_folder = '../VITON-HD/datasets/test/cloth'
    upload_img = '../VITON-HD/datasets/test/image'
    mask_folder = '../VITON-HD/datasets/test/cloth-mask'
    
    if not os.path.exists(upload_folder):
        os.makedirs(upload_folder)
    if not os.path.exists(mask_folder):
        os.makedirs(mask_folder)

    data = request.get_json()
    
    if 'image1' not in data or 'image2' not in data:
        return jsonify({'error': 'Two base64 encoded images are required'}), 400

    try:
        image1 = decode_base64_image(data['image1'])
        image2 = decode_base64_image(data['image2'])
        
        image1_path = os.path.join(upload_folder, 'image1.jpg')
        image2_path = os.path.join(upload_img, 'image2.jpg')
        image1.save(image1_path)
        image2.save(image2_path)

        imgs = [image1_path]
        images = interface(imgs)

        for i, im in enumerate(images):
            img = np.array(im)
            img = img[...,:3]
            idx = (img[...,0] == 130) & (img[...,1] == 130) & (img[...,2] == 130)
            img = np.ones(idx.shape) * 255
            img[idx] = 0
            mask_image = Image.fromarray(np.uint8(img), 'L')

            mask_path = os.path.join(mask_folder, f'image1.jpg')
            mask_image.save(mask_path)

        batch_file_path = '..\\cmdtest.bat'
        print(os.listdir("..\\VITON-HD\\results\\VITON\\"))
        subprocess.run(batch_file_path, shell=True, check=True) 

        result_image_path = '..\\VITON-HD\\results\\VITON\\image2.jpg_image1.jpg'

        if not os.path.exists(result_image_path):
            return jsonify({'error': 'Result image not found after processing'}), 500

        result_image_base64 = encode_image_to_base64(result_image_path)

        return jsonify({'message': 'Images processed successfully', 'result_image': result_image_base64}), 200

    except Exception as e:
        print(str(e))
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
