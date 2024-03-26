import React from 'react';
import {useState} from 'react';
import {useClickedConversationStore, useTranscriptStore} from "../../lib/storage";

const CallRecord = ({ call_id, caption, topic, time }: { call_id: string, caption: string, topic: string, time: string }) => {
    const [isHovered, setIsHovered] = useState(false);
  const {clicked, setClicked} = useClickedConversationStore() as { clicked: string, setClicked: (id: string) => void };
  const {transcript, setTranscript} = useTranscriptStore() as { transcript: { [key: string]: any }, setTranscript: (id: { [key: string]: any }) => void };

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleClick = async () => {
    setClicked(call_id);
    console.log(call_id, transcript)
    const response = await fetch('https://api.retellai.com/get-call/' + call_id, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer 24aefdf4-cb00-4da2-809b-18747c9ff77d'
        }
    });
    const transcript_obj = await response.json()
    setTranscript(transcript_obj.transcript_object)
  };
  return (
    <a
      className={`flex align-items-center text-decoration-none px-4 py-3 ${isHovered ? 'bg-green-50' : ''} ${clicked == call_id ? 'bg-green-50' : ''}`}
      href="#"
      onMouseEnter={handleHover}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="position-relative flex-shrink-0 my-1">
        <span className="position-absolute bottom-0 end-0 border border-white rounded-circle me-1"></span>
      </div>
      <div className="flex justify-content-between w-60 ps-2 ms-1 my-1">
    <div className="me-3" style={{ flex: 1 }}>
        <div className="text-lg mb-1">{topic} - {time}</div>
        <p className="text-body fs-sm mb-0">{caption}</p>
    </div>
</div>
    </a>
    )
}

export default CallRecord