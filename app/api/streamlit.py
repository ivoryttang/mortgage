__import__('pysqlite3')
import sys
sys.modules['sqlite3'] = sys.modules.pop('pysqlite3')
from crewai import Crew
# from agents import Agents
from tasks import Tasks
import streamlit as st
import datetime
import openai
from retell import Retell
import datetime
import streamlit.components.v1 as components
import fitz  # PyMuPDF
from PIL import Image
import io
import json
import openai
import asyncio
from openai import OpenAI

st.set_page_config(page_icon="✈️", layout="wide")
######### azure
import base64
from fastapi import HTTPException
from azure.cosmos import exceptions, CosmosClient, PartitionKey
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient
from azure.core.credentials import AzureKeyCredential
from azure.ai.documentintelligence import DocumentIntelligenceClient
from azure.ai.documentintelligence.models import AnalyzeResult
from azure.storage.blob import BlobServiceClient
from azure.core.exceptions import ResourceExistsError
from azure.identity import DefaultAzureCredential
from fastapi.responses import StreamingResponse
#selenium
# service = Service(executable_path="chromedriver.exe")
# driver = webdriver.Chrome(service=service)

# driver.get("https://google.com")

# time.sleep(10)
# driver.quit()

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



#############



openai.api_key = "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"

client = OpenAI(
    # This is the default and can be omitted
    api_key="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",
)

def icon(emoji: str):
    """Shows an emoji as a Notion-style page icon."""
    st.write(
        f'<span style="font-size: 78px; line-height: 1">{emoji}</span>',
        unsafe_allow_html=True,
    )

###### CREWAI #######
# class LoanCrew:

#     def __init__(self, borrower_profile, ratesheets, date_range, background):
#         self.borrower_profile = borrower_profile
#         self.ratesheets = ratesheets
#         self.background = background
#         self.date_range = date_range
#         self.output_placeholder = st.empty()

#     def run(self):
#         agents = Agents()
#         tasks = Tasks()

#         borrower_profile_analyzer = agents.borrower_profile_analyzer()
#         ratesheet_expert = agents.ratesheet_expert()
#         loan_processor = agents.loan_processor()
#         loan_advisor = agents.loan_advisor()

#         identify_borrower = tasks.identify_borrower(
#             borrower_profile_analyzer,
#             self.borrower_profile,
#             self.background,
#             self.date_range
#         )

#         gather_ratesheet_0 = tasks.gather_ratesheet_0(
#             ratesheet_expert,
#             self.borrower_profile, 
#             self.background, 
#             self.date_range, 
#             self.ratesheets
#         )
#         gather_ratesheet_1 = tasks.gather_ratesheet_1(
#             ratesheet_expert,
#             self.borrower_profile, 
#             self.background, 
#             self.date_range, 
#             self.ratesheets
#         )
#         gather_ratesheet_2 = tasks.gather_ratesheet_2(
#             ratesheet_expert,
#             self.borrower_profile, 
#             self.background, 
#             self.date_range, 
#             self.ratesheets
#         )
#         gather_ratesheet_3 = tasks.gather_ratesheet_3(
#             ratesheet_expert,
#             self.borrower_profile, 
#             self.background, 
#             self.date_range, 
#             self.ratesheets
#         )
#         gather_ratesheet_4 = tasks.gather_ratesheet_4(
#             ratesheet_expert,
#             self.borrower_profile, 
#             self.background, 
#             self.date_range, 
#             self.ratesheets
#         )
#         gather_ratesheet_5 = tasks.gather_ratesheet_5(
#             ratesheet_expert,
#             self.borrower_profile, 
#             self.background, 
#             self.date_range, 
#             self.ratesheets
#         )
#         gather_ratesheet_6 = tasks.gather_ratesheet_6(
#             ratesheet_expert,
#             self.borrower_profile, 
#             self.background, 
#             self.date_range, 
#             self.ratesheets
#         )

#         plan_task = tasks.plan_task(
#             loan_processor,
#             self.borrower_profile, 
#             self.background, 
#             self.date_range, 
#             self.ratesheets
#         )

#         crew = Crew(
#             agents=[
#                 borrower_profile_analyzer, ratesheet_expert, loan_processor, loan_advisor
#             ],
#             tasks=[identify_borrower, gather_ratesheet_0, gather_ratesheet_1, gather_ratesheet_2, gather_ratesheet_3, gather_ratesheet_4, gather_ratesheet_5, gather_ratesheet_6, plan_task],
#             verbose=True
#         )

#         result = crew.kickoff()
#         self.output_placeholder.markdown(result)

#         return result

# #### End of CREW AI ########

##### Start of LangGraph  ########

import os
os.environ['TOKENIZERS_PARALLELISM'] = 'true'
os.environ['MISTRAL_API_KEY'] = 'QCjLjxTgFPTMqUk22fozZeWjxb9jYCnY'
os.environ['TAVILY_API_KEY'] = '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'
os.environ['TOKENIZERS_PARALLELISM'] = 'true'
mistral_api_key = os.getenv("MISTRAL_API_KEY") # Ensure this is set
tavily_api_key = os.getenv("TAVILY_API_KEY")

os.environ['LANGCHAIN_TRACING_V2'] = 'true'
os.environ['LANGCHAIN_ENDPOINT'] = 'https://api.smith.langchain.com'
os.environ['LANGCHAIN_API_KEY'] = "ls__c1506344a66146b2b16a690143aafd21"
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import WebBaseLoader

from langchain_chroma import Chroma
from langchain_mistralai import MistralAIEmbeddings


import chromadb
import chromadb.config

from langchain.indexes import VectorstoreIndexCreator
from langchain_mistralai import ChatMistralAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.pydantic_v1 import BaseModel, Field

os.environ['HF_TOKEN']="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"

urls = [
    "https://www.ecfr.gov/current/title-12/chapter-X/part-1003",
    "https://www.ecfr.gov/current/title-12/chapter-X/part-1022",
    "https://www.ecfr.gov/current/title-12/chapter-X/part-1007"
]

docs = [WebBaseLoader(url).load() for url in urls]
docs_list = [item for sublist in docs for item in sublist]

