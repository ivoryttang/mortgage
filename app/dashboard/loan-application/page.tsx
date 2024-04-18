"use client"
import ProgressBar from '@/app/ui/dashboard/progress-bar';
import '../page.css';
import {useState} from "react";

export default async function Page() {
    // const [formValues, setFormValues] = useState({"textarea#fillable-field--1-3":"Ivory Tang"})
    function fillForm(){
        var requestOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        };
        fetch(`http://app.domusnow.com/fill_form`, requestOptions)
        .then(response => response.text())
        .catch(error => {
            console.log("get document error: ", error);
        });
    }
    return <div><ProgressBar />
    {/* <input id="test" placeholder=""/> */}
    
    <iframe 
        id="loan-app"
        title="PDF Viewer"
        src="https://www.pdffiller.com/jsfiller-desk18/?flat_pdf_quality=low&mode=ref&lang=en&ref=https%3A%2F%2Fwww.pdffiller.com%2Fen%2Fforms%2Fdashboard&projectId=1494429530&PAGE_REARRANGE_V2_MVP=true&richTextFormatting=true&isPageRearrangeV2MVP=true&jsf-page-rearrange-v2=true&LATEST_PDFJS=true&jsf-document-scroll-zoom=true&jsf-redesign-full=true&act-notary-pro-integration=false&jsf-pdfjs-fourth=false&routeId=ea572c182ffec7daca4884bcf10bec1b#04de79fcc6be491c81ca6491ffa37349"
        width="100%"
        height="5000px"
        onLoad={() => {
            fillForm()
        }}
    ></iframe>
    </div>
  }