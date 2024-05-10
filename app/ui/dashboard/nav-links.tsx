'use client';

import {
  CurrencyDollarIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  FlagIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog8ToothIcon,
  AcademicCapIcon,
  LinkIcon,
  CursorArrowRaysIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  // {
  //   name: 'Lender Comparison',
  //   href: '/dashboard/loans',
  //   icon: CurrencyDollarIcon,
  // },
  { name: 'LoanGPT', href: '/dashboard/learn', icon: AcademicCapIcon },
  { name: 'Automations', href: '/dashboard/automations', icon: CursorArrowRaysIcon },
  { name: 'Reviewed Documents', href: '/dashboard/documents', icon: DocumentDuplicateIcon },
  // { name: 'Integrations', href: '/dashboard/integrations', icon: LinkIcon },
  { name: 'Compliance', href: '/dashboard/reports', icon: FlagIcon },
  { name: 'Communications', href: '/dashboard/communications', icon: ChatBubbleLeftEllipsisIcon },
  // { name: 'Settings', href: '/dashboard/settings', icon: Cog8ToothIcon },
];

export default async function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-green-100 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-green-100 text-green-600': pathname === link.href,
              },
            )}>
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
