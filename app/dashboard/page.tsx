import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import ProgressBar from '@/app/ui/dashboard/progress-bar';
import CompleteConsultationButton from '@/app/ui/dashboard/onboard';
import { lusitana } from '@/app/ui/fonts';
import {
  // fetchRevenue,
  // fetchUrl,
  fetchLatestRatesheets,
  fetchCardData,
} from '@/app/lib/data';
import './page.css';

export default async function Page() {
  // const revenue = await fetchRevenue();
  // const url = await fetchUrl();
  const latestRatesheets = await fetchLatestRatesheets();
  const {
    numberOfDocuments,
    numberOfRatesheets
  } = await fetchCardData();

  
  return (
    <main>
      <ProgressBar />
      <div className="flex"><CompleteConsultationButton />
      {<i className="ml-10 w-[1100px]">The recommendations here are placeholders for now. Please complete your consultation and upload requested <a className="text-blue" href="https://www.domusnow.com/dashboard/documents"><u>documents</u></a> for your full borrower profile and tailored loan options to show up. In the meantime, feel free to browse the lenders and loan products <a className="text-blue" href="https://www.domusnow.com/dashboard/loans"><u>here</u></a></i>}
      </div>
      <div className="grid mt-10 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Annual Income" value="$120,300" type="collected" />
        <Card title="Credit Score" value={680} type="pending" />
        <a href="https://www.domusnow.com/dashboard/documents">
        <Card title="Loan-To-Value" value='50%' type="invoices" />
      </a>
      <Card title="Debt-to-Income" value="30%" type="customers" />
      </div>
      <div className="mt-6 flex">
        {/* <RevenueChart revenue={revenue} /> */}
        
        <div className="mr-10 mnd-rates-widget" style={{ width: '500px', height: '340px' }}>
          <h1 className={`${lusitana.className} text-sm font-medium md:text-base mb-10`} style={{fontSize: '26px'}}>Market Rates</h1>
          <div className="w-header" style={{ textAlign: 'center', padding: '4px 0', backgroundColor: '#31997d', color: '#FFFFFF' }}>
            <a href="https://www.mortgagenewsdaily.com/mortgage-rates/" target="_blank" style={{ color: '#FFFFFF', textDecoration: 'none' }}>Current Mortgage Rates</a>
          </div>
          <iframe src="//widgets.mortgagenewsdaily.com/widget/f/rates?t=large&sn=true&c=31997d&u=&cbu=&w=498&h=290" width="500" height="290" frameBorder="0" scrolling="no" style={{ border: 'solid 1px #31997d', borderWidth: '0 1px', boxSizing: 'border-box', width: '500px', height: '290px', display: 'block' }}></iframe>
          <div className="w-footer" style={{ textAlign: 'center', padding: '4px 0', backgroundColor: '#31997d', color: '#FFFFFF' }}>
            View More <a href="https://www.mortgagenewsdaily.com/mortgage-rates" target="_blank" style={{ color: '#FFFFFF', textDecoration: 'none' }}>Interest Rates</a>
          </div>
        </div>
        <LatestInvoices latestRatesheets={latestRatesheets} />


      </div>
    </main>
  );
}