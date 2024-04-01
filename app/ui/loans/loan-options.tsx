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
        <div className="mt-6">
        <Search  placeholder="Search loans..." />
        </div>
        <div className="table-container">
          <table className="w-full mt-5 border-collapse" style={{ position: 'relative', overflowX: 'auto' }}>
              <thead>
                <tr className="bg-black-50">
                  <th className="w-[35px]"></th>
                  <th className="w-[200px]">Lender</th>
                  <th className="w-[200px]">Lender Type</th>
                  <th className="w-[150px]">Loan Product</th>
                  <th className="w-[100px]">Term</th>
                  <th className="w-[100px]">APR</th>
                  <th className="w-[150px]">Upfront Costs</th>
                  <th className="w-[100px]">Loan Amount</th>
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
                        <a href={ratesheet.lender_info} target="_blank" rel="noopener noreferrer" style={{ position: 'absolute', top: 2, right: 2, backgroundColor: 'lightgray', padding: '5px', borderRadius: '10%' }}>
                            <ArrowUpRightIcon className="w-5 text-white" />
                        </a>
                    </div>  
                    </td>
                    <td className="w-[200px]">{ratesheet.lender_type}</td>
                    <td className="w-[150px]">{ratesheet.loan_type}</td>
                    <td className="w-[100px]">{ratesheet.term}</td>
                    <td className="w-[100px]">{ratesheet.rate}%</td>
                    <td className="w-[150px]">${ratesheet.upfront}</td>
                    <td className="w-[100px]">${ratesheet.amount}</td>
                    <td className="w-[100px]">{ratesheet.rating}</td>
                    <td className="w-[100px]">{ratesheet.time_to_close}</td>
                    <td className="w-[120px]" onClick={() => handleOpen(ratesheet.lender)}><u>View Details</u></td>
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
