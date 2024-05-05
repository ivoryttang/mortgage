"use client"
import {useState} from "react";
import {CheckIcon, XMarkIcon, ShieldExclamationIcon} from '@heroicons/react/24/outline';
import "../global.css"
import './reports.css';
export default function Reports(){

   
return (
    <div>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" id="google-font" />
        <link rel="stylesheet" media="screen" href="assets/vendor/simplebar/dist/simplebar.min.css" />
        <link rel="stylesheet" media="screen" href="assets/css/theme.min.css" />
        
        <div className="flex justify-between items-center">
            <h1 className="bold mt-5 mb-10 text-xl">Compliance Check Summary</h1>
            <button className="mt-5 mb-10 bg-gray-100 p-2 border rounded">Generate New Report</button>
        </div>
    <div className="flex ">
        
        <div className="mr-10 text-lg w-[150px]">
        <div className="flex text-red-500"><XMarkIcon className="w-[20px]" /> 5 FAIL</div>
        <div className="flex text-green-500"><CheckIcon className="w-[20px]"/> 5 PASS</div>
        <div className="flex text-yellow-500"><ShieldExclamationIcon className="w-[20px]"/>2 WARNING</div>
        <div className="flex text-gray-500">0 N/A</div>
        </div>
        <div className="flex-vertical w-full mr-10 space-y-4">
        <table className="ml-10">
            <tr>
                <th className="bg-green-300">HOEPA</th>
                <th  className="bg-green-300">Federal HPML</th>
                <th className="bg-red-300">Qualified Mortgage</th>
            </tr>
            <tr>
                <td className="bg-green-300">Points & Fees Check </td>
                <td className="bg-green-300">Rate Check </td>
                <td className="bg-red-300">Prepayment Penalty </td>
            </tr>
            <tr>
                <td className="bg-green-300">Rate Check</td>
                <td className="bg-gray-300">Appraisal Req.</td>
                <td className="bg-green-300">Rate Check</td>
            </tr>
            <tr>
                <td className="bg-green-300">Prepayment Penalty</td>
                <td className="bg-gray-300">Escrow Req.</td>
                <td className="bg-gray-300">Safe Harbor Check</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
            <td className="bg-red-300">Features Check</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td className="bg-green-300">Prepayment Penalty</td>
            </tr>
        </table>
        <table className="ml-10">
            <tr>
                <th className="bg-green-300">TILA</th>
                <th  className="bg-red-300">TRID</th>
                <th className="bg-green-300">RESPA</th>
            </tr>
            <tr>
                <td className="bg-green-300">Rate Check</td>
                <td className="bg-red-300">0% Tolerance </td>
                <td className="bg-red-300">Prepayment Penalty </td>
            </tr>
            <tr>
                <td className="bg-gray-300">Timing Check</td>
                <td className="bg-green-300">10% Tolerance</td>
                <td className="bg-green-300">RESPA Disclosure</td>
                
            </tr>
            <tr>
                
                <td className="bg-green-300">Finance Charge Check</td>
                <td className="bg-green-300">Timing Check</td>
                <td></td>
            </tr>
            <tr>
                <td className="bg-green-300">Total of Payments Check</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td className="bg-green-300">LO Compensation Check</td>
                <td></td>
                <td></td>
            </tr>
        </table>
        <table className="ml-10">
            <tr>
                <th className="bg-red-300">Freddie Mac</th>
                <th  className="bg-red-300">Fannie Mae</th>
                <th className="bg-green-300">Flood Insurance</th>
            </tr>
            <tr>
                <td className="bg-red-300">HOEPA Apr</td>
                <td className="bg-red-300">Points and Fees Check </td>
                <td className="bg-green-300">Flood Insurance</td>
            </tr>
            <tr>
                <td className="bg-green-300">HOEPA Points and Fees</td>
                <td className="bg-red-300">Features Check</td>
                <td></td>
                
            </tr>
            <tr>
                
                <td className="bg-green-300">Credit Insurance</td>
                <td className="bg-green-300">HOEPA</td>
                <td></td>
            </tr>
            <tr>
                <td className="bg-green-300">Confirming Loan Limit</td>
                <td className="bg-green-300">Interested Party Contributions</td>
                <td></td>
            </tr>
            <tr>
                <td className="bg-green-300">LO Compensation Check</td>
                <td className="bg-green-300">Prepayment Penalty</td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td className="bg-green-300">Credit Insurance</td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td className="bg-green-300">Confirming Loan Limit</td>
                <td></td>
            </tr>
        </table>
        </div>
        </div>
    </div>
    );
 }