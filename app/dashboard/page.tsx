import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import ProgressBar from '@/app/ui/dashboard/progress-bar';
import CompleteConsultationButton from '@/app/ui/dashboard/onboard';
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
    numberOfInvoices
  } = await fetchCardData();
  
  
  return (
    <main>
      

      <ProgressBar />
      <CompleteConsultationButton />
      <div className="grid mt-10 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card title="Income" value="$120,300" type="collected" />
        <Card title="Credit" value={680} type="pending" />
        <a href="https://www.domusnow.com/dashboard/documents">
        <Card title="Documents" value={numberOfInvoices} type="invoices" />
      </a>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue} />
        
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}