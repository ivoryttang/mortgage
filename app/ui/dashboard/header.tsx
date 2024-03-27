//ts-nocheck
"use client"
import React from 'react';
import Link from 'next/link';
import Logo from '../acme-logo';
import { UserIcon, ChevronDownIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { RetellWebClient } from "retell-client-js-sdk";

interface RegisterCallResponse {
    callId?: string;
    sampleRate: number;
  }
const agentId = "2860dbec1110ef89e4c2e4231424e75c"
const Header = () => {
    let currentCallId: string = '';
    const [showDropdown, setShowDropdown] = useState(false);
    const [isCalling, setIsCalling] = useState(false);
    const sdk = new RetellWebClient();
    const toggleDropdown = () => setShowDropdown(!showDropdown);

    async function registerCall(agentId: string): Promise<RegisterCallResponse> {
        try {
            const response = await fetch(
                "https://api.retellai.com/register-call", 
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer 24aefdf4-cb00-4da2-809b-18747c9ff77d" 
                  },
                  body: JSON.stringify({
                    "agent_id": agentId, // Replace with your actual agent ID
                    "audio_websocket_protocol": "web", // Choose the protocol based on your needs: "web" or "twilio"
                    "audio_encoding": "s16le", // Choose the encoding that matches your needs
                    "sample_rate": 24000 // Adjust the sample rate as needed
                  }),
                },
              );
    
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
    
          const data: RegisterCallResponse = await response.json();
          return data;
        } catch (err) {
          console.log(err);
          return { callId: '', sampleRate: 0 };
        }
      }
    async function startCall() {
        if (isCalling){
            sdk.stopConversation()
            console.log("supposed to end")
        }
        else{
            const registerCallResponse = await registerCall(agentId) as Record<string, any>;
            console.log(registerCallResponse['call_id'])
            currentCallId = registerCallResponse['call_id'];
            if (registerCallResponse['call_id']) {
                sdk
                .startConversation({
                    callId: registerCallResponse['call_id'],
                    sampleRate: registerCallResponse['sample_rate'],
                    enableUpdate: true,
                })
                .catch(console.error);
                setIsCalling(true); // Update button to "Stop" when conversation starts
            }
        }
        setIsCalling(!isCalling)
    }
    useEffect(() => {
        sdk.on("conversationStarted", () => {
            console.log("Conversation started");
        });
        
        // When the whole agent and user conversation ends
        sdk.on("conversationEnded", async () => {
            console.log("Conversation ended");
        });
        
        sdk.on("error", (error) => {
            console.error("An error occurred:", error);
        });
        
        // Update message such as transcript
        sdk.on("update", (update) => {
            // Print live transcript as needed
            console.log("update", update);
        });
        
        // When the client receives the audio from server to play
        sdk.on("audio", (audio: Uint8Array) => {
            console.log("There is audio");
        });
        
    },[])
    

    // const buttonConfig = {
    //     position: "top-right", // "bottom" | "top" | "left" | "right" | "top-right" | "top-left" | "bottom-left" | "bottom-right"
    //     offset: "40px", // decide how far the button should be from the edge
    //     width: "200px", // min-width of the button
    //     height: "35px", // height of the button
    //     idle: { // button state when the call is not active.
    //       color: `rgb(93, 254, 202)`, 
    //       type: "pill", // or "round"
    //       title: "Talk to Loan Expert", // only required in case of Pill
    //       icon: `https://unpkg.com/lucide-static@0.321.0/icons/phone.svg`,
    //     },
    //     loading: { // button state when the call is connecting
    //       color: `rgb(93, 124, 202)`,
    //       type: "pill", // or "round"
    //       title: "Connecting...", // only required in case of Pill
    //       subtitle: "Please wait", // only required in case of pill
    //       icon: `https://unpkg.com/lucide-static@0.321.0/icons/loader-2.svg`,
    //     },
    //     active: { // button state when the call is in progress or active.
    //       color: `rgb(255, 0, 0)`,
    //       type: "pill", // or "round"
    //       title: "Call is in progress...", // only required in case of Pill
    //       subtitle: "End the call.", // only required in case of pill
    //       icon: `https://unpkg.com/lucide-static@0.321.0/icons/phone-off.svg`,
    //     },
    //   };
    
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
                
                    <button onClick={startCall} 
                    style={{ transition: 'all 0.3s', boxShadow: '0 0 10px rgba(0,0,0,0.2)' }}
                    onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.style.transform = 'scale(1)'}
                
                    className="border bg-black/20 rounded-lg px-2 py-1 flex">{isCalling ? <div className="flex"><PhoneIcon className="mr-2 mt-1" style={{width: '20px',height:'20px'}}/>Call in Progress</div> : <div>Talk to Loan Expert</div>}</button>
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