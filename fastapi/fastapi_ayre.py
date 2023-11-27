from transformers import ViltProcessor, ViltForQuestionAnswering
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import torchvision.transforms as transforms
from PIL import Image
from torch.nn import functional as F
from pydantic import BaseModel
from segmentation import UNet
from typing import Annotated
import torch
import time
import csv
import io

app = FastAPI(title='Ayre Backend')
# pre-load the model so everything is just faster.
# this includes the segmention model, the processor, and the vqa model itself.
PATH_TO_MODEL = "./semantic-segmentation/models/model_20231116-134707-checkpoint_14_02.pth"
DEVICE = "cuda" if torch.cuda.is_available() else "cpu" # everything will be moved to device
segmodel = UNet(in_channels=3, out_channels=151)
segmodel.load_state_dict(torch.load(PATH_TO_MODEL)[0])
segmodel.eval().to(DEVICE)
processor = ViltProcessor.from_pretrained("dandelin/vilt-b32-finetuned-vqa")
vqamodel = ViltForQuestionAnswering.from_pretrained("dandelin/vilt-b32-finetuned-vqa").to(DEVICE)
trns = transforms.Compose([transforms.Resize((384, 512)), transforms.ToTensor()])
# pre-loading this may not be best practice, but having models in memory at all times just
# makes everything faster

origins = ["*"] # debug step

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")    # defining the root directory
async def root():
    return {"message": "Successfully connected with Ayre."}

name1 = "IB-07: SOL 644 // Ayre"
@app.get("/greet/{name}")
async def name(name: str = name1):
    return {"message": f"welcome to {name}"}

@app.get("/health")    # just to check if the api is working
def check_health():
    return {"status": "API is working!!"}

# main project logic -------->
class ImageInput(BaseModel):
    images: UploadFile
    query: str

# FIXME add smth for image data idk
def write_to_csv(image, mask, label, ttime, query, prediction):
    with open('./fastapi/predictions.csv', mode='a', newline='') as file:
        writer = csv.writer(file)
        # write something here to save image and get their path_ID
        writer.writerow([query, label, ttime, prediction]) # add image path_IDs

def vqa_predict(image, query: str):
    with torch.no_grad(), torch.autocast(DEVICE):
        image = trns(image).to(DEVICE)
        segmask = segmodel(image.unsqueeze(0)).argmin(dim=1) / 150
    
    # prepare inputs
    encoding = processor(image, query, return_tensors="pt").to(DEVICE)
    encoding['pixel_mask'] = segmask + 1

    # forward pass
    outputs = vqamodel(**encoding)
    logits = outputs.logits
    idx = logits.argmax(-1).item()
    answer = vqamodel.config.id2label[idx]
    print("Predicted answer:", answer) # DEBUG
    return (segmask, answer, outputs)

# make a little function here to postprocess the model's output
# LABEL and FORMAT tensors correctly :)
# FIXME deal with `outputs`
# def postprocess(pred, labellist=labellist, weight=0.85):
#     arg = argmax(pred, axis=1)[0]
#     conf_arr = amax(pred, axis=1)
#     try:
#         confidence = conf_arr[0]*weight + conf_arr[1]*(1 - weight)
#     except:
#         confidence = conf_arr[0]
#     label = labellist[arg]
#     final_pred = {'label' : label, 'confidence' : (confidence * (1 // confidence))*100}

#     # write_to_csv(final_pred, request.pincode) 
#     return final_pred


@app.post("/predict/") # uses form objects only.
async def form_predict(
    image: Annotated[UploadFile, File(description="The Image to be masked.")],
    query: Annotated[str, Form()]
    ):
    starttime = time.time() # stopwatch start
    # Read the JSON image data
    json_image_data = await image.read()
    # Decode the image from JSON data
    image = Image.open(io.BytesIO(json_image_data)).convert('RGB')  # Read the image as RGB
    mask, label, prediction = vqa_predict(image, query)
    endtime = time.time() # stopwatch stop
    ttime = endtime - starttime

    write_to_csv(image, mask, label, ttime, query, prediction) # monitoring only, disable if not needed
    return {"prediction" : label, "time" : ttime} # the bare minimum json to make everything work #FIXME send mask image too

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("fastapi_ayre:app", host="0.0.0.0", port=7644)