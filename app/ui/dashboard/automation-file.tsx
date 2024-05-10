"use client"
import { useState, ChangeEvent } from 'react';
export default function AutomationFile() {
    const [data, setData] = useState<{ key: string, value: string, score: number }[]>([]);
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState("")

    function generateRandomString(length: number) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    function handleValueChange(event: React.ChangeEvent<HTMLInputElement>, index: number) {
        const newData = [...data]; // Create a copy of the data array
        newData[index] = { ...newData[index], value: event.target.value }; // Update the value for the specific index
        setData(newData); // Set the new data array to state
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
              setUrl(URL.createObjectURL(blob));
              
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
        console.log("arrived")
        setLoading(true);

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
        .then(response => {response.text();})
        .then(data => console.log("Successfully Uploaded Document"))
        .then(data => {
        getProcessed(name);
        handleOpen(name);
    })
        .catch(error => {
            console.log("upload azure error: ", error);
        })
        .finally(() => {
            setLoading(false); // Set loading to false when upload completes
        });;
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
              console.log('Get processed document failed. Please try again.');
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
            {loading && <>

<div className="flex items-center justify-center w-full h-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
    <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">loading...</div>
</div>
</>}
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
        <table>
        <tbody>
        {data.map((item, index) => (
                <tr key={index}>
                    <td className='border-none'>{item.key}</td>
                    <input
        type="text"
        value={item.value}
        onChange={(e) => handleValueChange(e, index)}
        className="border-2 border-gray-300 p-1 w-full"
    />
                </tr>
            )
        )}
        </tbody>
        </table>
        {data.length > 0 && <button className="bg-gray-100 p-2 rounded-lg">Export Result</button>}
        </div>
        
    </div>
}