import React from 'react'

const MessageBuble = ({id, message, name, image}) => {
    return (
        <>
            <div className={`chat ${id === localStorage.getItem("currentId") ? "chat-end": "chat-start"}`}>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS chat bubble component" src={image} />
                    </div>
                </div>
                <div className="chat-header">
                    {name}
                    {/* <time className="text-xs opacity-50">12:45</time> */}
                </div>
                <div className="chat-bubble">{message}</div>
            </div>
                
        </>
    )
}

export default MessageBuble