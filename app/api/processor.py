import os

# Load environment variables from .env file
with open('.env') as f:
    for line in f:
        key, value = line.strip().split('=')
        os.environ[key] = value

# Your existing code
from azure.core.credentials import AzureKeyCredential
from azure.ai.formrecognizer import DocumentAnalysisClient

endpoint = os.environ.get("AZURE_FORM_RECOGNIZER_ENDPOINT")

key = os.environ.get("AZURE_FORM_RECOGNIZER_KEY")

document_analysis_client = DocumentAnalysisClient(
        endpoint=endpoint, credential=AzureKeyCredential(key)
    )

with open("DL2.png", "rb") as f:
    poller = document_analysis_client.begin_analyze_document(
        "prebuilt-idDocument", document=f, locale="en-US"
    )
id_documents = poller.result()

for idx, id_document in enumerate(id_documents.documents):
    print("--------Recognizing ID document #{}--------".format(idx + 1))
    first_name = id_document.fields.get("FirstName")
    if first_name:
        print(
            "First Name: {} has confidence: {}".format(
                first_name.value, first_name.confidence
            )
        )
    last_name = id_document.fields.get("LastName")
    if last_name:
        print(
            "Last Name: {} has confidence: {}".format(
                last_name.value, last_name.confidence
            )
        )
    document_number = id_document.fields.get("DocumentNumber")
    if document_number:
        print(
            "Document Number: {} has confidence: {}".format(
                document_number.value, document_number.confidence
            )
        )
    dob = id_document.fields.get("DateOfBirth")
    if dob:
        print(
            "Date of Birth: {} has confidence: {}".format(dob.value, dob.confidence)
        )
    doe = id_document.fields.get("DateOfExpiration")
    if doe:
        print(
            "Date of Expiration: {} has confidence: {}".format(
                doe.value, doe.confidence
            )
        )
    sex = id_document.fields.get("Sex")
    if sex:
        print("Sex: {} has confidence: {}".format(sex.value, sex.confidence))
    address = id_document.fields.get("Address")
    if address:
        print(
            "Address: {} has confidence: {}".format(
                address.value, address.confidence
            )
        )
    country_region = id_document.fields.get("CountryRegion")
    if country_region:
        print(
            "Country/Region: {} has confidence: {}".format(
                country_region.value, country_region.confidence
            )
        )
    region = id_document.fields.get("Region")
    if region:
        print(
            "Region: {} has confidence: {}".format(region.value, region.confidence)
        )
