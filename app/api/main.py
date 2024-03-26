from fastapi import FastAPI, File, UploadFile, HTTPException
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
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
import time 
from exa_py import Exa
import subprocess
from playwright.async_api import async_playwright
import traceback



load_dotenv()


#selenium
# service = Service(executable_path="chromedriver.exe")
# driver = webdriver.Chrome(service=service)

# driver.get("https://google.com")

# time.sleep(10)
# driver.quit()

account_url = "https://mortgageb7d8.blob.core.windows.net/"

# create a credential 
credentials = "KPnwrykAKqxo2oJBt2KNqU+TPafM2pn28rYzxwMO8D4LV1/0ZRMwyGBY/8/wBKUjlNeuYgxeAAaA+AStzlb7Gg=="

openai.api_key = "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"


exa = Exa("921e8f7b-2af9-41eb-a138-dfc5d418d547")

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
    file_bytes = file_data.file.read()
    container_client.upload_blob(name=name, data=file_bytes)

@app.get("/get_document")
def get_document(name: str):
    container_name = 'documents'
    blob_name = name

    # set client to access azure storage container
    blob_service_client = BlobServiceClient(account_url=account_url, credential=credentials)

    # get the container client
    container_client = blob_service_client.get_container_client(container=container_name)

    # download blob data
    blob_client = container_client.get_blob_client(blob=blob_name)

    with open(file=os.path.join(r'./public/', 'temp_show_file.pdf'), mode="wb") as sample_blob:
        download_stream = blob_client.download_blob()
        sample_blob.write(download_stream.readall())


# def list_documents():
#     container_name = 'storagecommoncontainer'

#     # set client to access azure storage container
#     blob_service_client = BlobServiceClient(account_url= account_url, credential= credentials)

#     # get the container client 
#     container_client = blob_service_client.get_container_client(container=container_name)

#     for blob in container_client.list_blobs():
#         print(blob.name)




@app.post("/search")
async def search(query: str):
    response = exa.search(
        query,
        num_results=10,
        use_autoprompt=True,
    )


@app.get("/fill_form")
async def fillForm(values:dict):
    try:
        async with async_playwright() as p:
            
            browser = await p.chromium.launch(headless=False)
            page = await browser.new_page()
    
    
            await page.goto('https://www.pdffiller.com/jsfiller-desk10/?flat_pdf_quality=low&mode=force_choice&requestHash=c013a9df6495635d0674c4e022e02b57dc4834749021fb7c46b647d53ad8bf7a&lang=en&projectId=1479598876&loader=tips&PAGE_REARRANGE_V2_MVP=true&richTextFormatting=true&isPageRearrangeV2MVP=true&jsf-page-rearrange-v2=true&LATEST_PDFJS=true&jsf-document-scroll-zoom=true&jsf-redesign-full=true&act-notary-pro-integration=false&jsf-pdfjs-fourth=false&routeId=3acfe11e0a862b46a4f25b43cd6ffa76#db7eba37aa224825b88b96cb6e3e19b1');
        
            # await page.fill('textarea#fillable-field--1-3', 'Ivory Tang');
            for (key, value) in values:
                await page.fill(key, value);
            
            await page.waitForTimeout(10000);
            # Close the browser when done
            await browser.close()

            
    except Exception as e:
        exception_message = traceback.format_exc()  # Get the formatted exception message
        raise HTTPException(status_code=500, detail=f"An error occurred while executing the Playwright function: {exception_message}")