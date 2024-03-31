import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { LatestInvoice } from '@/app/lib/definitions';

export default async function LatestInvoices({
  latestRatesheets,
}: {
  latestRatesheets: LatestInvoice[];
}) {

  return (
    <div className="flex w-full flex-col md:col-span-4" >
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Loan Options For You
      </h2>
      <a href='https://www.domusnow.com/dashboard/loans' className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {/* NOTE: comment in this code when you get to this point in the course */}

        <div className="bg-white px-6">
          {latestRatesheets.map((ratesheet, i) => {
            return (
              <div
                key={ratesheet.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center justify-center">
                  
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {ratesheet.lender}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                <p
                  className={`${lusitana.className} max-w-[100px] truncate text-sm font-medium md:text-base`}
                >
                  {ratesheet.rate}%
                </p>
                </div>
                <div className="flex items-center justify-center">
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >
                  {ratesheet.term} year
                </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </a>
    </div>
  );
}
