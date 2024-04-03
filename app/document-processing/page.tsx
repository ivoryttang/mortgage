//@ts-nocheck
"use client"
import Navbar from "../ui/Navbar"
import { useEffect } from "react"
export default function Page() {

    return <div className="p-20"><nav style={{ marginBottom: '100px' }}><Navbar /></nav>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div className="text-center mr-10 w-[800px]" ><h2>Intelligent Document Processing</h2>
    Streamlining the mortgage application process leads to greater efficiency.</div>
    <div>
    Here's some ways we utilize intelligent document processing:
    <br></br>
    <br></br>
    <b>Automated Data Extraction</b>: IDP technologies utilize Optical Character Recognition (OCR) and Machine Learning (ML) algorithms to extract relevant information from mortgage documents swiftly and accurately. This automated data extraction significantly reduces manual effort and ensures data accuracy, leading to faster processing times.
    <br></br>
    <br></br>
    <b>Enhanced Document Classification</b>: Mortgage documents come in various formats and types. IDP solutions employ advanced algorithms to classify and categorize documents, such as loan applications, financial statements, and property records. This categorization streamlines document management and facilitates seamless retrieval during the mortgage underwriting process.
<br></br>
    <br></br>
<b>Fraud Detection and Risk Assessment</b>: IDP systems can analyze documents to detect discrepancies and inconsistencies that may indicate fraudulent activities. By flagging suspicious documents early in the process, IDP helps mitigate risks for lenders and ensures the integrity of mortgage transactions.
<br></br>
    <br></br>
<b>Process Automation</b>: IDP streamlines repetitive tasks in the mortgage process, such as document review and verification. By automating these tasks, mortgage professionals can focus on higher-value activities, improving overall efficiency and customer experience.
<br></br>
    <br></br>
<b>Scalability and Compliance</b>: IDP solutions are scalable and adaptable to the evolving regulatory landscape in the mortgage industry. These systems ensure compliance with industry regulations and standards while handling large volumes of mortgage documents efficiently.
    </div>
    </div>
    </div>
  }