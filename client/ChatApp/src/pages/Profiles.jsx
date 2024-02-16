import Swal from 'sweetalert2'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../assets/components/Navbar';
import { useNavigate } from 'react-router-dom';

const Profiles = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [file, setFile] = useState("")


    const handleFileSelect = (e) => {
        console.log(e.target.files[0]);
        setFile(e.target.files[0])
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            let requestBody = {
                name,
                email
            }

            let currentId = localStorage.getItem("currentId")
            let response = await axios.put("http://localhost:3000/users/" + currentId, requestBody, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            })

            if(file){
                console.log('File to Change', file)
                let formData = new FormData()
                formData.append('image', file)
                console.log(formData);

                let responseFile = await axios.patch(`http://localhost:3000/users/${currentId}/img`, formData, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`
                    }
                })

                console.log(responseFile)
                // navigate("/")
            }

            console.log(response.data);
            fetchData()

        } catch (error) {
            console.log(error);
        }
    }

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
            setName(response.data.name)
            setEmail(response.data.email)
            setImageUrl(response.data.imageUrl)

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
        <div className="hero min-h-screen bg-base-200">
        <div className="hero-content lg:w-[30rem] text-center">
            <div className="w-full">
            <h1 className="text-3xl font-bold py-6">Update Profile</h1>
            <div className="w-full flex justify-center">
                <img className='w-28 rounded-full' alt="Tailwind CSS Navbar component" src={imageUrl} />
            </div>
            <form onSubmit={handleUpdate} className="space-y-5 text-white py-6">
                  <label className="input input-bordered flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 opacity-70"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input
                      type="text"
                      className="grow"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>

                  <label className="input input-bordered flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 opacity-70"
                    >
                      <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                      <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input
                      type="email"
                      className="grow"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Pick a file</span>
                            <span className="label-text-alt">Update Profile Image</span>
                        </div>
                        <input onChange={handleFileSelect} type="file" className="file-input file-input-bordered w-full" />
                    </label>
                  <button type="submit" className="btn btn-primary w-full text-white"> Update Data </button>
                </form>
            </div>
        </div>
        </div>
    </>
  )
}

export default Profiles