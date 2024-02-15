import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../../firebase'

const SendMessage = () => {
    const [value, setValue] = useState("")
    
    const handleMessage = async (event) => {
        event.preventDefault()

        if(value.trim() === ""){
            alert("Enter valid message")
            return
        }

        try {
            await addDoc(collection(db, "messages"), {
                text: value,
                name: localStorage.getItem("name"),
                imageUrl: localStorage.getItem("imageUrl"),
                senderId: localStorage.getItem("currentId"),
                createdAt: serverTimestamp()
            })
            console.log(value)
            setValue("")
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <>
        <div className='bg-slate-800 fixed bottom-0 w-full py-10 shadow-lg'>
            <form onSubmit={handleMessage} action="" className='px-4 containerWrap flex'>
                <input value={value} onChange={e => setValue(e.target.value)} type="text" className='input w-full focus:outline-none bg-slate-400 text-black rounded-r-none' />
                <button type="submit" className="w-auto bg-blue-700 text-white rounded-r-lg px-8 text-sm">Send</button>
            </form>
        </div>
    </>
  )
}

export default SendMessage