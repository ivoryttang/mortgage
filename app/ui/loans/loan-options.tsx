"use client"
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { LatestInvoice } from '@/app/lib/definitions';
import {useState} from 'react';


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
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">

        <div className="bg-white px-6">
        <div
                className={clsx(
                  'flex flex-row items-center justify-between py-4'
                )}
              >
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >Lender</p>
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >Term</p>
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >Rate</p>
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >Amount</p>
                </div>
            
          {latestRatesheets.map((ratesheet, i) => {
            return (
              <div
                key={ratesheet.id}
                onClick={() => handleOpen(ratesheet.lender)}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  
                <div className="flex w-[150px]">
                  <p className={`${lusitana.className} truncate text-sm font-medium md:text-base`}>
                    <b>{ratesheet.lender}</b>
                  </p>
                </div>
                </div>
                <div className="flex w-[110px]">
                  <p className={`${lusitana.className} truncate text-sm font-medium md:text-base`}>
                    {ratesheet.term}
                  </p>
                </div>
                <div className="flex w-[100px]">
                  <p className={`${lusitana.className} truncate text-sm font-medium md:text-base`}>
                    {ratesheet.rate}%
                  </p>
                </div>
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >
                  ${ratesheet.amount}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
