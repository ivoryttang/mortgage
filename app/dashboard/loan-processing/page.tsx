'use client'
import ProgressBar from '@/app/ui/dashboard/progress-bar';
import '../page.css';
import Recommendation from '@/app/ui/dashboard/recommendation';

export default async function Page() {
    
    var result = ""
    function get_analysis() {
        var requestOptions = {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Access-Control-Allow-Origin': '*',
              }
        };
        fetch(`https://app.domusnow.com/agent_rate_analysis`, requestOptions)
        .then(response => response.text())
        .then(text => {
            result = text
          })
          .catch(error => {
              console.log("get text error: ", error);
          });
    }
    return <div><ProgressBar />
    <button
   onClick={() => get_analysis()}
    style={{ transition: 'all 0.3s', boxShadow: '0 0 10px rgba(0,0,0,0.2)' }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    className="border py-3 px-4 flex bg-green-800 text-white rounded-lg px-2 py-1 flex"
  >Generate Personalized Loan</button>
  <Recommendation result={result}/>
    </div>
  }