import React from 'react';
import {useState} from 'react';
import {useClickedConversationStore} from "../../lib/storage";

const CallRecord = ({ id, caption, topic, time }: { id: number, caption: string, topic: string, time: string }) => {
    const [isHovered, setIsHovered] = useState(false);
  const {clicked, setClicked} = useClickedConversationStore() as { clicked: number, setClicked: (id: number) => void };

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleClick = () => {
    setClicked(id);
  };
  return (
    <a
      className={`flex align-items-center text-decoration-none px-4 py-3 ${isHovered ? 'bg-green-50' : ''} ${clicked == id ? 'bg-green-50' : ''}`}
      href="#"
      onMouseEnter={handleHover}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="position-relative flex-shrink-0 my-1">
        <span className="position-absolute bottom-0 end-0 border border-white rounded-circle me-1"></span>
      </div>
      <div className="flex justify-content-between w-100 ps-2 ms-1 my-1">
        <div className="me-3">
          <div className="text-lg mb-1">{topic}</div>
          <p className="text-body fs-sm mb-0">{caption}</p>
        </div>
        <div className="align-end">
          <span className="block fs-xs text-muted">{time}</span>
        </div>
      </div>
    </a>
    )
}

export default CallRecord