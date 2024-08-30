from flask import Flask, request, jsonify, send_file
import os
import numpy as np
from PIL import Image
from carvekit.web.schemas.config import MLConfig
from carvekit.web.utils.init_utils import init_interface

app = Flask(__name__)

SHOW_FULLSIZE = False
PREPROCESSING_METHOD = "none"
SEGMENTATION_NETWORK = "tracer_b7"
POSTPROCESSING_METHOD = "fba"
SEGMENTATION_MASK_SIZE = 640
TRIMAP_DILATION = 30
TRIMAP_EROSION = 5
DEVICE = 'cpu'

config = MLConfig(segmentation_network=SEGMENTATION_NETWORK,
                  preprocessing_method=PREPROCESSING_METHOD,
                  postprocessing_method=POSTPROCESSING_METHOD,
                  seg_mask_size=SEGMENTATION_MASK_SIZE,
                  trimap_dilation=TRIMAP_DILATION,
                  trimap_erosion=TRIMAP_EROSION,
                  device=DEVICE)

interface = init_interface(config)

@app.route('/process', methods=['POST'])
def process_images():
    upload_folder = '../VITON-HD/datasets/test/cloth'
    mask_folder = '../VITON-HD/datasets/test/cloth-mask'
    
    if not os.path.exists(upload_folder):
        os.makedirs(upload_folder)
    if not os.path.exists(mask_folder):
        os.makedirs(mask_folder)

    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    file_path = os.path.join(upload_folder, file.filename)
    file.save(file_path)

    imgs = [file_path]
    images = interface(imgs)
    
    im = images[0]
    img = np.array(im)
    img = img[...,:3]
    idx = (img[...,0] == 130) & (img[...,1] == 130) & (img[...,2] == 130)  # background 0 or 130
    img = np.ones(idx.shape) * 255
    img[idx] = 0
    mask_image = Image.fromarray(np.uint8(img), 'L')
    
    mask_path = os.path.join(mask_folder, f'{os.path.splitext(file.filename)[0]}.jpg')
    mask_image.save(mask_path)


if __name__ == '__main__':
    app.run(debug=True)
