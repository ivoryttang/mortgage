//@ts-nocheck
"use client"
import Navbar from "../ui/Navbar"
import { useEffect } from "react"
export default function Page() {

    return <div className="p-20"><nav style={{ marginBottom: '100px' }}><Navbar /></nav>
    
    <h1 className="text-xl text-center">Statistical Methods and AI in Loan Origination</h1>
            <br></br>
            <h2 className="text-sm text-center">From generating better priced loans to faster loan closing</h2>
            <br></br>
            <h2 className="text-sm text-center">Mar. 11, 2024</h2>
            <br></br>
            <br></br>


<b>What’s the industry standard today?</b>
<br></br>
            <br></br>
Freddie Mac’s Loan Prospector and Fannie Mae’s Desktop Underwriter are two automated underwriting systems that have been in place since 1997. Both use preprogrammed information and complex, multivariate formulas to conduct a quantitative risk analysis based on credit reports and other lender-provided information.  AI and ML are now being used to enhance these models and identify then correct unjust or biased outcomes.
<br></br>
            <br></br>
<b>Generating better-priced mortgages with AI</b>
<br></br>
            <br></br>
Before we dive into the technicalities of how to better price mortgages, let’s consider why tactical pricing is so difficult. The challenge lies in managing the difference between the price investors will pay to buy a specific mortgage and what the borrower will commit to pay for that mortgage.  
<br></br>
            <br></br>
<i>The fundamental question to consider when utilizing AI is data. </i>
<br></br>
            <br></br>
Mortgage data (e.g., prepayment speeds and delinquency), regulatory announcements, U.S.	fiscal and monetary policy changes, domestic economic events,	particularly U.S.	housing	are the main factors to consider along with corporate performance, financial	industry	conditions, global economic events, various acts of war, natural	disasters, changes in related market prices, such as commodities, currencies, foreign equities, and agricultural products.	
<br></br>
            <br></br>
<i>Retrieval Augmented Generation (RAG) and Optical Character Recognition (OCR)</i>
<br></br>
            <br></br>
This data needs to be the most up-to-date, otherwise it’s useless. Some recent research in the retrieval space (beyond commercial frozen applications of RAG) include WebGPT (2021), the information retrieval model that receives the query and can output browser commands (i.e. clicks or scrolling) to extract relevant paragraphs from web pages it determines as informative. Toolformer (2021) allows LLMs to use external tools with an API. Gorilla (2023) expands upon Toolformer to be able to use a much larger set of tools. GRITLM (2024) allows processing of input text, creating embeddings, and generating output text by using 1. the query’s vector representations for retrieval and generation and 2. reusing the raw retrieved vector db data for generation. Effectively, it speeds up RAG by more than 60% for long documents, by no longer requiring separate retrieval and generation models.
<br></br>
            <br></br>
Additionally, to aggregate the data for RAG, we rely on OCR oftentimes to get text from documents. Traditional OCR can't parse the tabular structure of financial and legal data well, though, and even more sophisticated approaches fail when you introduce things like merged cells or nonstandard layouts. A vision based pipeline, such as that of Reducto AI, can infer the table structure, accurately extracts each cell, and then creates an HTML representation that you can directly plug in to LLMs. Other tools also exist, such as AWS textract, Azure OCR, Google Cloud Vision API, but they also struggle on the most complex documents and mistakes are costly.
<br></br>
            <br></br>
The general pipeline is as follows:
<br></br>
            <br></br>
Scrape for publicly available files. These are typically scanned PDF documents published online.
<br></br>
            <br></br>
A challenge here is frequent changes to websites which would affect the entire extraction process. To address, first separate each component of the pipeline to be able to run them in isolation, so now we can safely interrupt and restart any pipeline stage. Furthermore, content-addressable caching ensures we only recompute what’s absolutely necessary.
<br></br>
            <br></br>
Process these files using an OCR system, which outputs the document’s text and structure.
<br></br>
            <br></br>
Previously, OCR relied on binarization of the input image at an early stage, which can be brittle and discard important cues. Now, referring to Dropbox’s methods for its mobile scanner, we can break the process into 2 steps: 1) use computer vision to take an image of a document and segment it into lines and words and 2) take each word and feed it into a deep net to turn the word image into actual text
<br></br>
            <br></br>
Images of cropped words are fed into a CNN with several convolutional layers. The visual features that are outputted by the CNN are then fed as a sequence to a Bidirectional LSTM which make sense of our word “pieces,” and finally arrives at a text prediction using a Connectionist Temporal Classification (CTC) layer. Synthetic data can also be used here to great avail since the images are quite constrained.
<br></br>
            <br></br>
For the word detector, deep-net based approaches of the past relied on object detection systems, like RCNN, that try to detect the locations (bounding boxes) of objects and aren’t as scalable. Instead, use a classic computer vision approach like Maximally Stable Extremal Regions (MSERs) to detect image blobs then string these together into word and line detections. Fixed size word image inputs are the main challenge. Spatial pyramid pooling (SPP) layers help solve this because the special pooling layer transforms features of different sizes and feeds them to the fully connected layers to remove the fixed-size constraint of the network. There were also many papers to build faster and faster RCNNs (Fast R-CNN, Faster R-CNN, Cascade R-CNN). Methods include training multiple RoI samples from one image simultaneously as a mini-batch or using an RPN to train the bounding box proposal process.
<br></br>
            <br></br>
Post-process OCR output to correct common errors and generate normalized documents.
<br></br>
            <br></br>
The goal is to automatically find specific features. To limit errors, we can annotate a small set of cases (i.e. example rate sheets) to use as a reference/training dataset
<br></br>
            <br></br>
