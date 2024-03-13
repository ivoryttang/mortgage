"use client"
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { LatestInvoice } from '@/app/lib/definitions';
import {useState} from 'react';


export default function LoanOptions({
  latestInvoices,
}: {
  latestInvoices: LatestInvoice[];
}) {
  const [showPopup, setShowPopup] = useState(false);

  const handleOpen = (loan:string) => {
    setShowPopup(true);
  };
  return (
    
    <div className="flex w-full flex-col md:col-span-4">
        {showPopup && (
                <div className="popup">
                  <button className="close-btn rounded border px-2 " onClick={() => setShowPopup(false)}>X</button>
                  <h2>Lender: Guaranteed Rate</h2>
                  <h3>Interest Rate: 8.3% </h3>
                  <br></br>
                  Recommendation Summary: 
                  <br></br> 
                  <br></br>
                  Based on the rate sheet provided by the lender, they offer a variety of conventional fixed conforming loans with different rates based on credit scores. Here's an analysis of why this lender might be a good option for you:
                  <br></br> 
                  <br></br>
1. **Loan Options**: The lender offers conventional fixed conforming loans with varying rates for different terms. Based on your credit score of 700, you fall into the category where you could potentially benefit from the rates offered.
<br></br> 
                  <br></br>
2. **Credit Score Impact**: A credit score of 700 is decent but falls a bit short of the top tier rates. However, the lender provides discounts based on credit score tiers, and your credit score should qualify you for a competitive rate.
<br></br> 
                  <br></br>
3. **Income Qualification**: With an annual income of $100,000 and looking for a $200,000 loan, you seem financially stable, which could make you an attractive borrower to the lender. This could potentially help in securing a loan at a favorable rate.
<br></br> 
                  <br></br>
4. **Loan Amount**: A loan amount of $200,000 falls within the conventional loan limits, making you eligible for these types of loans from this lender.
<br></br> 
                  <br></br>
5. **Available Terms**: The lender provides various loan term options, such as 30-year, 20-year, 15-year, and even 10-year fixed conforming loans, giving you flexibility to choose a term that suits your financial goals.
<br></br> 
                  <br></br>
6. **Rate Adjustments**: The lender offers rate adjustments based on credit score tiers. Although specific rate details for your credit score are not provided in the snippet, the structure suggests that your credit score category may offer competitive rates.
<br></br> 
                  <br></br>
Considering the lender's flexibility in terms, options for rate discounts based on credit scores, and your financial profile, this lender can be a good option for your mortgage needs. When comparing loan options, pay attention to the interest rates offered for your credit score tier and choose the loan term that aligns with your financial plan.

If you have any more specific rate details or further questions about the loan products, you may consider reaching out to the lender directly or your broker for more personalized information.
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
            
          {latestInvoices.map((invoice, i) => {
            return (
              <div
                key={invoice.id}
                onClick={() => handleOpen("")}
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
                    <b>{invoice.lender}</b>
                  </p>
                </div>
                </div>
                <div className="flex w-[110px]">
                  <p className={`${lusitana.className} truncate text-sm font-medium md:text-base`}>
                    {invoice.term}
                  </p>
                </div>
                <div className="flex w-[100px]">
                  <p className={`${lusitana.className} truncate text-sm font-medium md:text-base`}>
                    {invoice.rate}%
                  </p>
                </div>
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >
                  ${invoice.amount}
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
