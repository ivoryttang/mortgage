from fastapi import FastAPI, File, UploadFile
from typing import List
import os
import openai 
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request
import requests
import json
from azure.storage.blob import BlobServiceClient
from azure.core.exceptions import ResourceExistsError
from azure.identity import DefaultAzureCredential
from dotenv import load_dotenv
from fastapi.responses import StreamingResponse

load_dotenv()


account_url = "https://mortgageb7d8.blob.core.windows.net/"

# create a credential 
credentials = "KPnwrykAKqxo2oJBt2KNqU+TPafM2pn28rYzxwMO8D4LV1/0ZRMwyGBY/8/wBKUjlNeuYgxeAAaA+AStzlb7Gg=="

openai.api_key = "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"

# run: uvicorn main:app --reload --port 8000

# storage_connection_string = 'DefaultEndpointsProtocol=https;AccountName=mortgageb7d8;AccountKey=XOJYRtpeuW3q+VT2bmYJ6mD5b6vS+akqQ3LIJEMYMep/U+ZE4uMtCDRFtCXbY8DJITA0rdGesJi7+AStQAloJA=='


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
    allow_credentials=True
)

@app.post("/ask")
async def ask(newMessage: str):
    response = await openai.ChatCompletion.acreate(
        model='gpt-4',
        messages=[{
                "role": "system",
                "content": "You are an AI loan advisor trained to advise people on mortgage decisions and education."},
            {"role":"assistant","content":newMessage}],
        timeout=15,
    )
    return response["choices"][0]["message"].get("content", "")

@app.post("/rate_sheet_analysis")
async def rate_sheet_analysis(all_summaries: str):
    response = await openai.ChatCompletion.acreate(
        model="gpt-4",
        messages=[
            {
                "role": "system",
                "content": "You are an AI trained to provide financial analysis based on financial statements.",
            },
            {
                "role": "user",
                "content": f"""
                Please analyze the following data and provide insights:\n{all_summaries}.\n 
                Write each section out as instructed in the summary section and then provide analysis of how it's changed over the time period.
                ...
                """
            }
        ]
    )

    return response["choices"][0]["message"].get("content", "")


@app.post("/upload_document")
def uploadDocument(name: str, file_data: UploadFile = File(...)):
    container_name = 'documents'

    # set client to access azure storage container
    blob_service_client = BlobServiceClient(account_url=account_url, credential=credentials)

    # get the container client
    container_client = blob_service_client.get_container_client(container=container_name)

    # upload the file data to the blob storage container
    container_client.upload_blob(name=name, data=file_data)

@app.get("/get_document/{name}")
def get_document(name: str):
    container_name = 'documents'
    blob_name = name

    # set client to access azure storage container
    blob_service_client = BlobServiceClient(account_url=account_url, credential=credentials)

    # get the container client
    container_client = blob_service_client.get_container_client(container=container_name)

    # download blob data
    blob_client = container_client.get_blob_client(blob=blob_name)

    data = blob_client.download_blob()

    return StreamingResponse(data.content_as_bytes(), media_type='application/pdf')

# def list_documents():
#     container_name = 'storagecommoncontainer'

#     # set client to access azure storage container
#     blob_service_client = BlobServiceClient(account_url= account_url, credential= credentials)

#     # get the container client 
#     container_client = blob_service_client.get_container_client(container=container_name)

#     for blob in container_client.list_blobs():
#         print(blob.name)


@app.post("/webhook/call")
async def webhookEvent(request: Request):
    body = await request.json()
    headers = request.headers
    webhookMessage = body.get('message','{}')
    call_id = webhookMessage.get("call",'{}').get("id","")

    response = requests.request("POST", "https://webhook.site/87cc942a-d36a-41a9-8e4f-54fbe24ee601", headers=headers, data=json.dumps({**body}))

    if webhookMessage.get("status","") == "started":
        # already handled by vapi_call function
        pass

    # option 2: if "arguments" or "name" in webhookMessage (functions)
    elif webhookMessage.get("type","") == "function-call":
        pass
    # TRANSFER CALL CONTEXT
    elif webhookMessage.get("type","") == "status-update" and webhookMessage.get("status","") == "forwarding":
        pass
    # live call transcript
    