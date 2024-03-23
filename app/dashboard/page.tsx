import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import {
  fetchRevenue,
  fetchLatestInvoices,
  fetchCardData,
} from '@/app/lib/data';
import './page.css';
 
export default async function Page() {
  
  const revenue = await fetchRevenue();
  const latestInvoices = await fetchLatestInvoices();
  const {
    numberOfInvoices,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();
 
  return (
    <main>
      

<ol className="mt-5 flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
    <li className="flex md:w-full items-center text-blue-600 dark:text-green-700 sm:after:content-[''] ">
        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
            </svg>
            Pre-qualification 
        </span>
    </li>
    <li className="ml-4 flex md:w-full items-center after:content-[''] ">
      <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">   
            <span className="me-2">2</span>
            Loan Application 
        </span>
    </li>
    <li className="ml-4 flex md:w-full items-center after:content-[''] ">
      <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
        <span className="me-2">3</span>
        Loan Processing
        </span>
    </li>
    <li className="ml-4 flex md:w-full items-center after:content-[''] ">
    <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
        <span className="me-2">4</span>
        Underwriting
        </span>
    </li>
    <li className="flex md:w-full items-center after:content-[''] ">
    <span className="ml-4 flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
        <span className="me-2">5</span>
        Credit Decision
        </span>
    </li>
    <li className="flex md:w-full items-center after:content-[''] ">
    <span className="ml-4 flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
        <span className="me-2">6</span>
        Quality Check
        </span>
    </li>
    <li className="ml-4 flex md:w-full items-center">
    <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
        <span className="me-2">7</span>
        Loan Funding
        </span>
    </li>
</ol>

      <div className="grid mt-10 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card title="Income" value="$120,300" type="collected" />
        <Card title="Credit" value={680} type="pending" />
        <Card title="Documents" value={numberOfInvoices} type="invoices" />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue} />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}