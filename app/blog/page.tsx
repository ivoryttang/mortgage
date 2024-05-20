//@ts-nocheck
"use client"
import Navbar from "../ui/Navbar"
import { useEffect } from "react"
import BlogCard from "../ui/components/blog-card"
// declare global {
//   interface Window {
//     SubstackFeedWidget: {
//       substackUrl: string;
//       posts: number;
//       colors: {
//         primary: string;
//         secondary: string;
//         background: string;
//       };
//       layout: string;
//     };
//   }
// }
export default function Page() {
  
  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.src = 'https://substackapi.com/embeds/feed.js';
  //   script.async = true;
  //   document.body.appendChild(script);

  //   window.SubstackFeedWidget = {
  //     substackUrl: 'domus.substack.com',
  //     posts: 12,
  //     colors: {
  //       primary: '#404040',
  //       secondary: '#00603B',
  //       background: '#FFFFFF',
  //     },
  //     layout:'left'
  //   };

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);
  
  
    return <div><nav style={{ marginBottom: '100px' }}><Navbar /></nav>
    <div className="text-center" >
    <h2>Blog</h2>
    <br></br>
    {/* <div id="substack-feed-embed"></div> */}
    <div className="flex justify-center item-center md:flex-row flex-col">
    <a href="/ai-origination"><BlogCard image="/assets/img/blog/ai-origination.png" title="Statistical Methods and AI in Loan Origination" caption="From generating better priced loans to faster loan closing"/></a>
    <a href="/housing-market"><BlogCard image="/assets/img/blog/housing-market.png" title="Where is the US Housing Market Headed?" caption="Impact from the 2008 Crisis, Covid-19, and a Rapidly Changing World"/></a>
    </div>
    </div>
    </div>
  }