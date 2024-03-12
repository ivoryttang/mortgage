//@ts-nocheck
"use client"
import Navbar from "../ui/Navbar"
import { useEffect } from "react"
export default function Page() {

    return <div className="p-20"><nav style={{ marginBottom: '100px' }}><Navbar /></nav>
    <div className="text-center" >
    <h2>Mortgage Calculator</h2>
    </div>
    Formula for calculating monthly mortgage payments
    <br></br>
The easiest way to calculate your mortgage payment is to use a calculator, but for the curious or mathematically inclined, here’s the formula for calculating principal and interest yourself:
<br></br>
    <br></br>

Mortgage calculator | Monthly mortgage payment formula <img src="/assets/monthly-payments.png" alt="monthly payments" style={{ height: '100px', width: 'auto' }} />
<br></br>
    <br></br>
Where:
<br></br>
    <br></br>
M is monthly mortgage payments
<br></br>
    <br></br>
P is the principal loan amount (the amount you borrow)
<br></br>
    <br></br>
r is the monthly interest rate
(annual interest rate divided by 12 and expressed as a decimal)
<br></br>
    <br></br>
For example:
<br></br>
    <br></br>
if the annual interest rate is 5%,
<br></br>
    <br></br>
the monthly rate would be 0.05/12 = .00417, or .417%
<br></br>
    <br></br>
n is the total number of payments in months
<br></br>
    <br></br>
For example:
<br></br>
    <br></br>
for a 30-year loan, n = 30×12 = 360 months
    </div>
  }
