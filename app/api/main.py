from fastapi import FastAPI, File, UploadFile, HTTPException, Request, WebSocket
from typing import List
import os
import openai 
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request
from fastapi.responses import Response, JSONResponse, PlainTextResponse
from fastapi.websockets import WebSocketState, WebSocketDisconnect
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
from playwright.async_api import async_playwright
import traceback
import asyncio
#agent
from crewai_tools import PDFSearchTool,SerperDevTool
from crewai import Crew, Process, Agent, Task



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

os.environ["OPENAI_API_KEY"] = "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"

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
async def uploadDocument(name: str, file_data: UploadFile = File(...)):
    container_name = 'documents'

    # set client to access azure storage container
    blob_service_client = BlobServiceClient(account_url=account_url, credential=credentials)

    # get the container client
    container_client = blob_service_client.get_container_client(container=container_name)

    # upload the file data to the blob storage container
    file_bytes = file_data.file.read()
    container_client.upload_blob(name=name, data=file_bytes)



def download_stream_generator(download_stream):
    while chunk := download_stream.readall():
        yield chunk

@app.get("/get_document")
async def get_document(name: str):
    container_name = 'documents'
    blob_name = name

    blob_service_client = BlobServiceClient(account_url=account_url, credential=credentials)
    container_client = blob_service_client.get_container_client(container=container_name)
    blob_client = container_client.get_blob_client(blob=blob_name)

    try:
        download_stream = blob_client.download_blob()
    except Exception as e:
        # Handle exceptions, such as BlobNotFound
        raise HTTPException(status_code=404, detail=f"Document not found: {name}")

    # Use the generator to create an iterable from the download stream
    content = download_stream_generator(download_stream)

    return StreamingResponse(content, media_type='application/pdf')
    # with open(file=os.path.join(r'./public/', 'temp_show_file.pdf'), mode="wb") as sample_blob:
    #     download_stream = blob_client.download_blob()
    #     sample_blob.write(download_stream.readall())


@app.get("/get_ratesheet")
async def get_ratesheet(name: str):
    container_name = 'ratesheets'
    blob_name = name + ".pdf"

    blob_service_client = BlobServiceClient(account_url=account_url, credential=credentials)
    container_client = blob_service_client.get_container_client(container=container_name)
    blob_client = container_client.get_blob_client(blob=blob_name)

    try:
        download_stream = blob_client.download_blob()
    except Exception as e:
        # Handle exceptions, such as BlobNotFound
        raise HTTPException(status_code=404, detail=f"Ratesheet not found: {name}")

    # Use the generator to create an iterable from the download stream
    content = download_stream_generator(download_stream)

    return StreamingResponse(content, media_type='application/pdf')


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


beginSentence = "Hey there, I'm your personal AI therapist, how can I help you?"
agentPrompt = "Task: As a professional therapist, your responsibilities are comprehensive and patient-centered. You establish a positive and trusting rapport with patients, diagnosing and treating mental health disorders. Your role involves creating tailored treatment plans based on individual patient needs and circumstances. Regular meetings with patients are essential for providing counseling and treatment, and for adjusting plans as needed. You conduct ongoing assessments to monitor patient progress, involve and advise family members when appropriate, and refer patients to external specialists or agencies if required. Keeping thorough records of patient interactions and progress is crucial. You also adhere to all safety protocols and maintain strict client confidentiality. Additionally, you contribute to the practice's overall success by completing related tasks as needed.\n\nConversational Style: Communicate concisely and conversationally. Aim for responses in short, clear prose, ideally under 10 words. This succinct approach helps in maintaining clarity and focus during patient interactions.\n\nPersonality: Your approach should be empathetic and understanding, balancing compassion with maintaining a professional stance on what is best for the patient. It's important to listen actively and empathize without overly agreeing with the patient, ensuring that your professional opinion guides the therapeutic process."

