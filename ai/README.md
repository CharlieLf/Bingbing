## Setup

To set up the AI environments, follow these steps:

1. **Create Conda Environments**

   Use Conda to create the required environments. You'll need to set up two environments:

   - **Primary Environment**: Defined in the `environment.yml` file located in the root directory.
   - **Cloth Mask Environment**: Defined in the `./cloth_mask/environment.yml` file.

   ### Creating Environments

   To create these environments, run the following commands:

   ```bash
   # Create the primary environment
   conda env create -f environment.yml

   # Create the cloth mask environment
   conda env create -f ./cloth_mask/environment.yml

2. **Download OpenPose Quick Installation**
    
    You can get the pre-trained model from https://www.kaggle.com/datasets/changethetuneman/openpose-model and you can get the windows portable demo from https://github.com/CMU-Perceptual-Computing-Lab/openpose/releases and unzip it in the ai folder make sure to put the models inside models folder following the placement in getModels.sh 

3. **Download Model For Cloth Masking**

    Using the cloth mask environment make sure to download the model before using 

    ``` bash
    from carvekit.ml.files.models_loc import download_all
    download_all();

4. **Download Model For Human Parsing**

    The model can be obtained from https://drive.google.com/file/d/1qkk6GZjEOJnu3mXHLe1QMBiP3wL_l3XN/view?usp=drive_link make sure to put it in the Human-Parsing Folder

5. **Download Model For VITON-HD**

    We provide pre-trained networks. Please download *.pkl from the https://drive.google.com/drive/folders/0B8kXrnobEVh9fnJHX3lCZzEtd20yUVAtTk5HdWk2OVV0RGl6YXc0NWhMOTlvb1FKX3Z1OUk?resourcekey=0-OIXHrDwCX8ChjypUbJo4fQ folder and unzip *.zip files. test.py assumes that the downloaded files are placed in ./checkpoints/ directories.


## Resources

- **Pose Estimation:**
  - [OpenPose GitHub Repository](https://github.com/CMU-Perceptual-Computing-Lab/openpose)

- **Human Parsing:**
  - [Self-Correction Human Parsing GitHub Repository](https://github.com/GoGoDuck912/Self-Correction-Human-Parsing)

- **Cloth Masking and setup help:**
  - [HR-VITON Issue #45](https://github.com/sangyun884/HR-VITON/issues/45#issue-1515217009)

- **VITON-HD:**
  - [VITON-HD GitHub Repository](https://github.com/shadow2496/VITON-HD)
