"use client"
import Link from 'next/link';
import {useStepConversationStore} from "../../lib/storage"
import {LockClosedIcon} from '@heroicons/react/24/outline';
export default function ProgressBar(){
    const {step, setStep}= useStepConversationStore() as {step: number, setStep: (step: number) => void};
    const steps = [
        { name: 'Pre-Qualification', href: '/dashboard' },
        {
          name: 'Loan Application ',
          href: '/dashboard/loan-application'
        },
        { name: 'Loan Processing', href: '/dashboard'},
        { name: 'Underwriting', href: '/dashboard'},
        { name: 'Credit Decision', href: '/dashboard'},
        { name: 'Quality Check', href: '/dashboard'},
        { name: 'Loan Funding', href: '/dashboard'},
      
      ];

    const handleItemClick = (item:number) => {
        setStep(item);
    };
    return (
        <div>
<ol className="mt-5 mb-5 flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
    {steps.map((currStep,idx) => {
        return ( <>
        <Link
            key={`${currStep.name}-${idx}`}
            href={currStep.href}>
          
    <li onClick={() => handleItemClick(idx+1)}  key={idx} className={`flex md:w-full items-center ${step === idx+1 ? 'text-green-500' : ''}`}>
             <span className={`ml-4 flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500`}>
    {idx == 0 || idx == 1 ? <svg className="w-[3.5px] h-[3.5px] sm:w-[22px] sm:h-[22px] me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
            </svg> : <LockClosedIcon className="w-[20px] h-[20px]" />}
        {currStep.name}
        </span>
    </li>
    </Link>
    </>);
    })
    }
    
</ol></div>
    )
}

