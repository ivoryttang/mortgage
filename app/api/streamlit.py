from crewai import Crew
from agents import Agents
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

openai.api_key = "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"
st.set_page_config(page_icon="✈️", layout="wide")


def icon(emoji: str):
    """Shows an emoji as a Notion-style page icon."""
    st.write(
        f'<span style="font-size: 78px; line-height: 1">{emoji}</span>',
        unsafe_allow_html=True,
    )


class LoanCrew:

    def __init__(self, borrower_profile, ratesheets, date_range, background):
        self.borrower_profile = borrower_profile
        self.ratesheets = ratesheets
        self.background = background
        self.date_range = date_range
        self.output_placeholder = st.empty()

    def run(self):
        agents = Agents()
        tasks = Tasks()

        borrower_profile_analyzer = agents.borrower_profile_analyzer()
        ratesheet_expert = agents.ratesheet_expert()
        loan_processor = agents.loan_processor()
        loan_advisor = agents.loan_advisor()

        identify_borrower = tasks.identify_borrower(
            borrower_profile_analyzer,
            self.borrower_profile,
            self.background,
            self.date_range
        )

        gather_ratesheet_0 = tasks.gather_ratesheet_0(
            ratesheet_expert,
            self.borrower_profile, 
            self.background, 
            self.date_range, 
            self.ratesheets
        )
        gather_ratesheet_1 = tasks.gather_ratesheet_1(
            ratesheet_expert,
            self.borrower_profile, 
            self.background, 
            self.date_range, 
            self.ratesheets
        )
        gather_ratesheet_2 = tasks.gather_ratesheet_2(
            ratesheet_expert,
            self.borrower_profile, 
            self.background, 
            self.date_range, 
            self.ratesheets
        )
        gather_ratesheet_3 = tasks.gather_ratesheet_3(
            ratesheet_expert,
            self.borrower_profile, 
            self.background, 
            self.date_range, 
            self.ratesheets
        )
        gather_ratesheet_4 = tasks.gather_ratesheet_4(
            ratesheet_expert,
            self.borrower_profile, 
            self.background, 
            self.date_range, 
            self.ratesheets
        )
        gather_ratesheet_5 = tasks.gather_ratesheet_5(
            ratesheet_expert,
            self.borrower_profile, 
            self.background, 
            self.date_range, 
            self.ratesheets
        )
        gather_ratesheet_6 = tasks.gather_ratesheet_6(
            ratesheet_expert,
            self.borrower_profile, 
            self.background, 
            self.date_range, 
            self.ratesheets
        )

        plan_task = tasks.plan_task(
            loan_processor,
            self.borrower_profile, 
            self.background, 
            self.date_range, 
            self.ratesheets
        )

        crew = Crew(
            agents=[
                borrower_profile_analyzer, ratesheet_expert, loan_processor, loan_advisor
            ],
            tasks=[identify_borrower, gather_ratesheet_0, gather_ratesheet_1, gather_ratesheet_2, gather_ratesheet_3, gather_ratesheet_4, gather_ratesheet_5, gather_ratesheet_6, plan_task],
            verbose=True
        )

        result = crew.kickoff()
        self.output_placeholder.markdown(result)

        return result

def load_pdf(file_path):
    with open(file_path, "rb") as pdf_file:
        return pdf_file.read()


def show_pdf(file_path):
    """ Utility function to display PDF as images in Streamlit """
    doc = fitz.open(file_path)
    for page in doc:
        pix = page.get_pixmap()
        img = Image.open(io.BytesIO(pix.tobytes("ppm")))
        st.image(img, width=800, output_format="pdf")

if __name__ == "__main__":

    col1, col2 = st.columns([3, 1])
    with col1:
        st.subheader("Application Form 1003")
        st.subheader("",divider="grey", anchor=False)
        pdf_file = load_pdf("./form 1003.pdf")
        st.download_button(
            label="Download PDF",
            data=pdf_file,
            file_name="download.pdf",
            mime="application/octet-stream"
        )
        show_pdf("./form 1003.pdf")

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
        st.markdown("Chat with Docta")

        # Using a form for input to bundle the input and button, which improves interaction
        with st.form(key='chat_form'):
            user_input = st.text_input("Type your message here...", key='user_input')
            submit_button = st.form_submit_button("Send")

        # Handling the message sending
        if submit_button:
            if user_input:  # Check if the user has actually typed something
                # Append user question to chat history
                st.session_state.chat_history.append("You: " + user_input)
                # Generate a response here, for example, a simple echo
                response = "Docta: " + user_input  # Simulate a response for demonstration
                # Append bot response to chat history
                st.session_state.chat_history.append(response)
                # Clear the input box after sending the message
                st.session_state.user_input = ""

        # Display chat history
        for message in st.session_state.chat_history:
            st.text(message)

    if submitted:
        with col2:
            with st.status("🤖 **Agents at work...**", state="running", expanded=True) as status:
                with st.container(height=500, border=False):
                    crew = LoanCrew(borrower_profile, ratesheets, date_range, background)
                    result = crew.run()
                status.update(label="✅ Mortgage Plan Ready!",
                            state="complete", expanded=False)

            st.subheader("Here is your processed loan", anchor=False, divider="grey")
            st.markdown(result)