//ts-nocheck
"use client"
import React from 'react';
import Link from 'next/link';
import Logo from '../acme-logo';
import { UserIcon, ChevronDownIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import Vapi from '@vapi-ai/web';

declare global {
    interface Window {
        vapiSDK: any;
    }
}
const Header = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const toggleDropdown = () => setShowDropdown(!showDropdown);

    useEffect(() => {
        const apiKey = "f8f37a2e-4c9f-4b25-a1a5-f61575406a40";
        var vapiInstance = null
        const assistant = "4fdb2c9a-57a6-469c-ac31-e71c0f147182";
        const buttonConfig = {};

        

        var script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js";
        script.defer = true;
        script.async = true;

        script.onload = function () {
            
            vapiInstance = window.vapiSDK.run({
                apiKey: apiKey, // mandatory
                assistant: assistant, // mandatory
                config: buttonConfig, // optional
              });
            vapiInstance.on('speech-start', () => {
                console.log('Speech has started');
            });
            
            vapiInstance.on('speech-end', () => {
                console.log('Speech has ended');
            });
            
            vapiInstance.on('call-start', () => {
                console.log('Call has started');
            });
            
            vapiInstance.on('call-end', () => {
                console.log('Call has stopped');
            });
            
            vapiInstance.on('volume-level', (volume: number) => {
                console.log(`Assistant volume level: ${volume}`);
            });
            
            // Function calls and transcripts will be sent via messages
            vapiInstance.on('message', (message: string) => {
                console.log(message);
            });
            
            vapiInstance.on('error', (e: Error) => {
                console.error(e)
            });
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);
    

    // function startCall() {
    //     const options = {
    //         method: 'POST',
    //         headers: {Authorization: 'Bearer f8f37a2e-4c9f-4b25-a1a5-f61575406a40', 'Content-Type': 'application/json'},
    //         body: '{"assistantId":"4fdb2c9a-57a6-469c-ac31-e71c0f147182"}'
    //     };
          
    //     fetch('https://api.vapi.ai/call/web', options)
    //         .then(response => response.json())
    //         .then(response => console.log(response))
    //         .catch(err => console.error(err));
        
    // }
    const buttonConfig = {
        position: "top-right", // "bottom" | "top" | "left" | "right" | "top-right" | "top-left" | "bottom-left" | "bottom-right"
        offset: "40px", // decide how far the button should be from the edge
        width: "200px", // min-width of the button
        height: "35px", // height of the button
        idle: { // button state when the call is not active.
          color: `rgb(93, 254, 202)`, 
          type: "pill", // or "round"
          title: "Talk to Loan Expert", // only required in case of Pill
          icon: `https://unpkg.com/lucide-static@0.321.0/icons/phone.svg`,
        },
        loading: { // button state when the call is connecting
          color: `rgb(93, 124, 202)`,
          type: "pill", // or "round"
          title: "Connecting...", // only required in case of Pill
          subtitle: "Please wait", // only required in case of pill
          icon: `https://unpkg.com/lucide-static@0.321.0/icons/loader-2.svg`,
        },
        active: { // button state when the call is in progress or active.
          color: `rgb(255, 0, 0)`,
          type: "pill", // or "round"
          title: "Call is in progress...", // only required in case of Pill
          subtitle: "End the call.", // only required in case of pill
          icon: `https://unpkg.com/lucide-static@0.321.0/icons/phone-off.svg`,
        },
      };
    
    return (
        <header style={{ borderBottom: '1px solid gray', backgroundColor: 'white', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1000, width: '100%', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link
                className="flex items-end justify-start rounded-md "
                href="/"
            >
                <Logo />
            </Link>
            <div className="dropdown">
                
                <div className='flex'>
                
                    {/* <button onClick={() => {startCall(); setIsCalling(!isCalling)}} className="border bg-black/20 rounded-lg px-2 py-1 flex"><PhoneIcon className="mr-2 mt-1" style={{width: '20px',height:'20px'}}/>{isCalling ? <div>Call in Progress</div> : <div>Talk to Loan Expert</div>}</button> */}
                    <UserIcon className="ml-10 mr-1 mt-2 " style={{width: '20px',height:'20px'}}/><div className="mt-1">Guest</div>
                    <button onClick={toggleDropdown} className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <ChevronDownIcon className="ml-3" style={{width: '20px',height:'20px'}}/>
                    </button>
                </div>
            </div>
            
        </header>
        
    );
}

export default Header;