text_splitter = RecursiveCharacterTextSplitter.from_tiktoken_encoder(
    chunk_size=250, chunk_overlap=0
)
doc_splits = text_splitter.split_documents(docs_list)

parent_splitter = RecursiveCharacterTextSplitter(chunk_size=2000)
child_splitter = RecursiveCharacterTextSplitter(chunk_size=400)
# Add to vectorDB

vectorstore =  Chroma.from_documents(
    documents=doc_splits,
    collection_name="rag-chroma",
    embedding=MistralAIEmbeddings()
)
retriever = vectorstore.as_retriever()
mistral_model = "open-mixtral-8x22b" 

### Retrieval Grader 


# Data model
class GradeDocuments(BaseModel):
    """Binary score for relevance check on retrieved documents."""

    binary_score: str = Field(description="Documents are relevant to the question, 'yes' or 'no'")

# LLM with function call 
llm = ChatMistralAI(model=mistral_model, temperature=0)
structured_llm_grader = llm.with_structured_output(GradeDocuments)

# Prompt 
system = """You are a grader assessing relevance of a retrieved document to a user question. \n 
    If the document contains keyword(s) or semantic meaning related to the question, grade it as relevant. \n
    Give a binary score 'yes' or 'no' score to indicate whether the document is relevant to the question."""
grade_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system),
        ("human", "Retrieved document: \n\n {document} \n\n User question: {question}"),
    ]
)

retrieval_grader = grade_prompt | structured_llm_grader

### Generate

from langchain import hub
from langchain_core.output_parsers import StrOutputParser

# Prompt
prompt = hub.pull("rlm/rag-prompt")

# LLM
llm = ChatMistralAI(model=mistral_model, temperature=0)

# Post-processing
def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)

# Chain
rag_chain = prompt | llm | StrOutputParser()

from langchain_community.tools.tavily_search import TavilySearchResults
web_search_tool = TavilySearchResults(k=3)

from typing_extensions import TypedDict
from typing import List

class GraphState(TypedDict):
    """
    Represents the state of our graph.

    Attributes:
        question: question
        generation: LLM generation
        web_search: whether to add search
        documents: list of documents 
    """
    question : str
    generation : str
    web_search : str
    documents : List[str]

### Router

from typing import Literal

from langchain_core.prompts import ChatPromptTemplate
from langchain_core.pydantic_v1 import BaseModel, Field

# Data model
class RouteQuery(BaseModel):
    """Route a user query to the most relevant datasource."""

    datasource: Literal["vectorstore", "websearch"] = Field(
        ...,
        description="Given a user question choose to route it to web search or a vectorstore.",
    )

# LLM with function call 
llm = ChatMistralAI(model=mistral_model, temperature=0)
structured_llm_router = llm.with_structured_output(RouteQuery)

# Prompt 
system = """You are an expert at routing a user question to a vectorstore or web search.
The vectorstore contains documents related to agents, prompt engineering, and adversarial attacks.
Use the vectorstore for questions on these topics. For all else, use web-search."""
route_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system),
        ("human", "{question}"),
    ]
)

question_router = route_prompt | structured_llm_router

from langchain.schema import Document

### Nodes

def retrieve(state):
    """
    Retrieve documents from vectorstore

    Args:
        state (dict): The current graph state

    Returns:
        state (dict): New key added to state, documents, that contains retrieved documents
    """
    print("---RETRIEVE---")
    question = state["question"]

    # Retrieval
    documents = retriever.invoke(question)
    return {"documents": documents, "question": question}

def generate(state):
    """
    Generate answer using RAG on retrieved documents

    Args:
        state (dict): The current graph state

    Returns:
        state (dict): New key added to state, generation, that contains LLM generation
    """
    print("---GENERATE---")
    question = state["question"]
    documents = state["documents"]
    
    # RAG generation
    generation = rag_chain.invoke({"context": documents, "question": question})
    return {"documents": documents, "question": question, "generation": generation}

def grade_documents(state):
    """
    Determines whether the retrieved documents are relevant to the question
    If any document is not relevant, we will set a flag to run web search

    Args:
        state (dict): The current graph state

    Returns:
        state (dict): Filtered out irrelevant documents and updated web_search state
    """

    print("---CHECK DOCUMENT RELEVANCE TO QUESTION---")
    question = state["question"]
    documents = state["documents"]
    
    # Score each doc
    filtered_docs = []
    web_search = "No"
    for d in documents:
        score = retrieval_grader.invoke({"question": question, "document": d.page_content})
        grade = score.binary_score
        # Document relevant
        if grade.lower() == "yes":
            print("---GRADE: DOCUMENT RELEVANT---")
            filtered_docs.append(d)
        # Document not relevant
        else:
            print("---GRADE: DOCUMENT NOT RELEVANT---")
            # We do not include the document in filtered_docs
            # We set a flag to indicate that we want to run web search
            web_search = "Yes"
            continue
    return {"documents": filtered_docs, "question": question, "web_search": web_search}
    
def web_search(state):
    """
    Web search based based on the question

    Args:
        state (dict): The current graph state

    Returns:
        state (dict): Appended web results to documents
    """

    print("---WEB SEARCH---")
    question = state["question"]
    documents = state["documents"]

    # Web search
    docs = web_search_tool.invoke({"query": question})
    web_results = "\n".join([d["content"] for d in docs])
    web_results = Document(page_content=web_results)
    if documents is not None:
        documents.append(web_results)
    else:
        documents = [web_results]
    return {"documents": documents, "question": question}

### Edges

def route_question(state):
    """
    Route question to web search or RAG 

    Args:
        state (dict): The current graph state

    Returns:
        str: Next node to call
    """

    print("---ROUTE QUESTION---")
    question = state["question"]
    source = question_router.invoke({"question": question})   
    if source.datasource == 'websearch':
        print("---ROUTE QUESTION TO WEB SEARCH---")
        return "websearch"
    elif source.datasource == 'vectorstore':
        print("---ROUTE QUESTION TO RAG---")
        return "vectorstore"

