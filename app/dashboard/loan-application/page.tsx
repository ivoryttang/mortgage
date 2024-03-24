"use client"
import ProgressBar from '@/app/ui/dashboard/progress-bar';
import '../page.css';


export default async function Page() {
    return <div><ProgressBar />
    <input id="test" placeholder=""/>
    <iframe 
                    id="loan-app"
                    title="PDF Viewer"
                    src="https://www.pdffiller.com/jsfiller-desk10/?flat_pdf_quality=low&mode=force_choice&requestHash=c013a9df6495635d0674c4e022e02b57dc4834749021fb7c46b647d53ad8bf7a&lang=en&projectId=1479598876&loader=tips&PAGE_REARRANGE_V2_MVP=true&richTextFormatting=true&isPageRearrangeV2MVP=true&jsf-page-rearrange-v2=true&LATEST_PDFJS=true&jsf-document-scroll-zoom=true&jsf-redesign-full=true&act-notary-pro-integration=false&jsf-pdfjs-fourth=false&routeId=3acfe11e0a862b46a4f25b43cd6ffa76#db7eba37aa224825b88b96cb6e3e19b1"
                    width="100%"
                    height="5000px"
                ></iframe>
    </div>
  }