import React, { useState } from "react";

export default function Homie() {
    const [newMessage, setNewMessage] = useState("")
    const [response, setResponse] = useState("")
    const ask = async () => {
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
            setResponse(data);
        })
        .catch(error => {
            console.log("gpt response error: ", error);
        });
    };
    return <div className="mt-5">
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }} className="mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-10 h-10">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>

            <b><h1>Homie</h1></b>
            <h2>Your friendly 24/7 loan advisor</h2>
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
           
            <div
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
              Hi, I am your friendly loan assistant. How may I help you?

            </div>
            <div
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
              Is now a good time to buy a house?

            </div>
            

            <div
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
              {newMessage}

            </div>
            <div
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
              {response}

            </div>





            <div style={{
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
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === "Enter" && e.shiftKey === false) {
                                    e.preventDefault();
                                    ask()
                                }
                            }}
                    />
                </div>
            </div>
        </div>
</div>
}