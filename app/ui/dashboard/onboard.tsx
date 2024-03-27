"use client"
import React,{useState, useEffect} from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { RetellWebClient } from "retell-client-js-sdk";


const agentId = "aea880571942adaecca1af2f509ae5fd"
interface RegisterCallResponse {
    callId?: string;
    sampleRate: number;
  }

const CompleteConsultationButton = () => {
    let currentCallId: string = '';
    const [isCalling, setIsCalling] = useState(false);
    const sdk = new RetellWebClient();
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
  return (<button
  onClick={() => startCall()}
    style={{ transition: 'all 0.3s', boxShadow: '0 0 10px rgba(0,0,0,0.2)' }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    className="border py-3 px-4 flex bg-green-600 text-white rounded-lg px-2 py-1 flex"
  >
    {isCalling ? <>Consultation in Progress</> : <>
    Complete Consultation <ArrowRightIcon className="mt-1 text-lg ml-3 w-[20px]"/></>}
  </button>)
};

export default CompleteConsultationButton;