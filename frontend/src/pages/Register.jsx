import { useState } from "react";
import { Layout } from "../components/Layout";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";


const NODE_DEV = import.meta.env.VITE_NODE_DEV ?? "development"
const API_URL = NODE_DEV === "production" ? import.meta.env.VITE_API_URL : "http://localhost:2222/tasks"

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login } = useAuth;

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Usuario Registrado")


        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password})
        })
        const data = await response.json();
        console.log(data)

        setUsername("")
        setEmail("")
        setPassword("")
        login(data);
        Navigate("/dashboard")
    }

    return (
        <Layout>
            {user && <h2>Hola {user.name}</h2>}
            {!user && <form onSubmit={handleSubmit}>
                        <h2>Registro de Usuarios</h2>
                        {error && <p className="error">{error}</p>}
                        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
                        <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                        <input type="text" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                        <button>Registrar Usuario</button>
                    </form>       
            }
            
        </Layout>
    )
}

//El token encodeado tiene 3 partes
//rojo 1: información de encodeo
//rosa 2: payload - info del backend para el front - para que reconozca el usuario logueado - No se encripta, se cifra
//celeste 3: contraseña  - Si se encripta - tiene la firma
export { Register };