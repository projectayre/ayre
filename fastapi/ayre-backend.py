from transformers import ViltProcessor, ViltForQuestionAnswering
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import torchvision.transforms as transforms
from torchvision.io import decode_image
from torch.nn import functional as F
from pydantic import BaseModel
from segmentation import UNet
from typing import Annotated
import torch
import time
import csv

app = FastAPI()
# pre-load the model so everything is just faster.
# this includes the segmention model, the processor, and the vqa model itself.
PATH_TO_MODEL = "../semantic-segmentation/models/model_20231116-134707-checkpoint_14_02.pth"
DEVICE = "cuda" if torch.cuda.is_available() else "cpu" # everything will be moved to device
segmodel = UNet(in_channels=3, out_channels=151)
segmodel.load_state_dict(torch.load(PATH_TO_MODEL)[0])
segmodel.eval().to(DEVICE)
processor = ViltProcessor.from_pretrained("dandelin/vilt-b32-finetuned-vqa").to(DEVICE)
vqamodel = ViltForQuestionAnswering.from_pretrained("dandelin/vilt-b32-finetuned-vqa").to(DEVICE)
trns = transforms.Compose([transforms.Resize((384, 512)), transforms.ToTensor()])
# pre-loading this may not be best practice, but having models in memory at all times just
# makes everything faster

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "*.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")    # defining the root directory
async def root():
    return {"message": "hello world manya"}

name1 = "SIH 2023"
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
    with open('./Backend/predictions.csv', mode='a', newline='') as file:
        writer = csv.writer(file)
        # write something here to save image and get their path_ID
        writer.writerow([query, label, ttime, prediction]) # add image path_IDs

def vqa_predict(image, query: str):
    with torch.no_grad(), torch.autocast(DEVICE):
        segmask = segmodel(trns(image).unsqueeze(0)).argmin(dim=1) / 151
    
    # prepare inputs
    encoding = processor(image, query, return_tensors="pt")
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

@app.post("/predict/")
async def predict_images(request: ImageInput):
    starttime = time.time() # stopwatch start
    
    # Read the JSON image data
    json_image_data = await request.image.read()
    # Decode the image from JSON data, and resize
    image = decode_image(json_image_data, channels=3)  # Set the number of color channels (3 for RGB)
    query = request.query

    # get prediction from the model
    mask, label, prediction = vqa_predict(image, query)
    endtime = time.time() # stopwatch stop
    ttime = endtime - starttime
    
    # THIS IS PROBABLY NOT NEEDED HERE, but i'm leaving it in a comment just in case
    # final_pred = postprocess(prediction)
    
    write_to_csv(image, mask, label, ttime, query, prediction) # monitoring only, disable if not needed

    return {"prediction" : label} # the bare minimum json to make everything work

@app.post("/form-predict/")
async def form_predict(
    files: Annotated[list[UploadFile], File(description="Multiple files as UploadFile")],
    pincode: Annotated[str, Form()]
    ):
    processed_images = []
    starttime = time.time() # stopwatch start
    
    for img in files:
        # Read the JSON image data
        json_image_data = await img.read()
        # Decode the image from JSON data, and resize
        image_tensor = decode_image(json_image_data, channels=3)  # Set the number of color channels (3 for RGB)
        resized_image = image.resize(image_tensor, size=(256, 256))
        # Append the processed image to the list
        processed_images.append(resized_image)

    # Convert the list of processed images to a TensorFlow tensor
    images_tensor = stack(processed_images)
    # get prediction from the model
    prediction = model.predict(images_tensor)
    
    endtime = time.time() # stopwatch stop
    
    ttime = endtime - starttime
    # replace this with a more elaborate argmax function
    final_pred = postprocess(prediction)
    write_to_csv(final_pred['label'], ttime, pincode, final_pred['confidence'])
    y_pred = {"prediction" : final_pred, 'exectime' : ttime}
    print(y_pred)
    return y_pred

if __name__ == '__main__':
    # CODE FOR SERVER
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)