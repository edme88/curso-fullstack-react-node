import { Link } from "react-router-dom";
import "../styles/footer.css";
import "../styles/header.css";

const Layout = ({children}) => {
    return (
        <>
            <header className="header">
                <h1>Lista de Tareas</h1>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Registrarse</Link>
            
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