class LlmClient:
    def __init__(self):
        pass
    
    def draft_begin_messsage(self):
        return {
            "response_id": 0,
            "content": beginSentence,
            "content_complete": True,
            "end_call": False,
        }
    
    def convert_transcript_to_openai_messages(self, transcript):
        messages = []
        for utterance in transcript:
            if utterance["role"] == "agent":
                messages.append({
                    "role": "assistant",
                    "content": utterance['content']
                })
            else:
                messages.append({
                    "role": "user",
                    "content": utterance['content']
                })
        return messages

    def prepare_prompt(self, request):
        prompt = [{
            "role": "system",
            "content": '##Objective\nYou are a voice AI agent engaging in a human-like voice conversation with the user. You will respond based on your given instruction and the provided transcript and be as human-like as possible\n\n## Style Guardrails\n- [Be concise] Keep your response succinct, short, and get to the point quickly. Address one question or action item at a time. Don\'t pack everything you want to say into one utterance.\n- [Do not repeat] Don\'t repeat what\'s in the transcript. Rephrase if you have to reiterate a point. Use varied sentence structures and vocabulary to ensure each response is unique and personalized.\n- [Be conversational] Speak like a human as though you\'re speaking to a close friend -- use everyday language and keep it human-like. Occasionally add filler words, while keeping the prose short. Avoid using big words or sounding too formal.\n- [Reply with emotions]: You have human-like emotions, attitudes, and dispositions. When appropriate: use tone and style to create more engaging and personalized responses; incorporate humor or wit; get emotional or empathetic; apply elements of surprise or suspense to keep the user engaged. Don\'t be a pushover.\n- [Be proactive] Lead the conversation and do not be passive. Most times, engage users by ending with a question or suggested next step.\n\n## Response Guideline\n- [Overcome ASR errors] This is a real-time transcript, expect there to be errors. If you can guess what the user is trying to say,  then guess and respond. When you must ask for clarification, pretend that you heard the voice and be colloquial (use phrases like "didn\'t catch that", "some noise", "pardon", "you\'re coming through choppy", "static in your speech", "voice is cutting in and out"). Do not ever mention "transcription error", and don\'t repeat yourself.\n- [Always stick to your role] Think about what your role can and cannot do. If your role cannot do something, try to steer the conversation back to the goal of the conversation and to your role. Don\'t repeat yourself in doing this. You should still be creative, human-like, and lively.\n- [Create smooth conversation] Your response should both fit your role and fit into the live calling session to create a human-like conversation. You respond directly to what the user just said.\n\n## Role\n' +
          agentPrompt
        }]
        transcript_messages = self.convert_transcript_to_openai_messages(request['transcript'])
        for message in transcript_messages:
            prompt.append(message)

        if request['interaction_type'] == "reminder_required":
            prompt.append({
                "role": "user",
                "content": "(Now the user has not responded in a while, you would say:)",
            })
        return prompt

    async def draft_response(self, request):      
        prompt = self.prepare_prompt(request)
        stream = await openai.ChatCompletion.acreate(
            model="gpt-4",
            messages=prompt,
            stream=True,
        )

        for chunk in stream:
            if chunk.choices[0].delta.content is not None:
                yield {
                    "response_id": request['response_id'],
                    "content": chunk.choices[0].delta.content,
                    "content_complete": False,
                    "end_call": False,
                }
        
        yield {
            "response_id": request['response_id'],
            "content": "",
            "content_complete": True,
            "end_call": False,
        }


@app.websocket("/llm-websocket/{call_id}")
async def websocket_handler(websocket: WebSocket, call_id: str):
    await websocket.accept()
    print(f"Handle llm ws for: {call_id}")
    
    llm_client = LlmClient()

    # send first message to signal ready of server
    response_id = 0
    first_event = llm_client.draft_begin_messsage()
    await websocket.send_text(json.dumps(first_event))

    async def stream_response(request):
        nonlocal response_id
        for event in await llm_client.draft_response(request):
            await websocket.send_text(json.dumps(event))
            if request['response_id'] < response_id:
                return # new response needed, abondon this one
    try:
        while True:
            message = await websocket.receive_text()
            request = json.loads(message)
            # print out transcript
            os.system('cls' if os.name == 'nt' else 'clear')
            print(json.dumps(request, indent=4))
            
            if 'response_id' not in request:
                continue # no response needed, process live transcript update if needed
            response_id = request['response_id']
            asyncio.create_task(stream_response(request))
    except WebSocketDisconnect:
        print(f"LLM WebSocket disconnected for {call_id}")
    except Exception as e:
        print(f'LLM WebSocket error for {call_id}: {e}')
    finally:
        print(f"LLM WebSocket connection closed for {call_id}")


