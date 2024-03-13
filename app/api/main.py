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