// @ts-nocheck
import SideNav from '@/app/ui/dashboard/sidenav';
import Header from '../ui/dashboard/header';

 
export default function Layout({ children }: { children: React.ReactNode }) {
  
    return (
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        
        <Header />
        <div className="mt-4 w-full flex-none md:w-64">
            <SideNav />
        </div>
        <div className="mt-4 flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        
      </div>
    );
  }