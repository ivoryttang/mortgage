"use client"
import Navbar from "../ui/Navbar"
import { useEffect } from "react"
declare global {
  interface Window {
    SubstackFeedWidget: {
      substackUrl: string;
      posts: number;
      colors: {
        primary: string;
        secondary: string;
        background: string;
      };
      layout: string;
    };
  }
}
export default function Page() {
  
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://substackapi.com/embeds/feed.js';
    script.async = true;
    document.body.appendChild(script);

    window.SubstackFeedWidget = {
      substackUrl: 'domus.substack.com',
      posts: 12,
      colors: {
        primary: '#404040',
        secondary: '#00603B',
        background: '#FFFFFF',
      },
      layout:'left'
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  
    return <div><nav style={{ marginBottom: '100px' }}><Navbar /></nav>
    <div className="text-center" >
    <h2>Blog</h2>
    <div id="substack-feed-embed"></div>
    </div>
    </div>
  }