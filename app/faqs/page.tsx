//@ts-nocheck
"use client"
import {useState} from "react"
import Navbar from "../ui/Navbar"
export default function Page() {
  const [activeFaq, setActiveFaq] = useState(null);
  const handleFaqClick = (id) => {
    setActiveFaq(activeFaq === id ? null : id);
  };
  const faqData = [
    { id: 1, question: 'Can I get a residential mortgage with Domus?', answer: 'Yes, at Domus, we specialize in getting you the best residential mortgage rates and help you along the way.' },
    { id: 2, question: 'Can I remortgage and borrow more?', answer: 'Yes! You will be able to borrow more than your current balance, subject to meeting our eligibility criteria. Please be aware that in this case, we will only be able to lend up to 75% of the property value.' },
    {id:3, question: 'What is the maximum term I can borrow?', answer: 'The minimum term you can borrow with us is 5 years. \n The maximum term you can borrow with us is over 35 years.'},
    {id: 4, question: 'What are the current rates on Domus?',answer: 'Please refer to the mortgages page for our latest products and rates. \n Why not see how much you are likely to be able to borrow and at what rate with our mortgage calculator?'},
    {id: 5, question: 'How does Domus outperform a traditional brokerage service?',answer: 'By utilizing AI algorithms to match our large pool of lender rates to your unique financial scenario along with automating manual back-office processing, we can close your loan quicker and provide greater value than traditional loan companies.'}
  ];
  return (
    <div>
      <nav style={{ marginBottom: '100px' }}><Navbar /></nav>
      <div className="text-center justify-center item-center w-[1000px]" style={{ marginTop: '20px', margin: '0 auto', justifyContent: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h2>FAQs</h2>
        </div>
        {faqData.map((faq) => (
          <div key={faq.id} className="faq-item items-center" style={{ borderRadius: '5px', padding: '10px', margin: '10px', width: '90%', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', cursor: 'pointer' }}>
            <h5 className="faq-question" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {faq.question}
              <span onClick={() => handleFaqClick(faq.id)} style={{ color: 'black', cursor: 'pointer' }}>▼</span>
            
            </h5>
            <p className="faq-answer" style={{ display: faq.id === activeFaq ? 'block' : 'none' }}>{faq.answer}</p>
          

          
          </div>
        ))}
      
      </div>
    </div>
  );
};