def decide_to_generate(state):
    """
    Determines whether to generate an answer, or add web search

    Args:
        state (dict): The current graph state

    Returns:
        str: Binary decision for next node to call
    """

    print("---ASSESS GRADED DOCUMENTS---")
    question = state["question"]
    web_search = state["web_search"]
    filtered_documents = state["documents"]

    if web_search == "Yes":
        # All documents have been filtered check_relevance
        # We will re-generate a new query
        print("---DECISION: ALL DOCUMENTS ARE NOT RELEVANT TO QUESTION, INCLUDE WEB SEARCH---")
        return "websearch"
    else:
        # We have relevant documents, so generate answer
        print("---DECISION: GENERATE---")
        return "generate"

### Hallucination Grader 

# Data model
class GradeHallucinations(BaseModel):
    """Binary score for hallucination present in generation answer."""

    binary_score: str = Field(description="Answer is grounded in the facts, 'yes' or 'no'")

# LLM with function call 
llm = ChatMistralAI(model=mistral_model, temperature=0)
structured_llm_grader = llm.with_structured_output(GradeHallucinations)

# Prompt 
system = """You are a grader assessing whether an LLM generation is grounded in / supported by a set of retrieved facts. \n 
     Give a binary score 'yes' or 'no'. 'Yes' means that the answer is grounded in / supported by the set of facts."""
hallucination_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system),
        ("human", "Set of facts: \n\n {documents} \n\n LLM generation: {generation}"),
    ]
)

hallucination_grader = hallucination_prompt | structured_llm_grader

### Answer Grader 

# Data model
class GradeAnswer(BaseModel):
    """Binary score to assess answer addresses question."""

    binary_score: str = Field(description="Answer addresses the question, 'yes' or 'no'")

# LLM with function call 
llm = ChatMistralAI(model=mistral_model, temperature=0)
structured_llm_grader = llm.with_structured_output(GradeAnswer)

# Prompt 
system = """You are a grader assessing whether an answer addresses / resolves a question \n 
     Give a binary score 'yes' or 'no'. Yes' means that the answer resolves the question."""
answer_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system),
        ("human", "User question: \n\n {question} \n\n LLM generation: {generation}"),
    ]
)

answer_grader = answer_prompt | structured_llm_grader

def grade_generation_v_documents_and_question(state):
    """
    Determines whether the generation is grounded in the document and answers question

    Args:
        state (dict): The current graph state

    Returns:
        str: Decision for next node to call
    """

    print("---CHECK HALLUCINATIONS---")
    question = state["question"]
    documents = state["documents"]
    generation = state["generation"]

    score = hallucination_grader.invoke({"documents": documents, "generation": generation})
    grade = score.binary_score

    # Check hallucination
    if grade == "yes":
        print("---DECISION: GENERATION IS GROUNDED IN DOCUMENTS---")
        # Check question-answering
        print("---GRADE GENERATION vs QUESTION---")
        score = answer_grader.invoke({"question": question,"generation": generation})
        grade = score.binary_score
        if grade == "yes":
            print("---DECISION: GENERATION ADDRESSES QUESTION---")
            return "useful"
        else:
            print("---DECISION: GENERATION DOES NOT ADDRESS QUESTION---")
            return "not useful"
    else:
        print("---DECISION: GENERATION IS NOT GROUNDED IN DOCUMENTS, RE-TRY---")
        return "not supported"

from langgraph.graph import END, StateGraph

##### End of LangGraph  ########

def load_pdf(file_path):
    with open(file_path, "rb") as pdf_file:
        return pdf_file.read()

def download_stream_generator(download_stream):
    while chunk := download_stream.readall():
        yield chunk

def display_pdf_from_streaming_response(content):
    base64_pdf = base64.b64encode(content).decode('utf-8')
    pdf_bytes = base64.b64decode(base64_pdf)
    doc = fitz.open("pdf", pdf_bytes)
    
    for page_num in range(len(doc)):
        page = doc[page_num]
        image_bytes = page.get_pixmap().tobytes()
        image = Image.open(io.BytesIO(image_bytes))
        st.image(image, caption=f"Page {page_num + 1}", use_column_width=True)

def show_pdf():
    container_name = 'documents'
    blob_name = 'loan-app'

    blob_service_client = BlobServiceClient(account_url=account_url, credential=credentials)
    container_client = blob_service_client.get_container_client(container=container_name)
    blob_client = container_client.get_blob_client(blob=blob_name)

    try:
        download_stream = blob_client.download_blob()
    except Exception as e:
        raise HTTPException(status_code=404, detail="Document not found")

    content = b"".join(download_stream_generator(download_stream))

    if content:
        display_pdf_from_streaming_response(content)
    else:
        st.error("Failed to load PDF content.")
    # doc = fitz.open(file_path)
    # for page in doc:
    #     pix = page.get_pixmap()
    #     img = Image.open(io.BytesIO(pix.tobytes("ppm")))
    #     st.image(img, width=800, output_format="pdf")

def get_chat_response(content: str, user_input: str):
    # return await openai.ChatCompletion.acreate(
    #     model='gpt-4',
    #     messages=[{
    #         "role": "system",
    #         "content": "You are a loan processor assistant." + content},
    #         {"role": "assistant", "content": user_input}],
    #     timeout=15,
    # )
    return client.chat.completions.create(
        model='gpt-4',
        messages=[{
            "role": "system",
            "content": "You are a loan processor assistant." + content},
            {"role": "assistant", "content": user_input}],
    )

