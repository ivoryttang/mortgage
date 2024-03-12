import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { LatestInvoice } from '@/app/lib/definitions';
export default async function LoanOptions({
  latestInvoices,
}: {
  latestInvoices: LatestInvoice[];
}) {
  return (
    
    <div className="flex w-full flex-col md:col-span-4">
        
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
                  {invoice.amount}
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
