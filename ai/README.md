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
    
    You can get the pre-trained model from https://www.kaggle.com/datasets/changethetuneman/openpose-model

    


## Resources

- **Pose Estimation:**
  - [OpenPose GitHub Repository](https://github.com/CMU-Perceptual-Computing-Lab/openpose)

- **Human Parsing:**
  - [Self-Correction Human Parsing GitHub Repository](https://github.com/GoGoDuck912/Self-Correction-Human-Parsing)

- **Cloth Masking and setup help:**
  - [HR-VITON Issue #45](https://github.com/sangyun884/HR-VITON/issues/45#issue-1515217009)

- **VITON-HD:**
  - [VITON-HD GitHub Repository](https://github.com/shadow2496/VITON-HD)
