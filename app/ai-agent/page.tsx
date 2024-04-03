//@ts-nocheck
"use client"
import Navbar from "../ui/Navbar"
import { useEffect } from "react"
export default function Page() {

    return <div className="p-20 w-[1200px] "><nav style={{ marginBottom: '100px' }}><Navbar /></nav>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div className="text-center mr-10 w-[800px]" ><h2>Meet Homie</h2>
    Mortgages may be complex, but we have got you covered.</div>
    <div >
    
    A human loan advisor may only have so much time for you and only be available during work hours which is not when you have a question you need answered.
    Furthermore, loan advisors do not have access to the same expanse of knowledge that our AI loan chatbot, Homie AI, does. Here is what AI is helping us do behind the scenes.
    <br></br>
    <br></br>
    <b>Data Analysis</b>: AI excels at processing vast amounts of data quickly. By analyzing borrower data such as credit history, income, and financial behavior, AI can provide more accurate risk assessments and streamline the underwriting process.
    <br></br>
    <br></br>
<b>Personalized Recommendations</b>: AI algorithms can analyze a borrower's financial profile and preferences to offer personalized mortgage options. This tailored approach enhances customer satisfaction and increases the likelihood of securing suitable loans.
<br></br>
    <br></br>
<b>Predictive Analytics</b>: By leveraging historical data and market trends, AI can forecast changes in interest rates and housing markets. Loan advisors equipped with AI tools can better guide clients on optimal timing for refinancing or purchasing a property.
<br></br>
    <br></br>
<b>24/7 Availability</b>: AI-powered chatbots and virtual assistants provide round-the-clock support to borrowers, answering inquiries and guiding them through the mortgage process. This accessibility enhances customer experience and expedites loan approvals.
<br></br>
    <br></br>
<b>Fraud Detection</b>: AI algorithms can detect fraudulent activities by analyzing patterns in loan applications and identifying inconsistencies. This capability reduces the risk for lenders and enhances the overall integrity of the mortgage system.
    </div>
    </div>
    </div>
  }