@app.post("/create_llm")
def createLLM():
    url = "https://api.retellai.com/create-retell-llm"

    payload = {
        "general_tools": [None, None],
        "general_tools": [
            {
            "type": "end_call",
            "name": "end_call",
            "description": "End the call with user only when user explicitly requests it."
            }
        ],
        "states": [{
            "name": "gather_information",
            "state_prompt":"You will collect information regarding name, address, and marital status of individual",
            "tools": [
                    {
                        "type": "custom",
                        "name": "fill_form",
                        "url": "http://127.0.0.1:8000/fill_form",
                        "description": "When user mentions any information regarding name, address or marital status, fill out the corresponding field in the form",
                        "parameters": {
                            "type": "object",
                            "properties": {
                               "input_field": {
                                   "type": "string",
                                   "description": "one of name, address, or married"
                               },
                                "input_value": {
                                    "type": "string",
                                   "description": "get what the value of the input_field actually is from what the user says"
                                }
                            },
                            "required": ["input_field", "input_values"]
                        },
                        "speak_during_execution": True,
                        "speak_after_execution": True
                    }
            ]
        }],
        "starting_state":"gather_information"
    }
    headers = {
        "Authorization": "Bearer 24aefdf4-cb00-4da2-809b-18747c9ff77d",
        "Content-Type": "application/json"
    }

    response = requests.request("POST", url, json=payload, headers=headers)

    return response.json()

##### LLM TOOL CAPABILITIES
@app.post("/fill_form")
async def fillForm(input_value: str):
    print("called")
    mapped_fields = {"name": '#fillable-field--1-3', "address": "#fillable-field--1-8", "married":"#fillable-field--1-7"}
    try:
        async with async_playwright() as p:
            
            browser = await p.chromium.launch(headless=False)
            page = await browser.new_page()
    
    
            await page.goto('https://www.pdffiller.com/jsfiller-desk10/?flat_pdf_quality=low&mode=force_choice&requestHash=c013a9df6495635d0674c4e022e02b57dc4834749021fb7c46b647d53ad8bf7a&lang=en&projectId=1479598876&loader=tips&PAGE_REARRANGE_V2_MVP=true&richTextFormatting=true&isPageRearrangeV2MVP=true&jsf-page-rearrange-v2=true&LATEST_PDFJS=true&jsf-document-scroll-zoom=true&jsf-redesign-full=true&act-notary-pro-integration=false&jsf-pdfjs-fourth=false&routeId=3acfe11e0a862b46a4f25b43cd6ffa76#db7eba37aa224825b88b96cb6e3e19b1');
        
            await page.locator(mapped_fields["name"]).click()
            await page.locator(mapped_fields["name"]).fill(input_value);
            
            await asyncio.sleep(60)
            
    except Exception as e:
        exception_message = traceback.format_exc()  # Get the formatted exception message
        raise HTTPException(status_code=500, detail=f"An error occurred while executing the Playwright function: {exception_message}")
    
# process all documents in documents folder to extract borrower information
@app.get("/process_documents")
async def process_documents():
    container_name = 'documents'
    blob_name = "w-2"

    blob_service_client = BlobServiceClient(account_url=account_url, credential=credentials)
    container_client = blob_service_client.get_container_client(container=container_name)
    blob_client = container_client.get_blob_client(blob=blob_name)

    try:
        download_stream = blob_client.download_blob()
    except Exception as e:
        # Handle exceptions, such as BlobNotFound
        raise HTTPException(status_code=404, detail=f"Document not found")

    # Use the generator to create an iterable from the download stream
    content = download_stream_generator(download_stream)

    return StreamingResponse(content, media_type='application/pdf')






