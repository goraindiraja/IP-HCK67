import { createBrowserRouter, redirect } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard/>,
        loader: async() => {
            if(!localStorage.getItem('access_token')){
                throw redirect("/login")
            }

            return null
        }
    },
    {
        path: "/login",
        element: <Login/>,
        loader: async() => {
            if(localStorage.getItem('access_token')){
                throw redirect("/")
            }

            return null
        }
    },
    {
        path: "/register",
        element: <Register/>,
        loader: async() => {
            if(localStorage.getItem('access_token')){
                throw redirect("/")
            }

            return null
        }
    }
])

export default router