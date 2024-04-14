import React from "react";
import "./navbar.css";
import Link from 'next/link';
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const pathname = usePathname()
    return (
        <header className="navbar navbar-expand-lg fixed-top z-20 bg-white">
        <div className="container">
          <a className="flex navbar-brand pe-sm-3" href="landing_page.html">
            <span className="text-primary flex-shrink-0">
              <img src="assets/img/logo.png" alt="Logo" style={{ height: '30px', width: 'auto' }} />
            </span>
            omus
          </a>
          
<Link target="_blank" className={`link btn btn-primary btn-sm fs-sm order-lg-3 d-none d-sm-inline-flex ${pathname === '/dashboard' ? 'active' : ''}`} href="/dashboard">
            Get Started
          </Link>
          <ul className="text-black navbar-nav navbar-nav-scroll me-auto" >
            
            <li className="nav-item dropdown"><a className="nav-link active" href="#" data-bs-toggle="dropdown" aria-expanded="false">Mortgage <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-2 w-5 h-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
</svg>
</a>
                <div className="dropdown-menu overflow-hidden p-0">
                  <div className="d-lg-flex">
                  <div className="mega-dropdown-column pt-1 pt-lg-2 pb-lg-4">
                      <ul className="list-unstyled mb-0">
                        <li className="p-3">Resources</li>
                        <li><a className="dropdown-item" href="/preapproval">Pre-approval</a></li>
                        <li><a className="dropdown-item" href="/refinance">Refinance</a></li>
                        <li><a className="dropdown-item" href="/renewal">Renewal</a></li>
                        <li><a className="dropdown-item" href="/rent-to-own">Rent to Own</a></li>
                        <li><a className="dropdown-item" href="/heloc">Home Equity Line of Credit</a></li>
                        <li><a className="dropdown-item" href="/second-mortgage">Second Mortgage</a></li>
                        <li><a className="dropdown-item" href="/private-mortgage">Private Mortgage</a></li>
                        <li><a className="dropdown-item" href="/closing-costs">Closing Costs</a></li>
                      </ul>
                    </div>
                    <div className="mega-dropdown-column pb-2 pt-lg-2 pb-lg-4">
                      <ul className="list-unstyled mb-0">
                        <li className="p-3">Calculators</li>
                        <li><a className="dropdown-item" href="/gds-tds">GDS and TDS</a></li>
                        <li><a className="dropdown-item" href="/mortgage-calc">Mortgage</a></li>
                        <li><a className="dropdown-item" href="/mortgage-affordability">Mortgage Affordability</a></li>
                        <li><a className="dropdown-item" href="/taxes">Land Transfer Taxes</a></li>
                      </ul>
                    </div>
                   
                  </div>
                </div>
            </li>
            <li className="nav-item dropdown"><a className="nav-link" href="#" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">Why Domus? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-2 w-5 h-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
</svg></a>
                <ul className="dropdown-menu">
                  <li className="dropdown"><a className="dropdown-item" href="/why-domus">How Domus Works <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4"  style={{ display: 'inline-block' }}>
  <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
</svg>
</a>
                    {/* <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="">Application Process</a></li>
                      <li><a className="dropdown-item" href="">Underwriting</a></li>
                      <li><a className="dropdown-item" href="">Mortgage Education</a></li>
                      <li><a className="dropdown-item" href="">Rate Locking</a></li>
                    </ul> */}
                  </li>
                  <li className="dropdown"><a className="dropdown-item" href="#" data-bs-toggle="dropdown" aria-expanded="false">Products <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4"  style={{ display: 'inline-block' }}>
  <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
</svg></a>
                    <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="/ai-agent">24/7 AI Loan Agent</a></li>
                      <li><a className="dropdown-item" href="/document-processing">Intelliget Document Processing</a></li>
                      <li><a className="dropdown-item" href="/mortgage-pricing">Advanced Mortgage Pricing</a></li>
                    </ul>
                  </li>
                  
                </ul>
            </li>
            <li className="nav-item dropdown"><a className="nav-link" href="#" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">Agents <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-2 w-5 h-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
</svg></a>
                <ul className="dropdown-menu">
                  <li className="dropdown"><a className="dropdown-item" href="#">Join as an agent</a>
                  </li>
                  <li><a className="dropdown-item" href="/sign-in">Login as an agent</a></li>
                </ul>
              </li>
            <li className="nav-item "><a className="nav-link" href="/blog">Blog</a></li>
            <li className="nav-item"><a className="nav-link" href="/faqs">FAQs</a></li>
            
            <div className="d-sm-none p-3 mt-n3">
                <a className="btn btn-primary w-100 mb-1" href="/dashboard" target="_blank" rel="noopener">
                    <i className="ai-cart fs-xl me-2 ms-n1"></i>Start Applying
                </a>
            </div>
            </ul>
        </div>
      </header>
    );
};

export default Navbar;