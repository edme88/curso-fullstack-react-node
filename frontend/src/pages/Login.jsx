import { useState } from "react";
import { Layout } from "../components/Layout";

const Login = () => {
    const [user, setUser] = useState(true);
    return (
        <Layout>
            <>
            {
                !user ? <form>
                    <label for="usuario"></label>
                    <input type="text" placeholder="Usuario" />

                    <label for="password"></label>
                    <input type="password" placeholder="Password" />

                    <button>Login</button>
                </form> : <h2>Usuario Logueado</h2>
            }
            </>
        </Layout>
    )
}

export { Login };