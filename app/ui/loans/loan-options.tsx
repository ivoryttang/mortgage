"use client"
import { ArrowPathIcon, ArrowUpRightIcon } from '@heroicons/react/24/outline';
import { LatestInvoice } from '@/app/lib/definitions';
import {useState} from 'react';
import "./loans.css";
import Search from '@/app/ui/search';

export default function LoanOptions({
  latestRatesheets,
}: {
  latestRatesheets: LatestInvoice[];
}) {
  const [showPopup, setShowPopup] = useState(false);
  const [term, setTerm] = useState('')
  var url = ""

  const handleOpen = (loan:string) => {
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
      fetch(`https://app.domusnow.com/get_ratesheet?name=${loan}`, requestOptions)
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
    setShowPopup(true);
  };
  return (
    
    <div className="flex w-full flex-col md:col-span-4">
        {showPopup && (
                <div className="popup">
                  <button className="close-btn rounded border px-2 " onClick={() => setShowPopup(false)}>X</button>
                  <iframe
                    id="pdfViewer"
                    title="PDF Viewer"
                    src={url}
                    width="100%"
                    height="600px"
                ></iframe>
              </div>
        )}
        <div className="mt-6 mb-5">
        <Search  placeholder="Search loans..." />
        </div>
        <i>See how your rates compare to other lenders who serve the same pool of borrowers.</i>
        <div className="table-container">
          <table className="w-full mt-5 border-collapse" style={{ position: 'relative', overflowX: 'auto' }}>
              <thead>
                <tr className="bg-black-50">
                  <th className="w-[35px]"></th>
                  <th className="w-[200px]">Lender</th>
                  <th className="w-[100px]">Lender Type</th>
                  <th className="w-[250px]">Loan Product</th>
                  <th className="w-[150px]">Term</th>
                  <th className="w-[100px]">APR</th>
                  <th className="w-[150px]">Upfront Costs</th>
                  <th className="w-[150px]">Loan Amount</th>
                  <th className="w-[100px]">Rating</th>
                  <th className="w-[100px]">Avg. Time to Close</th>
                  <th className="w-[120px]">Lender Info </th>
                </tr>
              </thead>
              <tbody>
                {latestRatesheets.map((ratesheet) => (
                  <tr key={ratesheet.id} className="border-b border-gray-10">
                    <td className="w-[35px]"><input type="checkbox" id={`loan-${ratesheet.id}`} checked={ratesheet.status}/></td>
                    <td className="w-[200px]" style={{ position: 'relative' }}>
                      <div className="flex justify-between items-center">
                        <span>{ratesheet.lender}</span>
                        <a href={ratesheet.lender_info} target="_blank" rel="noopener noreferrer" 
                        style={{ position: 'absolute', top: 2, right: 2, backgroundColor: 'lightgray', padding: '5px', borderRadius: '10%' , transition: 'background-color 0.3s'}}
                        onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = 'gray'}
                        onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'lightgray'}
                        >
                            <ArrowUpRightIcon className="w-5 text-white" />
                        </a>
                    </div>  
                    </td>
                    <td className="w-[100px]">{ratesheet.lender_type}</td>
                    <td className="w-[250px]">
                    <div className="flex flex-wrap">
                        {ratesheet.loan_type.map((type, index) => (
                            <div key={index} className="px-2 rounded" style={{ backgroundColor: type === 'Conventional' ? 'pink' : type === "FHA" ? 'lightgreen' : type === "VA" ? 'lightblue' : 'lightyellow', margin: '2px' }}>{type}</div>
                        ))}
                    </div>
                      </td>
                    <td className="w-[150px]">
                    <select value={term} className="mr-2" onChange={(e) => setTerm(e.target.value)}>
                        {ratesheet.term.map((term) => (
                            <option key={term} value={term}>{term}</option>
                        ))}
                    </select>
                    years
                    </td>
                    <td className="w-[100px]">{ratesheet.rate}%</td>
                    <td className="w-[150px]">${ratesheet.upfront.slice(0,1)} - ${ratesheet.upfront.slice(1,2)}</td>
                    <td className="w-[150px]">${ratesheet.amount.slice(0,1).toLocaleString()} - ${ratesheet.amount.slice(1,2).toLocaleString()}</td>
                    <td className="w-[100px]">{ratesheet.rating}</td>
                    <td className="w-[100px]">{ratesheet.time_to_close} days</td>
                    <td className="w-[120px]" 
                    onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'blue'} // Change color to blue on hover
                    onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'black'} // Change color back to lightgray on mouse leave
                    onClick={() => handleOpen(ratesheet.lender)}><u>{ratesheet.date != null  ? <>View Details</>: <>Coming Soon</>}</u></td>
                  </tr>
                ))}
              </tbody>
        </table>
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-300" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
  );
}
