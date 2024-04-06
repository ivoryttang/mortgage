from crewai import Task
from textwrap import dedent
from datetime import date


class Tasks():

    def identify_borrower(self, agent, borrower_profile, background, date_range):
        return Task(description=dedent(f"""
            Analyze and select the information provided by the borrower. 

            Your final answer must be a detailed
            report on the borrower and everything you found out
            about them, including their personal information (name, marital status, social security number, date of birth, dependents), financial information
            (income, bank statements, employment history, investment accounts, debts, credit report and score, monthly expenses), property information (property type and details, current property ownership),
            additional document information (Down Payment: Source of the down payment, including savings, gifts, or grants, and documentation proving the source.
            Proof of , homeowners Insurance: To ensure the property will be insured, identification: Government-issued ID (driver's license or passport) for identity verification,
            Rental History: Rental payment history and landlord contact information, if applicable. Explanation Letters: For any anomalies in credit history, employment gaps, or income variances),
            Special Situations: (Self-Employment Documentation,
            Divorce Decrees: If applicable, to verify alimony or child support obligations or income.
            Bankruptcy or Foreclosure Documentation)
            {self.__tip_section()}

            Borrower documents provided: {borrower_profile}
            Loan Secured Date (determine lock number of days): {date_range}
            Borrower information: {background}
          """),
            expected_output="A detailed report on the borrower with financial situation and goals outlined.",
            agent=agent)

    def gather_ratesheet_0(self, agent, borrower_profile, background, date_range, ratesheets):
        return Task(description=dedent(f"""
            Gather information from the ratesheet {ratesheets[0]} to determine the rate the borrower would get.
            Gather information about loan product that fits the borrower, the base rate, any adjustments, and any terms and conditions.
            
            The final answer include a summary of the loan product that is relevant for this borrower.
            {self.__tip_section()}

            Borrower documents provided: {borrower_profile}
            Loan Secured Date (determine lock number of days): {date_range}
            Borrower information: {background}
          """),
            expected_output="A brief summary of the ratesheet and relevant information to the borrower.",
            agent=agent)
    def gather_ratesheet_1(self, agent, borrower_profile, background, date_range, ratesheets):
        return Task(description=dedent(f"""
            Gather information from the ratesheet {ratesheets[1]} to determine the rate the borrower would get.
            Gather information about loan product that fits the borrower, the base rate, any adjustments, and any terms and conditions.
            
            The final answer include a summary of the loan product that is relevant for this borrower.
            {self.__tip_section()}

            Borrower documents provided: {borrower_profile}
            Loan Secured Date (determine lock number of days): {date_range}
            Borrower information: {background}
          """),
            expected_output="A brief summary of the ratesheet and relevant information to the borrower.",
            agent=agent)
    def gather_ratesheet_2(self, agent, borrower_profile, background, date_range, ratesheets):
        return Task(description=dedent(f"""
            Gather information from the ratesheet {ratesheets[2]} to determine the rate the borrower would get.
            Gather information about loan product that fits the borrower, the base rate, any adjustments, and any terms and conditions.
            
            The final answer include a summary of the loan product that is relevant for this borrower.
            {self.__tip_section()}

            Borrower documents provided: {borrower_profile}
            Loan Secured Date (determine lock number of days): {date_range}
            Borrower information: {background}
          """),
            expected_output="A brief summary of the ratesheet and relevant information to the borrower.",
            agent=agent)
    def gather_ratesheet_3(self, agent, borrower_profile, background, date_range, ratesheets):
        return Task(description=dedent(f"""
            Gather information from the ratesheet {ratesheets[3]} to determine the rate the borrower would get.
            Gather information about loan product that fits the borrower, the base rate, any adjustments, and any terms and conditions.
            
            The final answer include a summary of the loan product that is relevant for this borrower.
            {self.__tip_section()}

            Borrower documents provided: {borrower_profile}
            Loan Secured Date (determine lock number of days): {date_range}
            Borrower information: {background}
          """),
            expected_output="A brief summary of the ratesheet and relevant information to the borrower.",
            agent=agent)
    def gather_ratesheet_4(self, agent, borrower_profile, background, date_range, ratesheets):
        return Task(description=dedent(f"""
            Gather information from the ratesheet {ratesheets[4]} to determine the rate the borrower would get.
            Gather information about loan product that fits the borrower, the base rate, any adjustments, and any terms and conditions.
            
            The final answer include a summary of the loan product that is relevant for this borrower.
            {self.__tip_section()}

            Borrower documents provided: {borrower_profile}
            Loan Secured Date (determine lock number of days): {date_range}
            Borrower information: {background}
          """),
            expected_output="A brief summary of the ratesheet and relevant information to the borrower.",
            agent=agent)
    def gather_ratesheet_5(self, agent, borrower_profile, background, date_range, ratesheets):
        return Task(description=dedent(f"""
            Gather information from the ratesheet {ratesheets[5]} to determine the rate the borrower would get.
            Gather information about loan product that fits the borrower, the base rate, any adjustments, and any terms and conditions.
            
            The final answer include a summary of the loan product that is relevant for this borrower.
            {self.__tip_section()}

            Borrower documents provided: {borrower_profile}
            Loan Secured Date (determine lock number of days): {date_range}
            Borrower information: {background}
          """),
            expected_output="A brief summary of the ratesheet and relevant information to the borrower.",
            agent=agent)
    def gather_ratesheet_6(self, agent, borrower_profile, background, date_range, ratesheets):
        return Task(description=dedent(f"""
            Gather information from the ratesheet {ratesheets[6]} to determine the rate the borrower would get.
            Gather information about loan product that fits the borrower, the base rate, any adjustments, and any terms and conditions.
            
            The final answer include a summary of the loan product that is relevant for this borrower.
            {self.__tip_section()}

            Borrower documents provided: {borrower_profile}
            Loan Secured Date (determine lock number of days): {date_range}
            Borrower information: {background}
          """),
            expected_output="A brief summary of the ratesheet and relevant information to the borrower.",
            agent=agent)

    def plan_task(self, agent, borrower_profile, background, date_range, ratesheets):
        return Task(description=dedent(f"""
            Provide a plan of the loan a borrower should apply for and detail any
            things they must look out for. 

            You MUST suggest actual rates that exist in the ratesheets.

            This loan advice should cover all aspects of the loan,
            including lender, base rate, any adjustments to the rate, points, lock days and price.

            Your final answer MUST be a complete mortgage loan recommendation,
            formatted as markdown, encompassing a rate quote,
            anticipated adjustments, lender summary, and any unclear terms and conditions include on the rate sheet, ensuring THE BEST
            LOAN EVER THAT WILL LIKELY GET APPROVED, Be specific and give it a reason why you picked
            each loan option, what makes them special and unique to the borrower! 
            {self.__tip_section()}

            Borrower documents provided: {borrower_profile}
            Loan Secured Date (determine lock number of days): {date_range}
            Borrower information: {background}
            Ratesheets: {ratesheets}
          """),
            expected_output="A complete mortgage plan, similar to what a loan advisor would provide including likelihood of loan getting approved and how borrower might improve their chances.",
            agent=agent)
    
    def __tip_section(self):
       pass