"use client"
import ProgressBar from '@/app/ui/dashboard/progress-bar';
import '../page.css';
import {useState} from "react";

export default async function Page() {
    return <div><ProgressBar />
    <button
//   onClick={() => startCall()}
    style={{ transition: 'all 0.3s', boxShadow: '0 0 10px rgba(0,0,0,0.2)' }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    className="border py-3 px-4 flex bg-green-800 text-white rounded-lg px-2 py-1 flex"
  >Generate Personalized Loan</button>
  {/* show agent working */}
  {/* 1. Show transcript of call being processed */}
  {/* 2. Show documents being processed */}
  {/* 3. Narrow down lenders that fall within requirements - show lender comparisons */}
  {/* 4. Find loan option that borrower is looking for */}
  {/* 5. Perform any adjustments based on borrower situation */}
  {/* 6. Generate explanation with corresponding explanations */}
  {/* 7. Show proprietary algorithm determining likelihood borrower is to get this loan */}
    </div>
  }