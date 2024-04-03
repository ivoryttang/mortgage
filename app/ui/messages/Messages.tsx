//ts-nocheck
"use client"
import CallRecord from "../components/call-record";
import {useState, useEffect} from "react";
import {useTranscriptStore, useRecordingStore} from "../../lib/storage";
import Waveform from "./Waveform";

export default function Messages(){

    const [newMessage, setNewMessage] = useState("")
    const [messageHistory, setMessageHistory] = useState<string[]>([]);
    const [callRecords, setCallRecords] = useState<[]>([]);
    const {transcript, setTranscript} = useTranscriptStore() as { transcript: { [key: string]: any }, setTranscript: (id: { [key: string]: any }) => void };
    const {recording, setRecording} = useRecordingStore() as { recording: string, setRecording: (id: string) => void };



    async function getCalls(){
        const url = 'https://api.retellai.com/list-calls?agent_id=aea880571942adaecca1af2f509ae5fd&after_start_timestamp=1712105105470';
    
        const response = await fetch(`${url}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer 24aefdf4-cb00-4da2-809b-18747c9ff77d`
            }
        });
        return response.json()
    }
    useEffect(() => {
        
        const getCallsData = async () => {
            try {
                const calls = await getCalls();
                console.log(calls)
                const specificValues = calls.map((call: { call_id:string, start_timestamp: string, transcript: string[] }) => {
                    // var reducted_transcript = call.transcript.slice(0, 10)
                    return {
                        call_id: call.call_id,
                        start_timestamp: new Date(call.start_timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        transcript: call.transcript ? call.transcript.slice(0, 80).concat("...") : ""
                    };
                });
                setCallRecords(specificValues)
                // Handle the fetched data here
            } catch (error) {
                console.error("Error fetching calls:", error);
            }
        };
        getCallsData();
    }, []);
    

    const ask = () => {
        console.log("called")
        var requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: ''
        };
        fetch(`https://app.domusnow.com/ask?newMessage=${newMessage}`, requestOptions)
        .then(response => response.text())
        .then(data => {
            console.log("success")
            setMessageHistory(prevHistory => [...prevHistory, data]);
        })
        .catch(error => {
            console.log("gpt response error: ", error);
        });
    };
return (
    <div>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" id="google-font" />
        <link rel="stylesheet" media="screen" href="assets/vendor/simplebar/dist/simplebar.min.css" />
        <link rel="stylesheet" media="screen" href="assets/css/theme.min.css" />
        <div className="col-lg-9 pt-4 pb-2 pb-sm-4">
        <div className="row position-relative overflow-hidden gx-2 zindex-1 flex">
             
              <div className="col-xl-4 ">
                <div className="offcanvas-xl offcanvas-start position-absolute position-xl-relative h-100 bg-light rounded-5 border border-xl-0" id="contactsList" data-bs-scroll="true" data-bs-backdrop="false">
                  <div className="rounded-5 overflow-hidden ">
                    <div className="card-header w-100 border-0 px-4 pt-4 pb-3 ">
                      <div className="position-relative">
                        <input className="form-control pe-5 rounded" type="text" placeholder="Search conversations" /><i className="ai-search fs-lg text-nav position-absolute top-50 end-0 translate-middle-y me-3"></i>
                      </div>
                    </div>
                    <div className="card-body px-0 pb-4 pb-xl-0 pt-1 ">
                      
                    {callRecords.map(({call_id, start_timestamp, transcript}, index) => (
                        <CallRecord key={index} call_id={call_id} caption={transcript} topic="Web Call" time={start_timestamp} />
                    ))}
                    </div>
                  </div>
                </div>
              </div>
              
              

     
    <div className="mt-5 w-[1000px]">
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }} className="mb-3">
            <b><h1 className="text-xl">Call Log</h1></b>
            {recording != "" ? <Waveform audio={recording}/> : <></>}
        </div>
        <div
            // ref={(ref) => setScrollContainerRef(ref)}
            // onScroll={handleScroll}
            
            style={{
                overflowY: 'scroll',
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "5px",
                minHeight: "70vh",
                maxHeight: "70vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start", // Or 'flex-end', 'center', etc.
                backdropFilter: "blur(3px)",
                
            }}
            className="chat-messages scroll-container"
        >
           
            {/* <div
                style={{
                    margin: "5px",
                    padding: "10px",
                    maxWidth: "70%",
                    borderRadius: "5px",
                    display: "flex",
                    flexDirection: "column",
                    alignSelf: "flex-start",
                    textAlign: "left",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "green" ,
                    color: "white",
                    whiteSpace: "pre-line",
                }}
                className={`message group`}
            >
              Hi, I'm here to assist you with your mortgage today. How may I help you?

            </div> */}
            
            
            {transcript?.map(({role, content}: {role: string, content: string}) => (
                role == "user" ? 
                <div
                key={content}
                style={{
                    margin: "5px",
                    padding: "10px",
                    maxWidth: "70%",
                    borderRadius: "5px",
                    display: "flex",
                    flexDirection: "column",
                    alignSelf: "flex-end",
                    textAlign: "right",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#000" ,
                    color: "#fff",
                    whiteSpace: "pre-line",
                }}
                className={`message group`}
            >
              {content}

            </div> :
                <div
                key={content}
                style={{
                    margin: "5px",
                    padding: "10px",
                    maxWidth: "70%",
                    borderRadius: "5px",
                    display: "flex",
                    flexDirection: "column",
                    alignSelf: "flex-start",
                    textAlign: "left",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "green" ,
                    color: "white",
                    whiteSpace: "pre-line",
                }}
                className={`message group`}
            >
              {content}

            </div>
            ))}






            {/* <div style={{
                position: 'fixed',
                bottom: 0,
                width: '100%',
                padding: '10px',
                backgroundColor: 'white',
                zIndex: 999
            }}>
                <div className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mt-3 mr-2 w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                    </svg>

                    <input type="text" className="w-full p-3 rounded-lg text-black" placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => {setNewMessage(e.target.value)}}
                            onKeyPress={(e) => {
                                if (e.key === "Enter" && e.shiftKey === false) {
                                    e.preventDefault();
                                    ask()
                                    setMessageHistory(prevHistory => [...prevHistory, newMessage]);
                                }
                            }}
                    />
                </div>
            </div> */}
        </div>
        </div>
        
        
        </div>
        </div>
        
    </div>
    );
 }