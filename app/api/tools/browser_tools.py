# from crewai_tools import ScrapeWebsiteTool

# To enable scrapping any website it finds during it's execution
# tool = ScrapeWebsiteTool()

import json

import requests
import streamlit as st
from crewai import Agent, Task
from langchain.tools import tool


class BrowserTools():

  @tool("Scrape website content")
  def scrape_and_summarize_website(website):
    """Useful to scrape and summarize a website content"""
    # tool = ScrapeWebsiteTool(website_url=website)

    # Extract the text from the site
    # text = tool.run()
    text = ""
    content = [text[i:i + 8000] for i in range(0, len(text), 8000)]
    summaries = []
    for chunk in content:
      agent = Agent(
          role='Principal Researcher',
          goal=
          'Do amazing researches and summaries based on the content you are working with',
          backstory=
          "You're a Principal Researcher at a big company and you need to do a research about a given topic.",
          allow_delegation=False)
      task = Task(
          agent=agent,
          description=
          f'Analyze and summarize the content bellow, make sure to include the most relevant information in the summary, return only the summary nothing else.\n\nCONTENT\n----------\n{chunk}'
      )
      summary = task.execute()
      summaries.append(summary)
    return "\n\n".join(summaries)