Extract important information (features) from the document text and structure, storing results in the database.
<br></br>
            <br></br>
<b>Generating Margin with AI</b>
<br></br>
            <br></br>
The way to generate margin through pricing strategy is by considering your competitive position relative peers based on product, market, and economic scenarios, enable point-of-sale pricing, anticipate borrower response to changes in	interest	rates, examine borrower elasticity. This way, from a lender perspective, you can generate the most revenue possible, without paying a single basis point more than is required to acquire additional market share. From a borrower perspective, you can provide the best loan options that suit the borrower’s financial situation.
<br></br>
            <br></br>
Mark-to-Market is the predominant method. Peg an instrument to pricing, when it’s moved a significant amount, re-price the loan by adding the spread to the new instrument price. Real Time is instantaneous pricing methodology based on the current position of the market. Multi-investor pricing optimizes for flexibility to sell certain loan-types to particular investors and select the best execution among investors. Finally, portfolio pricing models are determined by the required returns of the portfolio, and are based on the bank’s obligation to pay interest to deposit customers as	well	as support the bank’s profit model.
<br></br>
            <br></br>
Financial data such as credit score, bank statements, and public records are all used to assess an individual’s risk. On the flip side, rate sheets from different lenders, compliance, consumer protection laws, and market signals can all be used to match an individual with the best loan. This data can be utilized to help forecast loan defaults, set interest rates more precisely, and identify the most lucrative lending opportunities. Improving risk assessment models can potentially expand the market to previously underserved segments.
<br></br>
            <br></br>
Pricing strategy is two-fold usually:
<br></br>
            <br></br>
Cost of funds plus bank margin approach to set lender’s own mortgage rates
<br></br>
            <br></br>
Structure the margins to make sure the company complies with all regulatory guidance regarding pricing
<br></br>
            <br></br>
Based on analysis by AI algorithms on vast amounts of data, we can do things like use AI to predict that rates might go up in the next few months because of a change in government policies or economic factors. Then, using this insight, we could act sooner rather than later and lock in our mortgage rate now to secure a lower rate before it increases, saving you money in the long run.
<br></br>
            <br></br>
Some ML algorithms for forecasting include:
<br></br>
            <br></br>
- Regression Models: analyze historical mortgage rate data and other economic indicators to predict future rates. 
<br></br>
            <br></br>
- Time Series Analysis: examine patterns in time-based data (like past mortgage rates over months or years) to predict future trends. i.e. ARIMA (AutoRegressive Integrated Moving Average) 
<br></br>
            <br></br>
- Random Forest and Gradient Boosting: combine multiple algorithms to make more accurate predictions. Handles large datasets and captures complex relationships between different variables affecting mortgage rates.
<br></br>
            <br></br>
More <a href="https://www.linkedin.com/pulse/adapting-market-volatility-ais-role-predictive-analytics-krxkc/?trk=article-ssr-frontend-pulse_more-articles_related-content-card">here</a> 
<br></br>
            <br></br>
<b>A joint AI and RPA effort</b>
<br></br>
            <br></br>
First, what is RPA? Robotic process automation uses digital workers that can execute a business process at high speed and in high volumes based on a set of rules. Simple, repetitive processes where API integration is not feasible are great RPA targets. RPA can increase accuracy and efficiency of initial data collection, document verification and data entry processes for loan applications. AI brings in the decision-making and analytical capabilities — think adjusting algorithms, automated auditing, exception handling, enriching data collection and validation.
<br></br>
            <br></br>
Let’s look at a case where we are extracting data from rate sheets and synthesizing it for the borrower.
<br></br>
            <br></br>
Assisted RPA (without AI): 
<br></br>
            <br></br>
Most RPA systems today record your screen while you perform a task. Rate sheets are emailed everyday. RPA can open the email, either a pdf attachment or an external link, and input data from the rate sheet into an external database to standardize the format.
<br></br>
            <br></br>
Autonomous RPA (with AI): 
<br></br>
            <br></br>
The hardest part is knowing what data is useful to extract from the rate sheet and being able to query for it. AI can intelligently discern what information to extract and in what format to input it into the database, enhancing the strict rule-based RPA.  
<br></br>
            <br></br>
<b>Fintech and Blockchain</b>
<br></br>
            <br></br>
1. Storage and security. Safe storage of all relevant mortgage data, including borrower information, property details, and payment history can be stored on a tamper-resistant ledger. 
<br></br>
            <br></br>
2. Contracts. Smart contracts can be drafted on blockchain. Different steps of the mortgage process can be encoded into smart contracts and once the predefined conditions of the contract are met, it will automatically be executed. 
<br></br>
            <br></br>
3. Ownership. Property ownership records can be secured on blockchain. This may help reduce property title disputes and fraud. 
<br></br>
            <br></br>
4. Verifications. Blockchain can be used to authenticate documents related to mortgages, such as income statements, credit reports, and property titles. 
<br></br>
            <br></br>
5. Tokenization. Tokenization is a process where data is shrouded by other data for security reasons. For mortgages, this could be used for multiple-party investment in a property.
<br></br>
            <br></br>
6. Cost Reduction. It can eliminate the need for title companies, escrow services, and other intermediaries.
<br></br>
            <br></br>
Fintechs are also already allowing for digital asset verification which can process loans in as little as one day and directly connecting with bank accounts to ease the role of borrowers. Plaid's Identity Verification solution allows lenders to quickly and securely verify borrowers' identity in seconds using verified data sources, selfie verification, and bank statements to address KYC requirements.


</div>
  }