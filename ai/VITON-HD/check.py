import torch

print(torch.cuda.is_available())
if torch.cuda.is_available():
    for i in range(torch.cuda.device_count()):
        print(f"GPU ID: {i}, GPU Name: {torch.cuda.get_device_name(i)}")