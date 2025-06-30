import { useState } from "react";
import { Layout } from "../components/Layout";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";


const NODE_DEV = import.meta.env.VITE_NODE_DEV ?? "development"
const API_URL = NODE_DEV === "production" ? import.meta.env.VITE_API_URL : "http://localhost:2222/tasks"

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState()
    const [error, setError] = useState();

    const { user, login} = useAuth;
    const navigate = useNavigate;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password})
            })
            const data = await response.json();
            login(data)
            navigate("/dashboard")
        }catch(error){
            setError(error.message)
        }

    }

    return (
        <Layout>
            <>
            {
                !user ? <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Usuario</label>
                    <input type="text" id="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />

                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}  />

                    <button type="submit">Login</button>
                </form> : <h2>Usuario Logueado</h2>
            }
            </>
        </Layout>
    )
}

export { Login };