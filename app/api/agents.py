from crewai import Agent
import streamlit as st
from langchain_community.llms import OpenAI

from tools.browser_tools import BrowserTools
from tools.calculator_tools import CalculatorTools
from tools.search_tools import SearchTools
from tools.ratesheet_tools import RatesheetTools
import openai

openai.api_key = "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"

def streamlit_callback(step_output):
    # This function will be called after each step of the agent's execution
    st.markdown("---")
    for step in step_output:
        if isinstance(step, tuple) and len(step) == 2:
            action, observation = step
            if isinstance(action, dict) and "tool" in action and "tool_input" in action and "log" in action:
                st.markdown(f"# Action")
                st.markdown(f"**Tool:** {action['tool']}")
                st.markdown(f"**Tool Input** {action['tool_input']}")
                st.markdown(f"**Log:** {action['log']}")
                st.markdown(f"**Action:** {action['Action']}")
                st.markdown(
                    f"**Action Input:** ```json\n{action['tool_input']}\n```")
            elif isinstance(action, str):
                st.markdown(f"**Action:** {action}")
            else:
                st.markdown(f"**Action:** {str(action)}")

            st.markdown(f"**Observation**")
            if isinstance(observation, str):
                observation_lines = observation.split('\n')
                for line in observation_lines:
                    if line.startswith('Title: '):
                        st.markdown(f"**Title:** {line[7:]}")
                    elif line.startswith('Link: '):
                        st.markdown(f"**Link:** {line[6:]}")
                    elif line.startswith('Snippet: '):
                        st.markdown(f"**Snippet:** {line[9:]}")
                    elif line.startswith('-'):
                        st.markdown(line)
                    else:
                        st.markdown(line)
            else:
                st.markdown(str(observation))
        else:
            st.markdown(step)


class Agents():

    def borrower_profile_analyzer(self):
        return Agent(
            role='Loan officer',
            goal='Gather Borrower information and summarize important points',
            backstory='An expert in analyzing borrower information to help assess loan qualification',
            tools=[
                SearchTools.search_internet,
                BrowserTools.scrape_and_summarize_website,
            ],
            verbose=True,
            step_callback=streamlit_callback,
        )

    def ratesheet_expert(self):
        return Agent(
            role='Ratesheet Expert',
            goal='Understand complex ratesheets to find best rates for borrower',
            backstory="""A knowledgeable loan processor who knows how to understand ratesheets and find rates that make sense for each borrower""",
            tools=[
                RatesheetTools.scrape_and_summarize_EMET_ratesheet,
                RatesheetTools.scrape_and_summarize_provident_funding_ratesheet,
                RatesheetTools.scrape_and_summarize_NMSI_ratesheet,
                RatesheetTools.scrape_and_summarize_pacific_bay_ratesheet,
                RatesheetTools.scrape_and_summarize_preferred_rate_ratesheet,
                RatesheetTools.scrape_and_summarize_rocket_mortgage_ratesheet,
                RatesheetTools.scrape_and_summarize_PRMG_ratesheet
            ],
            verbose=True,
            step_callback=streamlit_callback,
        )

    def loan_processor(self):
        return Agent(
            role='Loan Processor',
            goal="""Calculate the rate and terms and conditions for the loan product suited for this borrower""",
            backstory="""Specialist in taking ratesheet and borrower information and making a loan assessment""",
            tools=[
                CalculatorTools.calculate,
            ],
            verbose=True,
            step_callback=streamlit_callback,
        )
    
    def loan_advisor(self):
        return Agent(
            role='Loan Advisor',
            goal="""Explain the loan decision to the borrower, including and caveats and specific terms.""",
            backstory="""Specialized in giving relevant loan advice and summarizing loan processing results to the borrower.""",
            tools=[
                SearchTools.search_internet,
                BrowserTools.scrape_and_summarize_website
            ],
            verbose=True,
            step_callback=streamlit_callback,
        )