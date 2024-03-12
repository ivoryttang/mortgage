//@ts-nocheck
"use client"
import Navbar from "../ui/Navbar"
import { useState, useEffect } from "react"
export default function Page() {
  const [purchasePrice, setPurchasePrice] = useState(500000)
  const [downPayment, setDownPayment] = useState(200000)
  const [income, setIncome] = useState(200000)
  const [debts, setDebts] = useState(320)
  const [creditScore, setCreditScore] = useState(700)
    const [propertyTaxes, setPropertyTaxes] = useState(10000)
    const [heat, setHeat] = useState(30000)
    const [condoFees, setCondoFees] = useState(10000)
    
    return <div className="p-20"><nav style={{ marginBottom: '100px' }}><Navbar /></nav>
    <div className="text-center" >
    <h2>Affordability Calculator</h2>
    <br></br>
    <br></br>
    </div>
    Our home affordability calculator estimates the maximum home you can afford – including taxes, PMI, and real-time mortgage rates – based on your income, assets, and monthly debts. Enter your info to find out how much you can afford!
    <br></br>
    <br></br>
    Calculate how much income you need to afford your home and the total amount you can borrow in a mortgage assuming a 25 year amortization mortgage.
    <br></br>
    <br></br>
Keep in mind that the actual amounts are dependent on your submitted documents and reported income.
<br></br>
    <br></br>
    
 {income > 150000  ? "✅" : "❌"} Income required: ${0.8*purchasePrice > 300000 ? 150000: 80000}
<br></br>
{downPayment < purchasePrice ? "✅" : "❌"} Down payment is less than purchase price
<br></br>
{downPayment > 0.2*purchasePrice ? "✅" : "❌"} Min. down payment: ${0.2*purchasePrice}
<br></br>
{downPayment > 0.2*purchasePrice ? "✅" : "❌"} Min. loan amount: ${0.8*purchasePrice}
<br></br>
{creditScore > 700 ? "✅" : "❌"} Min. credit score: {0.8*purchasePrice > 300000 ? 700 : 620}
    <br></br>
    <br></br>
Update the amounts below to see how much you can afford.
<br></br>
    <br></br>
Purchase Price: $<input className="mr-5" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} />
Down Payment: $<input className="mr-5" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} />
Credit Score: <input className="mr-5" value={creditScore} onChange={(e) => setCreditScore(e.target.value)} />
Property Taxes: $<input className="mb-5" value={propertyTaxes} onChange={(e) => setPropertyTaxes(e.target.value)} />/yr
Heat($1/sq. ft.): $<input className="mb-5" value={heat} onChange={(e) => setHeat(e.target.value)} />/yr
Condo Fees: $<input className="mb-5" value={condoFees} onChange={(e) => setCondoFees(e.target.value)} />/yr
Monthly Debts: $<input className="mb-5" value={debts} onChange={(e) => setDebts(e.target.value)} />/mo
Salary: $<input className="mr-5" value={income} onChange={(e) => setIncome(e.target.value)} />
    <br></br>
    <br></br>
Your mortgage affordability depends on your income, debts and credit score. Our calculator includes carrying costs such as heat, condo fees and property taxes to get an extensive view on how much you can afford.
<br></br>
    <br></br>
Lenders look at GDS and TDS to help determine how much mortgage you can borrow.
<br></br>
    <br></br>
How much down payment you have also helps determine maximum affordability. If it's under than 20% then mortgage insurance costs need to be considered.
<br></br>
    <br></br>
Closing costs aren't necessarily a big influence in affordability but it's good to keep that in mind for money you need to set aside, along with your down payment.
<br></br>
    <br></br>
To increase how much you can afford, it's best to:
<br></br>
    <br></br>
Improve your credit score to get a better rate<br></br>
Reduce your monthly payments towards your debts
    <br></br>
Save for a larger down payment (perhaps at least 20% to save on mortgage insurance fees)
    </div>
  }
