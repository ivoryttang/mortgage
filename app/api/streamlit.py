from crewai import Crew
from agents import Agents
from tasks import Tasks
import streamlit as st
import datetime
import openai
from retell import Retell


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


if __name__ == "__main__":
    st.subheader("Loan Recommendation")

    st.markdown("Let Domus' AI agents find your best loan product!")
    st.subheader("",divider="rainbow", anchor=False)
    import datetime

    today = datetime.datetime.now().date()
    next_year = today.year + 1
    jan_16_next_year = datetime.date(next_year, 1, 10)

    # get retell transcript
    retell_client = Retell(
        api_key="24aefdf4-cb00-4da2-809b-18747c9ff77d",
    )
    transcript = retell_client.call.list()[0].transcript
    # get documents

    # get ratesheets

    with st.sidebar:
        st.header("👇 Confirm your details")
        st.markdown("We will use your consultation notes and uploaded documents to generate your loan recommendation.")
        with st.form("my_form"):
            borrower_profile = ""
            ratesheets = ["Rocket Mortgage", "EMET", "NMSI", "Pacific Bay", "Preferred Rate", "PRMG", "Provident Funding"]
            date_range = st.date_input(
                "When do you need your loan by?",
                min_value=today,
                value=(today, jan_16_next_year + datetime.timedelta(days=6)),
                format="MM/DD/YYYY",
            )
            background = st.text_area("High level description of your financial situation and goals?",
                                     placeholder=transcript, height=400)
            if background == "":
                background = transcript
            
            #"I'm looking to move into a single family home with my two kids who are attending elementary school. We plan to stay here for the next 20 years at least.")

            submitted = st.form_submit_button("Submit")

        st.divider()


    if submitted:
        with st.status("🤖 **Agents at work...**", state="running", expanded=True) as status:
            with st.container(height=500, border=False):
                crew = LoanCrew(borrower_profile, ratesheets, date_range, background)
                result = crew.run()
            status.update(label="✅ Mortgage Plan Ready!",
                        state="complete", expanded=False)

        st.subheader("Here is your loan recommendation", anchor=False, divider="rainbow")
        st.markdown(result)