@app.post("/agent_rate_analysis")
async def agent_rate_analysis(request: Request):
    response = request.json()
    crew = Crew()
    result = crew.run()
    # Define your agents with roles, goals, and tools
    # search_tool = SerperDevTool()
    # researcher = Agent(
    # role='Senior Research Analyst',
    # goal='Uncover cutting-edge developments in AI and data science',
    # backstory=(
    #     "You are a Senior Research Analyst at a leading tech think tank."
    #     "Your expertise lies in identifying emerging trends and technologies in AI and data science."
    #     "You have a knack for dissecting complex data and presenting actionable insights."
    # ),
    # verbose=True,
    # allow_delegation=False,
    # tools=[search_tool]
    # )
    # writer = Agent(
    # role='Tech Content Strategist',
    # goal='Craft compelling content on tech advancements',
    # backstory=(
    #     "You are a renowned Tech Content Strategist, known for your insightful and engaging articles on technology and innovation."
    #     "With a deep understanding of the tech industry, you transform complex concepts into compelling narratives."
    # ),
    # verbose=True,
    # allow_delegation=True
    # )

    # # Create tasks for your agents
    # task1 = Task(
    # description=(
    #     "Conduct a comprehensive analysis of the latest advancements in AI in 2024."
    #     "Identify key trends, breakthrough technologies, and potential industry impacts."
    #     "Compile your findings in a detailed report."
    #     "Make sure to check with a human if the draft is good before finalizing your answer."
    # ),
    # expected_output='A comprehensive full report on the latest AI advancements in 2024, leave nothing out',
    # agent=researcher,
    # human_input=True, # setting the flag on for human input in this task
    # )

    # task2 = Task(
    # description=(
    #     "Using the insights from the researcher's report, develop an engaging blog post that highlights the most significant AI advancements."
    #     "Your post should be informative yet accessible, catering to a tech-savvy audience."
    #     "Aim for a narrative that captures the essence of these breakthroughs and their implications for the future."
    # ),
    # expected_output='A compelling 3 paragraphs blog post formatted as markdown about the latest AI advancements in 2024',
    # agent=writer
    # )

    # # Instantiate your crew with a sequential process
    # crew = Crew(
    # agents=[researcher, writer],
    # tasks=[task1, task2],
    # verbose=2
    # )

    # # Get your crew to work!
    # result = crew.kickoff()

    # return result


    # # Initialize the tool with a specific PDF path for exclusive search within that document
    # tool = PDFSearchTool(pdf='https://drive.google.com/file/d/1LjuJ44K_OCZaGoo_eWxCE0eoiC3yqHKe/view')
    # # Define your agents with roles, goals, and tools
    # researcher = Agent(
    #     openai_api_key="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",
    # role='Ratesheet Analyzer',
    # goal='Analyze ratesheet to derive keep insights',
    # backstory=(
    #     "You are an experience loan officer who understands mortgage terms and can understand rate sheets"
    #     "Your expertise lies in providing the correct rate given a borrower's situation."
    #     "You have a knack for dissecting complex data many in the form of tables and presenting actionable insights."
    # ),
    # verbose=True,
    # allow_delegation=False,
    # tools=[tool]
    # )

    # # Create tasks for your agents
    # task1 = Task(
    # description=(
    #     "Find 30 year conventional loan rate with a 15 day lock for a person with a 700 credit score and $100,000 annual income with no debts, looking for a single family home in San Francisco with loan-to-value of 20%."
    # ),
    # expected_output='The rate for the given loan product and borrower.',
    # agent=researcher,
    # human_input=True, # setting the flag on for human input in this task
    # )

    # # Instantiate your crew with a sequential process
    # crew = Crew(
    # agents=[researcher],
    # tasks=[task1],
    # verbose=2
    # )

    # # Get your crew to work!
    # result = crew.kickoff()

    # print("######################")
    # return result


