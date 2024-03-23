"use client"
import Search from '@/app/ui/search';
import { useState, ChangeEvent } from 'react';
import {
  DocumentsTableType,
  FormattedDocumentsTable,
} from '@/app/lib/definitions';
import {TrashIcon} from '@heroicons/react/24/outline';


export default function DocumentsTable({
  documents,
}: {
  documents: FormattedDocumentsTable[];
}) {
  const [selectedPdfType, setSelectedPdfType] = useState("Paystub")
  const [uploadedFile, setUploadedFile] = useState<undefined | File>(undefined)
  
  const [currDocuments, setCurrDocuments] = useState<FormattedDocumentsTable[]>(documents);

  // Function to fetch and update documents
  const refreshDocuments = async () => {
    const apiUrl = "/api/get_documents"; 
      try {
          const response = await fetch(apiUrl, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: '',
          });

          if (response.ok) {
              const responseData = await response.json();
              console.log(responseData)
              console.log("HERE",responseData.documents.rows)
              if (responseData) {
                const formattedDocuments: FormattedDocumentsTable[] = responseData.documents.rows.map((doc: any) => ({
                    id: doc.id,
                    name: doc.name,
                    upload_date: new Date(doc.upload_date).toISOString().split('T')[0],
                    description: doc.description,
                    due_date: new Date(doc.due_date).toISOString().split('T')[0],
                    status: doc.status
                }));
                setCurrDocuments(formattedDocuments);
            } else {
                console.error('Error: responseData.rows is undefined');
            }
             
          } else {
              console.error('Error:', response.statusText);
          }
      } catch (error) {
          console.error('Error:', error);
      }
      
  };

  function handleSetFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files ? event.target.files[0] : null;
    setUploadedFile(file ?? undefined)
  }

  async function handleUpload(){
    const pdfData = new FormData();
    if (uploadedFile) {
        pdfData.append('file_data', uploadedFile);
    }
    var requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: pdfData
    };
    fetch(`https://app.domusnow.com/upload_document?name=${selectedPdfType}`, requestOptions)
    .then(response => {response.text(); addDocument()})
    .catch(error => {
        console.log("upload azure error: ", error);
    });
    
  }

  async function addDocument(){
    const apiUrl = "/api/add_document"; // Endpoint for the server-side API
    const data = {
        name: selectedPdfType,
        description: selectedPdfType,
        uploadDate: new Date().toISOString(),
        dueDate: new Date().toISOString(),
        status: 'completed'
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log(responseData); // Handle the response data as needed
        } else {
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }

    await refreshDocuments()
  }

  async function deleteDocument(name: string) {
    const apiUrl = "/api/delete_document"; 

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: name}),
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log(responseData); // Handle the response data as needed
        } else {
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
    await refreshDocuments()
  }
  
  
  function handlePdfTypeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedPdfType(event.target.value)
  }
  const [showPopup, setShowPopup] = useState(false);

  const handleOpen = (document:string) => {
    var requestOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    };
    fetch(`http://app.domusnow.com/get_document?name=${selectedPdfType}`, requestOptions)
    .then(response => response.text())
    .catch(error => {
        console.log("get document error: ", error);
    });
    setShowPopup(true);
    setSelectedPdfType(document)
  };
  return (
    <div className="w-full mt-5">
      
      {showPopup && (
                <div className="popup">
                  <button className="close-btn rounded border px-2 " onClick={() => setShowPopup(false)}>X</button>
                  <h2>{selectedPdfType}</h2>
                  {/* <p>{uploadedFile?.name}</p> */}
                  <iframe
                    title="PDF Viewer"
                    src={`../temp_show_file.pdf`}
                    width="100%"
                    height="600px"
                ></iframe>
                  {/* {selectedPdfType == "Paystubs" ? 
                  <div className="flex">
                    <img src="/assets/img/paystub.jpg"/>
                    <div>
                      <h2><b>Explanation</b></h2>
                      <br></br>
                      <ul>
                      <li>+ Mortgage lenders use paystubs to verify employment and income stability. This stub shows regular pay, suggesting a steady job</li>
                      <li>- Your income is on the lower end of the spectrum of what we usually see for the loan type you're seeking. A higher net income leads to a more favorable DTI. The net pay listed would be used to calculate DTI, a key metric lenders use to assess eligibility for a loan.</li>
                      <li>- Lenders consider current income to determine the loan amount one can afford. The gross income indicated on the paystub would be a determinant of the maximum loan amount. You may need to consider alternative financing for part of your down payment.</li>
                     <li></li>
                      </ul>
                      <br></br>
                      <h2><b>Warnings</b></h2>
                      <br></br>
                      <ul>
                        <li>- Continuity of income shown by the 'Year-to-Date' (YTD) figures would be important in the loan approval process</li>
                      </ul>
                    </div>
                  </div>
                  :
                  selectedPdfType == "Debt" ? <>
                  <div className="flex">
                    <img src="/assets/img/debt.jpg"/>
                    <div>
                      <h2><b>Explanation</b></h2>
                      <br></br>
                      <ul>
                      <li>- There is still quite a lot of student debt to be paid off. Will this be paid by your income alone or are there other sources of money to help pay off the loan?</li>
                      </ul>
                      <br></br>
                      <h2><b>Warnings</b></h2>
                      <br></br>
                      <ul>
                        <li>- Because you were late in disclosing the student debt portion of your loan application, this will delay your closing date by a week or more.</li>
                      </ul>
                    </div>
                  </div>
                  </> :
                  <>
                  <div className="flex">
                    <img src="/assets/img/creditscore.jpg"/>
                    <div>
                      <h2><b>Explanation</b></h2>
                      <br></br>
                      <ul>
                      <li>+ You have a significant length of credit history with which lenders can assess your creditworthiness</li>
                      <li>- 11 30 day delinquencies and 1 60 day delinquincy is quite a lot and will require you to take on a higher interest rate.</li>
                      </ul>
                      <br></br>
                      <h2><b>Warnings</b></h2>
                      <br></br>
                      <ul>
                        <li>- Make sure to not incur any more 30 day delinquencies between now and when the loan is officially closed</li>
                      </ul>
                    </div>
                  </div></>} */}
                </div>
              )}
      <Search placeholder="Search documents..." />
      <br></br>
      <div className='flex'><select className="rounded" value={selectedPdfType} onChange={handlePdfTypeChange}>
      <option value="paystub">Paystub</option>
    <option value="bank">Bank Statement</option>
    <option value="w2">W-2</option>
    <option value="credit">Credit Report</option>
        </select> 
        <div className='flex'>
        <input className="ml-4 w-[250px] mt-1" type="file" id="pdfUpload" accept=".pdf" onChange={handleSetFile}/>
        </div>
        <button type="button" className='rounded bg-gray-400 text-white p-2' onClick={handleUpload}>Upload </button>
        {/* <button type="button" className='rounded bg-gray-400 text-white p-2 ml-4' >Connect Account </button> */}
        </div>
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Document Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                    Description
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                    Date Uploaded
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Due Date
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      Status
                    </th>
                    <th></th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {currDocuments.map((document) => (
                    <tr key={document.id} onClick={() => handleOpen(document.name)}>
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                          {document.name}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {document.description}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {document.upload_date}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {document.due_date}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                        {document.status}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5">
                        <button onClick={(e) => {e.stopPropagation(); deleteDocument(document.name)}}><TrashIcon className="w-[15px] " /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
