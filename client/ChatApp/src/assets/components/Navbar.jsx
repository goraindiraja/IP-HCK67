import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()

    const handleLogout = (e) => {
        e.preventDefault()

        localStorage.clear()
        navigate("/login")
    }

    return (
    <>
        <div className='bg-slate-800 text-white fixed z-10 w-full'>
            <div className="navbar containerWrap">
                <div className="flex-1">
                    <a className="text-xl font-bold">ChatApp!</a>
                </div>
                <div className="flex-none gap-2">
                    <div>
                        <h1 className='font-semibold'>Welcome, {localStorage.getItem("name")} !</h1>
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src={localStorage.getItem("imageUrl")} />
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-slate-800 rounded-lg w-52">
                            <li> <Link to="/profiles">Profile</Link></li>
                            <li> <a onClick={handleLogout}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Navbar