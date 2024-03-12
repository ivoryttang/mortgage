//@ts-nocheck
"use client"
import Navbar from "../ui/Navbar"
import { useState, useEffect } from "react"
export default function Page() {
    const [purchasePrice, setPurchasePrice] = useState(500000)
    const [downPayment, setDownPayment] = useState(200000)
    const [term, setTerm] = useState(30)
    return <div className="p-20"><nav style={{ marginBottom: '100px' }}><Navbar /></nav>
    <div className="text-center" >
    <h2>Mortgage Calculator</h2>
    </div>
    <h5>Input Your Values</h5>
    Purchase Price: <input className="mr-5" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} placeholder="" />

    Down Payment: <input className="mr-5" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} placeholder="" />
    Term / Amortization: <input className="mr-5" onChange={(e) => setTerm(e.target.value)} value={term} placeholder=""/>
    Mortgage Payments: <b>${(purchasePrice * ((term === 30 ? 0.0715 : 0.0665) * (1 + (term === 30 ? 0.0715 : 0.0665)) ** term) / (((1 + (term === 30 ? 0.0715 : 0.0665)) ** term) - 1)).toFixed(2)}</b>
     <br></br>
    <br></br>
    <h5 className="mt-5">Formula for calculating monthly mortgage payments</h5>
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
