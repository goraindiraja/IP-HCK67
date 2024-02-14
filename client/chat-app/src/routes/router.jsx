import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";

const router = createBrowserRouter([
    {
        path: "/register",
        element: <Register/>
    },
    {
        path: "/login",
        element: <Login/>
    }
])

export default router