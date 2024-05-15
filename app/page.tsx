"use client"
import Navbar from "./ui/Navbar"
import Link from 'next/link';

export default function Page() {
  return (
    <div>
    {/* <iframe src="/landing_page.html" width="100%" style={{height: "100vh"}} /> */}
    <nav style={{ marginBottom: '50px' }}><Navbar /></nav>
    <br></br>
    <br></br>
    {/* Front page */}
    <div style={{ display: 'flex' }} >
      <div style={{ flex: 2}} className="text-center mt-20 p-20 ml-20">
        <h1 className="text-center pb-sm-2 pb-md-3">AI-powered Loan Assistant to Supercharge Your Lending Practice</h1>
        <p className="fs-lg text-center pb-xl-2 mx-auto mx-lg-0 mb-5">Make lending effortlessly <i>personalized</i> and <i>transparent</i>, with 50% less manual work</p>
          <Link target="_blank" className={`link btn btn-primary btn-sm fs-sm order-lg-3 d-none d-sm-inline-flex`} href="https://calendly.com/ivoryttang/30min">
            Book a Demo
          </Link>
      </div>
      <div style={{ flex: 3 }} className="w-[30%] mt-20 p-20 mr-20">
        <video controls>
          <source src="/assets/img/demo.mp4" type="video/mp4" />
        </video>
      </div>
      {/* <div style={{ flex: 1 }} className="p-20 mr-20">
            <div className="parallax me-lg-n4 me-xl-n5">
                <div className="parallax-layer" data-depth="-0.2"><img src="assets/img/landing/business-consulting/hero/family.png" alt="Layer" /></div>
                <div className="parallax-layer" data-depth="0.1"><img src="assets/img/landing/business-consulting/hero/02.png" alt="Layer" /></div>
                <div className="parallax-layer" data-depth="0.25"><img src="assets/img/landing/business-consulting/hero/saved.png" alt="Layer" /></div>
              </div>
      </div> */}
    </div>
    {/* AI loan officer */}
    
    <div className="text-center mt-20">
      <h1 className="display-5">AI-enabled Loan Officer</h1>
    </div>
    <div className="px-20">
        <div className="p-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          {/* <a href="#">
              <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
          </a> */}
          <div className="p-5">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
    <div className="text-center">
        <img className="h-auto w-full rounded-lg" src="/assets/img/educate.png" alt="" />
        <h2 className="mt-3">Educate</h2>
        <p>Veteran AI loan advisor at your service offering borrowers 24/7 support</p>
    </div>
    <div className="text-center">
        <img className="h-auto w-full rounded-lg" src="/assets/img/leadgen.png" alt="" />
        <h2 className="mt-3">Convert</h2>
        <p>Personalized lead gen and follow-up on autopilot</p>
    </div>
    <div className="text-center">
        <img className="h-auto w-full rounded-lg" src="/assets/img/underwrite.png" alt="" />
        <h2 className="mt-3">Assess</h2>
        <p>Fully assess each borrower and how they fit with your portfolio goals</p>
    </div>
    </div>
              
          </div>
      </div>

    </div>
    
    {/* AI loan origination */}
    
    <div className="text-center mt-20">
      <h1 className="display-5">Workflow Automation</h1>
    </div>
    <div className="px-20">
    <div className="flex p-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
  <div className="w-[60%] p-10">
    <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]">
      <div className="rounded-lg overflow-hidden h-[156px] md:h-[278px] bg-white dark:bg-gray-800">
        <img src="/assets/img/los.png" className="hidden dark:block h-[156px] md:h-[278px] w-full rounded-lg" alt="" />
      </div>
    </div>

    <div className="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl rounded-t-sm h-[17px] max-w-[351px] md:h-[21px] md:max-w-[597px]">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[96px] md:h-[8px] bg-gray-800"></div>
    </div>
  </div>

  <div className="ml-4 p-10 text-xl">
    <ul>
    <br></br>
      <li>Automate workflows involving asking and requesting info from borrowers, making checklists, chasing down third-parties, and organizing and ingesting that data into the appropriate systems.</li>
      <br></br>
      <li>Advanced document processing and issue triaging to close every loan faster and with higher accuracy.</li>
      <br></br>
      <li>Compliance and security built into best-in-class cloud infrastructure on AWS, Azure, and Google Cloud.</li>
    </ul>
  </div>
</div>

       
<br></br>
<br></br>
    </div>
  </div>
   
  );
}
