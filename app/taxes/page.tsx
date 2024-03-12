//@ts-nocheck
"use client"
import Navbar from "../ui/Navbar"
import { useState, useEffect } from "react"
export default function Page() {
    const [purchasePrice, setPurchasePrice] = useState(500000)
    return <div className="p-20"><nav style={{ marginBottom: '100px' }}><Navbar /></nav>
    <div className="text-center" >
    <h2>Land Transfer Taxes Calculator</h2>
    <br></br>
    <br></br>
    </div>
Land transfer taxes (LTT) are fees paid to the provincial or municipal governments (or both) on closing when property is acquired.
<br></br>
<br></br>
Land Transfer Tax: ${purchasePrice*0.005}
<br></br>
<br></br>
Enter purchase price:
$<input className="mr-5" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} />

First time home buyer: <select>
  <option value="true">yes</option>
  <option value="false">no</option>
</select>
<br></br>
<br></br>
How to avoid land transfer taxes?
<br></br>
<br></br>
If you're a first-time-homebuyer you may be eligible for a rebate.
<br></br>
<br></br>
<h5>Land Transfer Taxes vs. Title transfer fees</h5>
<br></br>
Some provinces and territories don't have LTT but have title transfer fees and/or mortgage registration fees.
<br></br>
<br></br>
Most provinces handle LTT on a provincial level while Quebec and Nova Scotia have municipal based LTT.
    </div>
  }
