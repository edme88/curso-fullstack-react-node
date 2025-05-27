import { Link } from "react-router-dom";

const Layout = ({children}) => {
    return (
        <>
            <header>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/Contacto">Contacto</Link></li>
                </ul>
            </header>
            <main>
                {children}
            </main>
            <footer>
                <h2>Sitio desarrollado por Agus</h2>
            </footer>
        </>
    )
}

export {Layout};