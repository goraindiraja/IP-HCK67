import React, { useEffect, useRef, useState } from 'react'
import MessageBuble from './MessageBuble'
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from '../../firebase';
import axios from 'axios';

const ChatBox = () => {
    const messagesEndRef = useRef()
    const [messages, setMessages] = useState([])

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({behavior: "smooth"})
    }

    useEffect(scrollToBottom, [messages])

    useEffect(() => {
      const q = query(collection(db, "messages"), orderBy("createdAt"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messages = [];
        querySnapshot.forEach((doc) => {
            messages.push({...doc.data(), id: doc.id});
        });
        setMessages(messages)
        console.log(messages);
        });

        return () => unsubscribe
    }, []);

    return (
        <>
            <div className='pb-40 pt-20 px-8 containerWrap'>
                {
                    messages.map(item => {
                        return <MessageBuble key={item.id} id={item.senderId} message={item.text} name={item.name} image={item.imageUrl}/>
                    })
                }

                <div ref={messagesEndRef}></div>
            </div>
        </>
    )
}

export default ChatBox