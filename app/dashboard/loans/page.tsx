import LoanOptions from '@/app/ui/loans/loan-options';
import {
  fetchLatestInvoices
} from '@/app/lib/data';

export default async function Page() {
    const latestInvoices = await fetchLatestInvoices();
    return (
    
      <LoanOptions latestInvoices={latestInvoices} />
    )
  }