# import requests

# ENDPOINT = "https://api.ratespot.io/v1/api"
# params = {
#   "apikey": "1oExlQeCs3lfaXCSPYtHRNx4fuGQE18i5KkbqzQ4L1pBfSnf6w2wAEGU6cBlrNsYlNV73i-ed4ueMKC-wP6iGQ",
#   "state": "CA",
#   "interval": 30
# }

# response = requests.get(ENDPOINT, params=params)
# print(response.json())

# from azure.storage.blob import BlobServiceClient
# from fastapi.responses import StreamingResponse
# from fastapi import FastAPI, File, UploadFile, HTTPException, Request, WebSocket
# from azure.storage.blob import generate_blob_sas, BlobSasPermissions
# from datetime import datetime, timedelta


# account_url = "https://mortgageb7d8.blob.core.windows.net/"
# credentials = "KPnwrykAKqxo2oJBt2KNqU+TPafM2pn28rYzxwMO8D4LV1/0ZRMwyGBY/8/wBKUjlNeuYgxeAAaA+AStzlb7Gg=="


# def download_stream_generator(download_stream):
#     while chunk := download_stream.readall():
#         yield chunk

# container_name = 'documents'
# blob_name = "w-2"

# blob_service_client = BlobServiceClient(account_url=account_url, credential=credentials)
# container_client = blob_service_client.get_container_client(container=container_name)
# blob_client = container_client.get_blob_client(blob=blob_name)

# try:
#     download_stream = blob_client.download_blob()
# except Exception as e:
#     # Handle exceptions, such as BlobNotFound
#     raise HTTPException(status_code=404, detail=f"Document not found")

# # Use the generator to create an iterable from the download stream
# content = download_stream_generator(download_stream)

# # StreamingResponse(content, media_type='application/pdf')



# # Define the expiry time for the SAS token
# expiry = datetime.utcnow() + timedelta(hours=1)  # Set expiry time to 1 hour from now

# # Generate the SAS token for the blob
# sas_token = generate_blob_sas(
#     account_name=account_url.split('.')[0][8:],  # Extract account name from the URL
#     container_name=container_name,
#     blob_name=blob_name,
#     account_key=credentials,
#     permission=BlobSasPermissions(read=True),
#     expiry=expiry
# )

# # Create the downloadable URL by appending the SAS token
# download_url = f"{account_url}/{container_name}/{blob_name}?{sas_token}"
# print(download_url)