import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'
import { getDataById } from '../../redux/dataSlice'

const SendMessage = () => {
    const {name, email, imageUrl} = useSelector((state) => state.dataSlice.data)
    const dispatch = useDispatch()

    const [value, setValue] = useState("")
    // const [name, setName] = useState("")
    // const [email, setEmail] = useState("")
    // const [imageUrl, setImageUrl] = useState("")
    
    
    const handleMessage = async (event) => {
        event.preventDefault()
        
        if(value.trim() === ""){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Text Cannot be Empty"
            })
            return
        }
        
        try {
            console.log(name, email, imageUrl, "<<<");
            await addDoc(collection(db, "messages"), {
                text: value,
                name,
                imageUrl,
                senderId: localStorage.getItem("currentId"),
                createdAt: serverTimestamp()
            })
            // console.log(value)
            setValue("")
            
        } catch (error) {
            console.log(error);
        }
    }

    const fetchData = async () => {
        try {
            // const currentId = localStorage.getItem("currentId")
            // let response = await axios.get("http://localhost:3000/users/"+currentId, {
            //     headers: {
            //         'Access-Control-Allow-Origin': '*',
            //         Authorization: `Bearer ${localStorage.getItem("access_token")}`
            //     }
            // })
            dispatch(getDataById())

            // console.log(response.data);
            // setName(response.data.name)
            // setEmail(response.data.email)
            // setImageUrl(response.data.imageUrl)

            // setName(nameRedux)
            // setEmail(emailRedux)
            // setImageUrl(imageRedux)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

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