import { Link } from "react-router-dom";
import "../styles/footer.css";
import "../styles/header.css";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Layout = ({children}) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        logout();
        navigate("/login");
    }

    return (
        <>
            <header className="header">
                <h1>Lista de Tareas</h1>
                {
                    user && <>
                        <Link to="/">Home</Link>
                        <button onClick={handleLogout}>Cerrar Sesión</button>
                    </>
                }
                {
                    !user && <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Registrarse</Link>
                    </>
                }    
            </header>
            <main>
                {children}
            </main>
            <footer className="footer">
                Sitio desarrollado por Agus
            </footer>
        </>
    )
}

export {Layout};