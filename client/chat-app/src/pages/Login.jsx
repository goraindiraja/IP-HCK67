import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"


const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const requestBody = {
                email,
                password
            }

            let response = await axios.post("http://localhost:3000/login", requestBody, {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })

            console.log(response.data);
            
            localStorage.setItem("access_token", response.data.access_token)
            navigate("/")

        } catch (error) {
            console.log(error);
        }
    }
    return(
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center h-screen">
                    <div className="w-full p-6 rounded-lg shadow dark:border max-w-md dark:bg-gray-800 dark:border-gray-700">
                        <h1 className="text-xl font-bold text-white mb-4">Sign In</h1>

                        <form onSubmit={handleLogin} className="space-y-5 text-white">
                            <label className="input input-bordered flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                                <input type="email" className="grow" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                <input type="password" className="grow" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            </label>

                            <button type="submit" className="btn btn-primary w-full text-white">Sign In</button>
                            <p className="text-sm text-center">Do not have an account? <Link to="/login" className="text-blue-400 font-bold">Sign Up Here</Link></p>
                        </form>

                        <div className="divider">OR</div>

                        <div>
                            <button className="btn btn-primary w-full">Sign in with Google</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login