if __name__ == "__main__":
    workflow = StateGraph(GraphState)

    # Define the nodes
    workflow.add_node("websearch", web_search) # web search
    workflow.add_node("retrieve", retrieve) # retrieve
    workflow.add_node("grade_documents", grade_documents) # grade documents
    workflow.add_node("generate", generate) # generatae

    # Build graph
    workflow.set_conditional_entry_point(
        route_question,
        {
            "websearch": "websearch",
            "vectorstore": "retrieve",
        },
    )
    workflow.add_edge("websearch", "generate")
    workflow.add_edge("retrieve", "grade_documents")
    workflow.add_conditional_edges(
        "grade_documents",
        decide_to_generate,
        {
            "websearch": "websearch",
            "generate": "generate",
        },
    )
    workflow.add_conditional_edges(
        "generate",
        grade_generation_v_documents_and_question,
        {
            "not supported": "generate",
            "useful": END,
            "not useful": "websearch",
        },
    )

    # Compile
    app = workflow.compile()
    context = """
                    To be completed by the Lender: Lender Loan No./Universal Loan Identifier 106602 / 54930025QSIFXOVOVG0410660220 Page 1 of 9 Agency Case No. Uniform Residential Loan Application Verify and complete the information on this application. If you are applying for this loan with others, each additional Borrower must provide information as directed by your Lender. Section 1: Borrower Information. This section asks about your personal information and your income from employment and other sources, such as retirement, that you want considered to qualify for this loan. 1a. Personal Information Name (First, Middle, Last, Suffix) Juan Carlos Lopez Medina Social Security Number 622-32-0140 (or Individual Taxpayer Identification Number) Alternate Names - List any names by which you are known or any names under which credit was previously received (First, Middle, Last, Suffix) No AKAs Type of Credit O I am applying for individual credit. O I am applying for joint credit. Date of Birth Citizenship (mm/dd/yyyy) 05/24/1981 O U.S. Citizen Permanent Resident Alien Non-Permanent Resident Alien List Name(s) of Other Borrower(s) Applying for this Loan (First, Middle, Last, Suffix) - Use a separator between names Total Number of Borrowers: 1 Each Borrower intends to apply for joint credit. Your initials: Marital Status Dependents (not listed by another Borrower) Married Number 3 Separated Ages 16, 15, 2 O Unmarried (Single, Divorced, Widowed, Civil Union, Domestic Partnership, Registered Reciprocal Beneficiary Relationship) Current Address Street 1262 San Antonio Dr Contact Information Home Phone (831) 821-2406 Cell Phone Work Phone (928) 726-1514 Ext. Email Unit # City King City State CA ZIP 93930 Country United States How Long at Current Address? 6 Years 6 Months Housing C No primary housing expense O Own O Rent ($ /month) If at Current Address for LESS than 2 years, list Former Address Does not apply Mailing Address - if different from Current Address × Does not apply 1b. Current Employment/Self Employment and Income Employer or Business Name TLC Custom Farming Company Does not apply Phone (928) 726-1514 Gross Monthly Income Street 350 West 16th Street Unit # 401 Base $ 2,925.00 /month City Yuma State CA ZIP 85364 Country Overtime $ /month Position or Title Truck Driver Check if this statement applies: Bonus $ I am employed by a family member, property seller, real estate agent, or other party to the transaction. Start Date 02/16/2018 (mm/dd/yyyy) Commission $ Military How long in this line of work? 3 Years 1 Months Entitlements $ /month Other $ /month Check if you are the Business O I have an ownership share of less than 25%. Monthly Income (or Loss) Owner or Self-Employed O I have an ownership share of 25% or more. $ TOTAL $ 2,925.00 /month Borrower Name: Juan Carlos Lopez Medina * 106602 * /month /month *MC 1003 * Uniform Residential Loan Application Freddie Mac Form 65 . Fannie Mae Form 1003 Effective 1/2021 Mortgage Cadence Document Center @ 1087 11/19 127600000320683 | Loan ID # 106602 Page 2 of 9 1c. IF APPLICABLE, Complete Information for Additional Employment/Self Employment and Income X Does not apply 1d. IF APPLICABLE, Complete Information for Previous Employment/Self Employment and Income Provide at least 2 years of current and previous employment and income. x Does not apply 1e. Income from Other Sources x Does not apply Include Income from other sources below. Under Income Source, choose from the sources listed here: · Alimony · Child Support · Interest and Dividends · Notes Receivable · Royalty Payments · Separate Maintenance · Social Security · Unemployment Benefits · VA Compensation · Other . Automobile Allowance · Disablility · Mortgage Credit Certificate · Public Assistance · Retirement (e.g. Pension, IRA) . Boarder Income · Foster Care · Capital Gains · Housing or Parsonage · Mortgage Differential . Trust Payments NOTE: Reveal alimony, child support, separate maintenance, or other income ONLY IF you want it considered in determining your qualification for this loan. Section 2: Financial Information - Assets and Liabilities. This section asks about things you own that are worth money and that you want considered to qualify for this loan. It then asks about your liabilities (or debts) that you pay each month, such as credit cards, alimony, or other expenses. 2a. Assets - Bank Accounts, Retirement, and Other Accounts You Have Include all accounts below. Under Account Type, choose from the account types listed here: · Checking · Certificate of Deposit · Stock Options · Bridge Loan Proceeds . Trust Account . Cash Value of Life Insurance (used for the transaction) · Savings · Mutual Fund . Bonds · Individual Development Account · Money Market · Stocks . Retirement (e.g., 401k, IRA) Account Type - use list above Financial Institution Account Number Cash or Market Value Checking CCFCU $ 8,900.00 Savings CCFCU $ 2,000.00 Provide TOTAL Amount Here $ 10,900.00 2b. Other Assets and Credits You Have Does not apply Include all other assets and credits below. Under Asset or Credit Type, choose from the types listed here: Assets Credits . Proceeds from Real Estate . Proceeds from Sale of · Earnest Money . Relocation Funds . Sweat Equity . Employer Assistance . Rent Credit · Unsecured Borrowed Funds Property to be sold on or Non-Real Estate Asset · Other before closing . Secured Borrowed Funds . Lot Equity · Trade Equity Asset or Credit Type - use list above Cash or Market Value Borrower Paid Fees $ 585.00 Provide TOTAL Amount Here $ 585.00 2c. Liabilities - Credit Cards, Other Debts, and Leases that You Owe Does not apply List all liabilities below (except real estate) and include deferred payments. Under Account Type, choose from the types listed here: · Revolving (e.g., credit cards) · Installment (e.g., car, student, personal loans) · Open 30-Day (balance paid monthly) · Lease (not real estate) · Other Account Type - use list above Company Name Account Number Unpaid Balance To be paid off at or before Closing Monthly Payment Revolving ELAN FIN SVC 6016 $ 719.00 $ 40.00 Revolving THD/CBNA 4254 $ 489.00 $ 15.00 Borrower Name: Juan Carlos Lopez Medina * 106602 * Mortgage Cadence Document Center @ 1087 11/19 127600000320683 | Loan ID # 106602 *MC 1003 * Uniform Residential Loan Application Freddie Mac Form 65 . Fannie Mae Form 1003 Effective 1/2021 Page 3 of 9 Revolving GS BANK USA 2529 $ 311.00 $ 31.00 Revolving SYNCB/SWTWTR 3313 $ 190.00 $ 11.00 Revolving THD/CBNA 5067 $ 182.00 $ 29.00 Revolving SYNCB/LOW 7608 $ 16.00 $ 16.00 2d. Other Liabilities and Expenses X Does not apply Section 3: Financial Information - Real Estate. This section asks you to list all properties you currently own and what you owe on them. I do not own any real estate 3a. Property You Own If you are refinancing, list the property you are refinancing FIRST. Address Street 1262 San Antonio Dr City King City Intended Occupancy: Investment, Primary Residence, Second Home, Other Status: Sold, State CA ZIP 93930 Monthly Insurance, Taxes, Association Dues, etc. if not Included in Mortgage Payment Unit # Country For 2-4 Unit Primary or Investment Property Pending Sale, or Retained Property Value $ 237,280.00 Retained Primary Residence $ 187.88 Monthly Rental Income For LENDER to calculate: Net Monthly Rental Income $ 0.00 $ Mortgage Loans on this Property Does not apply Monthly Mortgage Payment $ 693.00 Creditor Name Account Number US BANK HOME MORTGAGE 5159902837443 To be paid off Unpaid at or before Balance closing Type: FHA, VA, Conventional, USDA-RD, Other Credit Limit (if applicable) $ 88,592.00 × $ 3b. IF APPLICABLE, Complete Information for Additional Property Does not apply Section 4: Loan and Property Information. This section asks about the loan\'s purpose and the property you want to purchase or refinance. 4a. Loan and Property Information Loan Amount $ 93,367.00 Loan Purpose O Purchase Refinance ) Other (specify) Property Address Street 1262 San Antonio Dr Unit # City King City State CA ZIP 93930 County Monterey Number of Units 1 Property Value $ 237,280.00 Occupancy O Primary Residence Second Home Investment Property FHA Secondary Residence 1. Mixed-Use Property. If you will occupy the property, will you set aside space within the property to operate your own business? (e.g., daycare facility, medical office, beauty/barber shop) NO C YES 2. Manufactured Home. Is the property a manufactured home? (e.g., a factory built dwelling built on a permanent chassis) NO YES 4b. Other New Mortgage Loans on the Property You are Buying or Refinancing Does not apply 4c. Rental Income on the Property You Want to Purchase For Purchase Only x Does not apply Borrower Name: Juan Carlos Lopez Medina *MC 1003 * Uniform Residential Loan Application Freddie Mac Form 65 . Fannie Mae Form 1003 Effective 1/2021 * 106602 * Mortgage Cadence Document Center @ 1087 11/19 127600000320683 | Loan ID # 106602 Page 4 of 9 4d. Gifts or Grants You Have Been Given or Will Receive for this Loan Does not apply Include all gifts and grants below. Under Source, choose from the sources listed here: · Community Nonprofit · Federal Agency · Relative · State Agency · Lender · Employer · Local Agency · Religious Nonprofit . Unmarried Partner · Other Borrower Name: Juan Carlos Lopez Medina * 106602 * Mortgage Cadence Document Center @ 1087 11/19 127600000320683 | Loan ID # 106602 *MC 1003 * Uniform Residential Loan Application Freddie Mac Form 65 . Fannie Mae Form 1003 Effective 1/2021 Page 5 of 9 Section 5: Declarations. This section asks you specific questions about the property, your funding, and your past financial history. 5a. About this Property and Your Money for this Loan A. Will you occupy the property as your primary residence? NO YES If YES, have you had an ownership interest in another property in the last three years? If YES, complete (1) and (2) below: NO YES (1) What type of property did you own: primary residence (PR), FHA secondary residence (SR), second home (SH), or investment property (IP)? PR (2) How did you hold title to the property: by yourself (S), jointly with your spouse (SP), or jointly with another person (O)? O B. If this is a Purchase Transaction: Do you have a family relationship or business affiliation with the seller of the property? NO YES C. Are you borrowing any money for this real estate transaction (e.g., money for your closing costs or down payment) or obtaining any money from another party, such as the seller or realtor, that you have not disclosed on this loan application? If YES, what is the amount of this money? NO YES $ D. 1. Have you or will you be applying for a mortgage loan on another property (not the property securing this loan) on or before closing of this transaction that is not disclosed on this loan application? NO O YES 2. Have you or will you be applying for any new credit (e.g., installment loan, credit card, etc.) on or before closing of this loan that is not disclosed on the application? NO YES E. Will this property be subject to a lien that could take priority over the first mortgage lien, such as a clean energy lien paid through your property taxes (e.g., the Property Assessed Clean Energy Program)? NO YES 5b. About Your Finances F. Are you a co-signer or guarantor on any debt or loan that is not disclosed on this application? NO YES G. Are there any outstanding judgments against you? NO YES H. Are you currently delinquent on or in default on a Federal debt? NO YES I. Are you party to a lawsuit in which you potentially have any personal financial liability? NO YES J. Have you conveyed title to any property in lieu of foreclosure in the past 7 years? NO YES K. Within the past 7 years, have you completed a pre-foreclosure sale or short sale, whereby the property was sold to a third party and the Lender agreed to accept less than the outstanding mortgage balance due? NO YES L. Have you had property foreclosued upon in the last 7 years? NO YES M. Have you declared bankruptcy within the past 7 years? If YES, identify the type(s) of bankruptcy: Chapter 7 Chapter 11 Chapter 12 Chapter 13 NO YES Borrower Name: Juan Carlos Lopez Medina *MC 1003 * Uniform Residential Loan Application Freddie Mac Form 65 . Fannie Mae Form 1003 Effective 1/2021 * 106602 * Mortgage Cadence Document Center @ 1087 11/19 127600000320683 | Loan ID # 106602 Page 6 of 9 Section 6: Acknowledgments and Agreements. This section tells you about your legal obligations when you sign this application. Acknowledgments and Agreements Definitions: · "Lender" includes the Lender\'s agents, service providers, and any of their successors and assigns. . If this application is created as (or converted into) an "electronic application", I consent to the use of "electronic records" and "electronic signatures" as the terms are defined in and governed by applicable Federal and/or state electronic transactions laws. · I intend to sign and have signed this application either using my: (a) electronic signature; or (b) a written signature and agree that if a paper version of this . "Other Loan Participants" includes (i) any actual or potential owners of a loan resulting from this application (the "Loan"), (ii) acquirers of any beneficial or other interest in the Loan, (iii) any mortgage insurer, (iv) any guarantor, (v) any servicer of the Loan, and (vi) any of these parties\' service providers, successors or assigns. application is converted into an electronic application, the application will be an electronic record, and the representation of my written signature on this application will be my binding electronic signature. I agree to, acknowledge, and represent the following: (1) The Complete Information for this Application · The information I have provided in this application is true, accurate, and complete as of the date I signed this application. . I agree that the application, if delivered or transmitted to the Lender or Other Loan Participants as an electronic record with my electronic signature, will be as effective and enforceable as a paper application signed by me in writing. · If the information I submitted changes or I have new information before closing of the Loan, I must change and supplement this application, including providing any updated/supplemented real estate sales contract. (5) Delinquency . The Lender and Other Loan Participants may report information about my account to credit bureaus. Late payments, missed payments, or other defaults on my account may be reflected in my credit report and will likely affect my credit score. . If I have trouble making my payments I understand that I may contact a HUD-approved housing counseling organization for advice about actions I can take to meet my mortgage obligations. (6) Authorization for Use and Sharing of Information . For purchase transactions: The terms and conditions of any real estate sales contract signed by me in connection with this application are true, accurate, and complete to the best of my knowledge and belief. I have not entered into any other agreement, written or oral, in connection with this real estate transaction. . The Lender and Other Loan Participants may rely on the information contained in the application before and after closing of the Loan. · Any intentional or negligent misrepresentation of information may result in the imposition of: By signing below, in addition to the representations and agreements made above, I expressly authorize the Lender and Other Loan Participants to obtain, use, and share with each other (i) the loan application and related loan information and documentation, (ii) a consumer credit report on me, and (iii) my tax return information, as necessary to perform the actions listed below, for so long as they have an interest in my loan or its servicing: (a) civil liability on me, including monetary damages, if a person suffers any loss because the person relied on any misrepresentation that I have made on this application, and/or (b) criminal penalties on me including, but not limited to, fine or imprisonment or both under the provisions of Federal law (18 U.S.C. §§ 1001 et seq.). (a) process and underwrite my loan; (2) The Property\'s Security (b) verify any data contained in my consumer credit report, my loan application and other information supporting my loan application; The Loan I have applied for in this application will be secured by a mortgage or deed of trust which provides the Lender a security interest in the property described in this application. (c) inform credit and investment decisions by the Lender and Other Loan Participants; (3) The Property\'s Appraisal, Value, and Condition . Any appraisal or value of the property obtained by the Lender is for use by the Lender and Other Loan Participants. (d) perform audit, quality control, and legal compliance analysis and reviews; · The Lender and Other Loan Participants have not made any representation or warranty, express or implied, to me about the property, its condition, or its value. (e) perform analysis and modeling for risk assessments; (f) monitor the account for this loan for potential delinquencies and determine any assistance that may be available to me; and (g) other actions permissible under applicable law. (4) Electronic Records and Signatures . The Lender and Other Loan Participants may keep any paper record and/or electronic record of this application, whether or not the Loan is approved. Borrower Signature Date (mm/dd/yyyy) Juan Carlos Lopez Medina Borrower Name: Juan Carlos Lopez Medina * 106602 * Mortgage Cadence Document Center @ 1087 11/19 127600000320683 | Loan ID # 106602 *MC 1003 * Uniform Residential Loan Application Freddie Mac Form 65 . Fannie Mae Form 1003 Effective 1/2021 Page 7 of 9 Section 7: Military Service. This section asks questions about your (or your deceased spouse\'s) military service. Military Service of Borrower Military Service - Did you (or your deceased spouse) ever serve, or are you currently serving, in the United States Armed Forces? If YES, check all that apply: Currently serving on active duty with projected expiration date of service/tour Currently retired, discharged, or separated from service Only period of service was as a non-activated member of the Reserve or National Guard Surviving spouse O NO YES (mm/dd/yyyy) Borrower Name: Juan Carlos Lopez Medina *MC 1003 * Uniform Residential Loan Application Freddie Mac Form 65 . Fannie Mae Form 1003 Effective 1/2021 * 106602 * Mortgage Cadence Document Center @ 1087 11/19 127600000320683 | Loan ID # 106602 Page 8 of 9 Section 8: Demographic Information. This section asks about your ethnicity, sex, and race. Demographic Information of Borrower The purpose of collecting this information is to help ensure that all applicants are treated fairly and that the housing needs of communities and neighborhoods are being fulfilled. For residential mortgage lending, Federal law requires that we ask applicants for their demographic information (ethnicity, sex, and race) in order to monitor our compliance with equal credit opportunity, fair housing, and home mortgage disclosure laws. You are not required to provide this information, but are encouraged to do so. You may select one or more designations for "Ethnicity" and one or more designations for "Race." The law provides that we may not discriminate on the basis of this information, or on whether you choose to provide it. However, if you choose not to provide the information and you have made this application in person, Federal regulations require us to note your ethnicity, sex, and race on the basis of visual observation or surname. The law also provides that we may not discriminate on the basis of age or marital status information you provide in this application. If you do not wish to provide some or all of this information, please check below. Ethnicity: Check one or more Race: Check one or more X Hispanic or Latino American Indian or Alaska Native X Mexican Puerto Rican Cuban Print name of enrolled or principal tribe: Other Hispanic or Latino Print origin: Asian For example: Argentinean, Colombian, Dominican, Nicaraguan, Asian Indian Chinese Filipino Salvadoran, Spaniard, and so on Japanese Korean Vietnamese Other Asian Not Hispanic or Latino Print race: I do not wish to provide this information For example: Hmong, Laotian, Thai, Pakistani, Cambodian, and so on. Sex Black or African American Female Native Hawaiian or Other Pacific Islander × Male Native Hawaiian Guamanian or Chamorro Samoan I do not wish to provide this information Other Pacific Islander Print race: For example: Fijian, Tongan, and so on. X White I do not wish to provide this information To Be Completed by Financial Institution (for application taken in person): Was the ethnicity of the Borrower collected on the basis of visual observation or surname? O NO YES Was the sex of the Borrower collected on the basis of visual observation or surname? O NO O YES Was the race of the Borrower collected on the basis of visual observation or surname? C NO O YES The Demographic Information was provided through: Face-to-Face Interview (includes Electronic Media w/Video Component) O Telephone Interview O Fax or Mail O Email or Internet Borrower Name: Juan Carlos Lopez Medina *MC 1003 * Uniform Residential Loan Application Freddie Mac Form 65 . Fannie Mae Form 1003 Effective 1/2021 * 106602 * Mortgage Cadence Document Center @ 1087 11/19 127600000320683 | Loan ID # 106602 Page 9 of 9 Section 9: Loan Originator Information. To be completed by your Loan Originator. Loan Originator Information Loan Originator Organization Name Central Coast Federal Credit Union Address 4242 Gigling Road, , Seaside, CA 93955 Loan Originator Organization NMLSR ID# 786119 State License ID# Loan Originator Name Carol Lopez Loan Originator NMLSR ID# 268123 State License ID# CA-DOC268123 Email clopez@wescom.org Phone (888) 493-7266 Signature Date (mm/dd/yyyy) 03/10/2021 Borrower Name: Juan Carlos Lopez Medina * 106602 * *MC 1003 * Uniform Residential Loan Application Freddie Mac Form 65 . Fannie Mae Form 1003 Effective 1/2021 Mortgage Cadence Document Center @ 1087 11/19 127600000320683 | Loan ID # 106602 To be completed by the Lender: Lender Loan No./Universal Loan Identifier 106602 / 54930025QSIFXOVOVG0410660220 Agency Case No. Uniform Residential Loan Application - Lender Loan Information This section is completed by your Lender. L1. Property and Loan Information Community Property State At least one borrower lives in a community property state. The property is in a community property state. Transaction Detail Conversion of Contract for Deed or Land Contract Renovation Construction-Conversion/Construction-to-Permanent O Single-Closing Two-Closing Construction/Improvement Costs $ Lot Acquired Date (mm/dd/yyyy) Original Cost of Lot $ Project Type Condominium Cooperative Refinance Type Refinance Program O No Cash Out Full Documentation Limited Cash Out Interest Rate Reduction Cash Out Streamlined without Appraisal Other Energy Improvement Mortgage loan will finance energy-related improvements. Property is currently subject to a lien that could take priority over the first mortgage lien, such as a clean energy lien paid for through property taxes (e.g., the Property Assessed Clean Energy program). Planned Unit Development (PUD) x Property is not located in a project L2. Title Information Title to the Property Will be Held in What Name(s): For Refinance: Title to the Property is Currently Held in What Name(s): Estate Will be Held In Trust Information Fee Simple O Title Will be Held by an Inter Vivos (Living) Trust Leasehold Expiration Date (mm/dd/yyyy) C Title Will be Held by a Land Trust Manner in Which Title Will be Held Indian Country Land Tenure ) Sole Ownership Joint Tenancy with Right of Survivorship O Fee Simple On a Reservation O Life Estate )Tenancy by the Entirety Individual Trust Land (Allotted/Restricted) C Tenancy in Common O Other Tribal Trust Land On a Reservation Tribal Trust Land Off Reservation O Alaska Native Corporation Land L3. Mortgage Loan Information Mortgage Type Applied For Terms of Loan Mortgage Lien Type O Conventional USDA-RD Note Rate 2.250% First Lien FHA O VA Other: Loan Term 180 (months) Subordinate Lien Amortization Type Proposed Monthly Payment for Property O Fixed Rate O Other (explain): Adjustable Rate: First Mortgage (P & I) $ 611.63 If Adjustable Rate: Subordinate Lien(s) (P & I) $ 0.00 Initial Period Prior to First Adjustment (months) Homeowner\'s Insurance $ 51.25 Subsequent Adjustment Period (months) Supplemental Property Insurance $ 0.00 Loan Features Balloon / Balloon Term (months) Property Taxes $ 104.21 Interest Only / Interest Only Term (months) Mortgage Insurance $ 0.00 Negative Amortization Association/Project Dues (Condo, Co-Op, PUD) $ 0.00 Prepayment Penalty / Prepayment Penalty Term .(months) Other $ 0.00 Temporary Interest Rate Buydown / Initial Buydown Rate % TOTAL $ 767.09 Other (explain): Borrower Name(s): Juan Carlos Lopez Medina Uniform Residential Loan Application - Lender Loan Information Freddie Mac Form 65 . Fannie Mae Form 1003 Effective 1/2021 * 106602 * Mortgage Cadence Document Center @ 1087 05/19 127600000320683 | Loan ID # 106602 *MC 1003 * L4. Qualifying the Borrower - Minimum Required Funds or Cash Back DUE FROM BORROWER(S) A. Sales Contract Price $ B. Improvements, Renovations, and Repairs $ C. Land (if acquired separately) $ D. For Refinance: Balance of Mortgage Loans on the Property to be paid off in the Transaction (See Table 3a. Property You Own) $ 88,592.00 E. Credit Cards and Other Debts Paid Off (See Table 2c. Liabilities - Credit Cards, Other Debts, and Leases that You Owe) $ F. Borrower Closing Costs (including Prepaid and Initial Escrow Payments) $ 4,952.64 G. Discount Points $ 0.00 H. TOTAL DUE FROM BORROWER(s) (Total of A thru G) $ 93,544.64 TOTAL MORTGAGE LOANS I. Loan Amount Loan Amount Excluding Financed Mortgage Insurance (or Mortgage Insurance Equivalent) $93,367.00 Financed Mortgage Insurance (or Mortgage Insurance Equivalent) Amount $ $ 93,367.00 J. Other New Mortgage Loans on the Property the Borrower(s) is Buying or Refinancing (See Table 4b. Other New Mortgage Loans on the Property You are Buying or Refinancing) $ K. TOTAL MORTGAGE LOANS (Total of I and J) $ 93,367.00 TOTAL CREDITS L. Seller Credits (Enter the amount of Borrower(s) costs paid by the property seller) $ M. Other Credits (Enter the sum of all other credits - Borrower Paid Fees, Earnest Money, Employer Assisted Housing, Lease Purchase Fund, Lot Equity, Relocation Funds, Sweat Equity, Trade Equity, Other) $ 585.00 N. TOTAL CREDITS (Total of L and M) $ 585.00 CALCULATION TOTAL DUE FROM BORROWER(s) (Line H) $ 93,544.64 LESS TOTAL MORTGAGE LOANS (Line K) AND TOTAL CREDITS (Line N) - $ -93,952.00 Cash From/To the Borrower (Line H minus Line K and Line N) NOTE: This amount does not include reserves or other funds that may be required by the Lender to be verified. $ -407.36 *MC 1003 * Uniform Residential Loan Application - Lender Loan Information Freddie Mac Form 65 . Fannie Mae Form 1003 Effective 1/2021 Borrower Name(s): Juan Carlos Lopez Medina * 106602 * Mortgage Cadence Document Center @ 1087 05/19 127600000320683 | Loan ID # 106602 To be completed by the Lender: Lender Loan No./Universal Loan Identifier 106602 / 54930025QSIFXOVOVG0410660220 Agency Case No. Uniform Residential Loan Application - Continuation Sheet Continuation Sheet Use this continuation sheet if you need more space to complete the Uniform Residential Loan Application. Borrower Name: (First, Middle, Last, Suffix) Juan Carlos Lopez Medina Additional Information CALIFORNIA CIVIL CODE SECTION 1812.30(j) PROVIDES THAT A MARRIED APPLICANT MAY APPLY FOR A SEPARATE ACCOUNT. I/We fully understand that it is a federal crime punishable by fine or imprisonment, or both, to knowingly make any false statements concerning any of the above facts as applicable under the provisions of federal law (18 U.S.C. §§ 1001 et seq.). Borrower Signature Juan Carlos Lopez Medina Date (mm/dd/yyyy) Borrower Name: Juan Carlos Lopez Medina *MC 1003 * * 106602 * Mortgage Cadence Document Center @ 1087 03/19 127600000320683 | Loan ID # 106602 Uniform Residential Loan Application - Continuation Sheet Freddie Mac Form 65. Fannie Mae Form 1003 Effective 1/2021
                    """
    st.markdown(
        """
        <style>
        .css-1l02zno {
            padding: 0 !important;
        }
        </style>
        """,
        unsafe_allow_html=True
    )
    col1, col2 = st.columns([2, 1])
    with col1:
        st.subheader("Application Form 1003")
        st.subheader("",divider="grey", anchor=False)
        # pdf_file = load_pdf("./form 1003.pdf")
        # st.download_button(
        #     label="Download PDF",
        #     data=pdf_file,
        #     file_name="download.pdf",
        #     mime="application/octet-stream"
        # )
        show_pdf()

    today = datetime.datetime.now().date()
    next_year = today.year + 1
    jan_16_next_year = datetime.date(next_year, 1, 10)

    # get retell transcript
    retell_client = Retell(
        api_key="24aefdf4-cb00-4da2-809b-18747c9ff77d",
    )
    transcript = retell_client.call.list()[0].transcript
    
    with st.sidebar:
        st.header("👇 Confirm your details")
        st.markdown("Borrower input, application, and uploaded financial documents to process the loan.")
        with st.form("my_form"):
            borrower_profile = ""
            ratesheets = ["Rocket Mortgage", "EMET", "NMSI", "Pacific Bay", "Preferred Rate", "PRMG", "Provident Funding"]
            date_range = st.date_input(
                "Loan deadline:",
                min_value=today,
                value=(today, jan_16_next_year + datetime.timedelta(days=6)),
                format="MM/DD/YYYY",
            )
            background = st.markdown("Borrower's description of financial situation and goals:")
            with st.expander("Show more"):
                st.markdown(transcript)
            
            
            submitted = st.form_submit_button("Generate POS Underwrite")

        st.divider()
        st.markdown("Documents Provided:")
        with st.expander("Show more"):
            st.button("Loan Application")
            st.button("W-2")
            st.button("Paystub")
            st.button("Bank Statement")
            st.button("ID")
            st.button("Proof of Income")
            st.button("Gift Letter")
            st.button("Credit Report")
    
    with col2:
        if 'chat_history' not in st.session_state:
            st.session_state.chat_history = []

        # Layout the page
        st.subheader("Chat with Docta")
        # Display chat history
        for message in st.session_state.chat_history:
            st.write(message)
        # Using a form for input to bundle the input and button, which improves interaction
        with st.form(key='chat_form'):
            user_input = st.text_input("Type your message here...", key='user_input')
            submit_button, reg_button = st.columns(2)
            with submit_button:
                submit_button = st.form_submit_button("Send")
            with reg_button:
                reg_button = st.form_submit_button("Compliance Check")

        if reg_button and user_input:
            inputs = {"question": user_input}
            for output in app.stream(inputs):
                for key, value in output.items():
                    print(f"Finished running: {key}:")
            answer = "Docta: " + value["generation"]
            st.session_state.chat_history.append(answer)
            st.experimental_rerun()
        #Handling the message sending
        if submit_button:
            if user_input:  # Check if the user has actually typed something
                with st.spinner('Generating...'):
                    # Append user question to chat history
                    st.session_state.chat_history.append("You: " + user_input)
                    # ask gpt
                    try:
                        response = get_chat_response(context, user_input)
                        answer = "Docta: " + str(response.choices[0].message.content)
                        st.session_state.chat_history.append(answer)
                        st.experimental_rerun()
                    except Exception as e:
                        st.error(f"An error occurred: {e}")
                    # Clear the input box after sending the message
                    st.session_state.user_input = ""
            else:
                st.warning('Please enter a prompt.')
        

    if submitted:
        with col2:
            with st.status("🤖 **Agents generating preliminary underwriting...**", state="running", expanded=True) as status:
                with st.container(height=500, border=False):
                    crew = LoanCrew(borrower_profile, ratesheets, date_range, background)
                    result = crew.run()
                    
                status.update(label="✅ Mortgage Assessment Ready!",
                            state="complete", expanded=False)

            st.subheader("Here is your processed loan", anchor=False, divider="grey")
            st.markdown(result)
