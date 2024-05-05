"use client"
import { useState, ChangeEvent } from 'react';
export default function AutomationFile() {
    const [uploadedFile, setUploadedFile] = useState<undefined | File>(undefined)
    const [data, setData] = useState<{ key: string, value: string, score: number }[]>([]);
    const [current, setCurrent] = useState("")

    var url = ""

    function generateRandomString(length: number) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    const handleOpen = (document_uploaded:string) => {
        var requestOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        };
        var requestOptions = {
              method: 'GET',
              headers: {
                  'Accept': 'application/json',
                  'Access-Control-Allow-Origin': '*',
              }
        };
        fetch(`https://app.domusnow.com/get_document?name=${document_uploaded}`, requestOptions)
        .then(response => response.blob())
            .then(blob => {
              // Create a URL for the blob
              url = URL.createObjectURL(blob);
              
              // Display the PDF in an iframe or embed element
                const pdfViewer = document.querySelector('#pdfViewer');
              if (pdfViewer instanceof HTMLIFrameElement) {
                  pdfViewer.src = url;
              }
          })
          .catch(error => {
              console.log("get document error: ", error);
          });
      };
    function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files ? event.target.files[0] : null;
        console.log("uploaded file", file)
        const pdfData = new FormData();
        if (file) {
            pdfData.append('file_data', file);
        }
        var requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: pdfData
        };
        const name = generateRandomString(5)
        fetch(`https://app.domusnow.com/upload_document?name=${name}`, requestOptions)
        .then(response => {response.text(); console.log("HERE",response.text())})
        .then(data => alert("Successfully Uploaded Document"))
        .catch(error => {
            alert('Upload failed. Please try again.');
            console.log("upload azure error: ", error);
        });
        // getProcessed(name)
        // handleOpen(name)
      }
    
      async function getProcessed(name: string){
        
        var requestOptions = {
              method: 'GET',
              headers: {
                  'Access-Control-Allow-Origin': '*',
              }
          };
          fetch(`https://app.domusnow.com/get_processed_document?doc_id=${name}`, requestOptions)
          .then(response => response.json())
          .then(data => {setData(data);console.log(data)})
          .catch(error => {
              alert('Get processed document failed. Please try again.');
          });
      }

    return <div className="flex mt-5">
    
        <div className="w-1/2 mr-5 ">
            <div className="flex justify-center items-center w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                <label htmlFor="pdfUpload" className="cursor-pointer">
                    Upload Document
                </label>
            <input type="file" id="pdfUpload" accept=".pdf" className="hidden" onChange={handleUpload}/>
            </div>
            <iframe
                id="pdfViewer"
                title="PDF Viewer"
                src={url}
                className="mt-5"
                width="100%"
                height="600px"
            ></iframe>
        </div>
        <div className="w-1/2 border">
        
        </div>
    </div>
}