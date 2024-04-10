import os
import base64
import sys
sys.path.append('/Library/Frameworks/Python.framework/Versions/3.10/lib/python3.10/site-packages')
# Load environment variables from .env file
with open('.env') as f:
    for line in f:
        key, value = line.strip().split('=')
        os.environ[key] = value

from azure.cosmos import exceptions, CosmosClient, PartitionKey
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient
from azure.core.credentials import AzureKeyCredential
from azure.ai.documentintelligence import DocumentIntelligenceClient
from azure.ai.documentintelligence.models import AnalyzeResult
from azure.storage.blob import BlobServiceClient
from azure.core.exceptions import ResourceExistsError
from azure.identity import DefaultAzureCredential

endpoint = "https://eastus.api.cognitive.microsoft.com/" #os.environ.get("AZURE_FORM_RECOGNIZER_ENDPOINT")

key = "1aa0e05637154da989378613bf1ceaa2" #os.environ.get("AZURE_FORM_RECOGNIZER_KEY")

document_analysis_client = DocumentIntelligenceClient(
        endpoint=endpoint, credential=AzureKeyCredential(key)
    )

with open("DL2.pdf", "rb") as f:
    poller = document_analysis_client.begin_analyze_document(
        "prebuilt-idDocument", analyze_request=f, content_type="application/pdf"
    )
id_documents = poller.result()

for idx, id_document in enumerate(id_documents.documents):
    print("--------Recognizing ID document #{}--------".format(idx + 1))
    first_name = id_document.fields.get("FirstName")
    if first_name:
        print(
            "First Name: {} has confidence: {}".format(
                first_name.get('valueString'), first_name.confidence
            )
        )
    last_name = id_document.fields.get("LastName")
    if last_name:
        print(
            "Last Name: {} has confidence: {}".format(
                last_name.get('valueString'), last_name.confidence
            )
        )
    document_number = id_document.fields.get("DocumentNumber")
    if document_number:
        print(
            "Document Number: {} has confidence: {}".format(
                document_number.get('valueString'), document_number.confidence
            )
        )
    dob = id_document.fields.get("DateOfBirth")
    if dob:
        print(
            "Date of Birth: {} has confidence: {}".format(dob.get('valueString'), dob.confidence)
        )
    doe = id_document.fields.get("DateOfExpiration")
    if doe:
        print(
            "Date of Expiration: {} has confidence: {}".format(
                doe.get('valueString'), doe.confidence
            )
        )
    sex = id_document.fields.get("Sex")
    if sex:
        print("Sex: {} has confidence: {}".format(sex.get('valueString'), sex.confidence))
    address = id_document.fields.get("Address")
    if address:
        print(
            "Address: {} has confidence: {}".format(
                address.get('content'), address.confidence
            )
        )
    country_region = id_document.fields.get("CountryRegion")
    if country_region:
        print(
            "Country/Region: {} has confidence: {}".format(
                country_region.get('valueString'), country_region.confidence
            )
        )
    region = id_document.fields.get("Region")
    if region:
        print(
            "Region: {} has confidence: {}".format(region.get('valueString'), region.confidence)
        )



account_url = "https://mortgageb7d8.blob.core.windows.net/"
# create a credential 
credentials = "KPnwrykAKqxo2oJBt2KNqU+TPafM2pn28rYzxwMO8D4LV1/0ZRMwyGBY/8/wBKUjlNeuYgxeAAaA+AStzlb7Gg=="

cosmos_url = "https://mortgageprocessing.documents.azure.com:443/"
cosmos_key = "ma6woOUbsw2g8dxsHWP5sjF7xrU9IuW1dIrv27T6ZTzGPZvY2W3PXtQpDX3QRH8PepC85TtRaarbACDbvlpruQ=="
fr_endpoint = "https://eastus.api.cognitive.microsoft.com/"
fr_key = "1aa0e05637154da989378613bf1ceaa2"
cosmos_db = "borrower_data"
cosmos_container = "borrower_docs"

# set client to access azure storage container
blob_service_client = BlobServiceClient(account_url=account_url, credential=credentials)
client = CosmosClient(cosmos_url, cosmos_key)
document_analysis_client = DocumentIntelligenceClient(
    endpoint=fr_endpoint, credential=AzureKeyCredential(fr_key)
)
# document_model_client = DocumentModelAdministrationClient(endpoint=fr_endpoint, credential=AzureKeyCredential(fr_key))
database = client.get_database_client(cosmos_db)
container = database.get_container_client(cosmos_container)
container_name = 'documents'

ref = account_url + container_name + '/' + 'Personal Identification'
#project results into dict and save to cosmos db

if len(id_documents.documents) > 0:
    fields = []
    for key, value in id_documents.documents[0].fields.items():
        if type(value) != "list":
            fields.append({"key":key, "value":value.content, "score":value.confidence})
        else:
            count = 0
            for v in value.value:
                cols = []
                for col, cell in v.value.items():
                    cols.append({"key":col, "value": cell.content})
                fields.append({"key": "row-"+str(count),"value":cols})
                count = count + 1
    f = fields
else:
    f = None
#save results in cosmos db
result = {"id": "prebuilt-idDocument", "ref":ref, "fields":f}
print(result)
container.create_item(body=result)
