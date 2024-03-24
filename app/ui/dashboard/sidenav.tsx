//@ts-nocheck
import NavLinks from '@/app/ui/dashboard/nav-links';
import { PowerIcon, Cog8ToothIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import Link from 'next/link';

export default async function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      
      <div className="mt-10 flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form action={async () => {
            'use server';
            await signOut();
          }}
          >
          <Link href="/dashboard/settings" className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-green-100 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <Cog8ToothIcon className="w-6" />
            <div className="hidden md:block">Settings</div>
          </Link>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-green-100 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
