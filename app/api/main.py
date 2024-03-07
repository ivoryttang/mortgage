from fastapi import FastAPI
import os
import openai 
from fastapi.middleware.cors import CORSMiddleware

openai.api_key = "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"

# run: uvicorn main:app --reload --port 8000

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

@app.post("/ask")
async def ask(newMessage: str):
    response = await openai.ChatCompletion.acreate(
        model='gpt-4',
        messages=[{"role":"assistant","content":newMessage}],
        timeout=15,
    )
    return response["choices"][0]["message"].get("content", "")