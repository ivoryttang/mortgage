//@ts-nocheck
"use client"
import Navbar from "../ui/Navbar"
import { useState,  useEffect } from "react"
export default function Page() {
    const [downPayment, setDownPayment] = useState(40000)
    const [purchasePrice, setPurchasePrice] = useState(500000)
    const [income, setIncome] = useState(100000)
    const [debt, setDebt] = useState(320)

    return <div className="p-20"><nav style={{ marginBottom: '100px' }}><Navbar /></nav>
    <div className="text-center" >
    <h2>Calculate your GDS and TDS</h2>
    Find out what your gross debt and total debt service ratios are.
    </div>
    TDS: <b>{((debt + 396+100 + (purchasePrice * (0.0715) * (1 + 0.0715) ** 30) / (((1 + 0.0715) ** 30) - 1)) / (income / 12)).toFixed(2)}%</b>
<br></br>
GDS: <b>{((( (396+100)*12 + purchasePrice * ((0.0715) * (1 + (0.0715)) ** 0.0715) / (((1 + (0.0715)) ** 30) - 1)))*12/income).toFixed(2)}%</b>
<br></br>



<br></br>
<h5>Calculate your GDS and TDS</h5>
<br></br>
<br></br>
Down Payment: $<input className="mr-5 mb-10" onChange={(e) => setDownPayment(e.target.value)} value={downPayment} />

Purchase Price: $<input className="mr-5" onChange={(e) => setPurchasePrice(e.target.value)} value={purchasePrice} />

Monthly Debt: $<input className="mr-5" onChange={(e) => setDebt(e.target.value)} value={debt} /> per month
<br></br>
Annual Income: $<input onChange={(e) => setIncome(e.target.value)} value={income} /> per year
<br></br>
<br></br>
Note: This is an approximate calculation that assumes the defaults below:
<br></br>
7.15% qualifying rate
<br></br>
30 year amortization
<br></br>
$396.00 monthly condo fees
<br></br>
$100.00 monthly heating
<br></br>
<br></br>
<h5>What's GDS and TDS?</h5>
<br></br>
GDS and TDS stand for gross debt and total debt service ratios. They are percentages of income that cover your:
<br></br>
<br></br>
GDS: Housing costs
<br></br>
<br></br>
TDS: Housing costs and any other debts
<br></br>
<br></br>
<h5>Formulas for GDS/TDS</h5>
<br></br>
Gross debt service ratio is calculated by the sum of your housing costs, mortgage payments, property taxes, heating and condo fees divided by your annual income.
<br></br>
<br></br>
Total debt service ratio is calculated by the the gross debt above (housing, mortgage, property, etc.) + debt and loan payments divided by annual income.
<br></br>
<br></br>
<h5>Why are they important?</h5>
<br></br>
It let's you and lenders know how much you're able to borrow to purchase a home. Generally speaking, if you go over the limits below (39% and 44%) you should either save for a larger down payment, or pay off more of your outstanding debts. Your GDS and TDS are also used when granting a mortgage pre-approval.
<br></br>
<br></br>
<h5>What's a good GDS and TDS ratio?</h5>
<br></br>
Ideally your GDS and TDS should be below 35% and 42% respectively.
<br></br>
<br></br>
Given that Domus works with 30+ lender partners, we're able to support up to 45% and 47% for GDS and TDS ratios, and up to 50% for both under certain conditions e.g. a downpayment of 35%.
<br></br>

    </div>
  }