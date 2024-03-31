import LoanOptions from '@/app/ui/loans/loan-options';
import {
  fetchLatestRatesheets
} from '@/app/lib/data';
import clsx from 'clsx';
import { lusitana } from '@/app/ui/fonts';

export default async function Page() {
    const latestRatesheets = await fetchLatestRatesheets();
    return (
      <LoanOptions latestRatesheets={latestRatesheets} />
      
    )
  }