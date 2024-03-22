from fastapi import FastAPI
import os
import openai 
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request
import requests
import json
import sqlite3

openai.api_key = "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"

# run: uvicorn main:app --reload --port 8000

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

@app.post("/add_document")
async def addDocument(name: str,description: str, uploadDate: str, dueDate: str, status: str):

    
    conn = sqlite3.connect('your_database.db')
    cursor = conn.cursor()


    cursor.execute("INSERT INTO documents (name, description, upload_date, due_date, status) VALUES (?, ?, ?, ?, ?)", (name, description, uploadDate, dueDate, status))

    # Commit the transaction and close the connection
    conn.commit()
    conn.close()
    

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
    