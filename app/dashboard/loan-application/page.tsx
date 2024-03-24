"use client"
import ProgressBar from '@/app/ui/dashboard/progress-bar';
import '../page.css';


export default async function Page() {
    return <div><ProgressBar />
    
    <iframe 
                    title="PDF Viewer"
                    src="https://www.bvnb.com/wp-content/uploads/2016/03/URLA-1003-Fillable.pdf"
                    width="100%"
                    height="5000px"
                ></iframe>
    </div>
  }