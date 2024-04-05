# from crewai_tools import ScrapeWebsiteTool

# To enable scrapping any website it finds during it's execution
# tool = ScrapeWebsiteTool()

import json

import requests
import streamlit as st
from crewai import Agent, Task
from langchain.tools import tool
from crewai_tools import PDFSearchTool


class RatesheetTools():

  @tool("Get Rocket Mortgage ratesheet info")
  def scrape_and_summarize_rocket_mortgage_ratesheet():
    """Useful to scrape and summarize a ratesheet"""
    ratesheet = "data/Rocket Mortgage.pdf"
    tool = PDFSearchTool(pdf=ratesheet)
    text = tool.run(query="What loan product and best rates does this borrower qualify for?")
    
    return text
  
  @tool("Get EMET ratesheet info")
  def scrape_and_summarize_EMET_ratesheet():
    """Useful to scrape and summarize a ratesheet"""
    ratesheet = "data/EMET.pdf"
    tool = PDFSearchTool(pdf=ratesheet)
    text = tool.run(query="What loan product and best rates does this borrower qualify for?")
    
    return text
  
  @tool("Get NMSI ratesheet info")
  def scrape_and_summarize_NMSI_ratesheet():
    """Useful to scrape and summarize a ratesheet"""
    ratesheet = "data/NMSI.pdf"
    tool = PDFSearchTool(pdf=ratesheet)
    text = tool.run(query="What loan product and best rates does this borrower qualify for?")
    
    return text
  
  @tool("Get Pacific Bay ratesheet info")
  def scrape_and_summarize_pacific_bay_ratesheet():
    """Useful to scrape and summarize a ratesheet"""
    ratesheet = "data/Pacific Bay.pdf"
    tool = PDFSearchTool(pdf=ratesheet)
    text = tool.run(query="What loan product and best rates does this borrower qualify for?")
    
    return text
  
  @tool("Get Preferred Rate ratesheet info")
  def scrape_and_summarize_preferred_rate_ratesheet():
    """Useful to scrape and summarize a ratesheet"""
    ratesheet = "data/Preferred Rate.pdf"
    tool = PDFSearchTool(pdf=ratesheet)
    text = tool.run(query="What loan product and best rates does this borrower qualify for?")
    
    return text
  
  @tool("Get PRMG ratesheet info")
  def scrape_and_summarize_PRMG_ratesheet():
    """Useful to scrape and summarize a ratesheet"""
    ratesheet = "data/PRMG.pdf"
    tool = PDFSearchTool(pdf=ratesheet)
    text = tool.run(query="What loan product and best rates does this borrower qualify for?")
    
    return text
  
  @tool("Get Provident Funding ratesheet info")
  def scrape_and_summarize_provident_funding_ratesheet():
    """Useful to scrape and summarize a ratesheet"""
    ratesheet = "data/Provident Funding.pdf"
    tool = PDFSearchTool(pdf=ratesheet)
    text = tool.run(query="What loan product and best rates does this borrower qualify for?")
    
    return text