import axios from 'axios';
import React, { useEffect } from 'react'
import Navbar from '../assets/components/Navbar';

const Profiles = () => {

    const fetchData = async () => {
        try {
            const currentId = localStorage.getItem("currentId")
            let response = await axios.get("http://localhost:3000/users/"+currentId, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            })

            console.log(response.data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

  return (
    <>
        <Navbar/>
        <div>Profiles</div>
    </>
  )
}

export default Profiles