import Navbar from "../ui/Navbar"
export default function Page() {
  
  const faqData = [
    { id: 1, question: 'Can I get a residential mortgage with Domus?', answer: 'Yes, at Domus, we specialize in getting you the best residential mortgage rates and help you along the way.' },
    { id: 2, question: 'Can I remortgage and borrow more?', answer: 'Yes! You will be able to borrow more than your current balance, subject to meeting our eligibility criteria. Please be aware that in this case, we will only be able to lend up to 75% of the property value.' },
    {id:3, question: 'What is the maximum term I can borrow?', answer: 'The minimum term you can borrow with us is 5 years. \n The maximum term you can borrow with us is over 35 years.'},
    {id: 4, question: 'What are the current rates on Domus?',answer: 'Please refer to the mortgages page for our latest products and rates. \n Why not see how much you are likely to be able to borrow and at what rate with our mortgage calculator?'}
  ];
  return (
    <div>
      <nav style={{ marginBottom: '100px' }}><Navbar /></nav>
    
      <div className="text-center" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqData.map((faq) => (
            <div key={faq.id} className="faq-item bg-gray items-center" style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginLeft:'100px',marginBottom: '10px' ,width:'90%'}}>
              <h5 className="faq-question">{faq.question}</h5>
              <p className="faq-answer">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
