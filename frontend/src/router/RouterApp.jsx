import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Dashboard } from "../pages/Dashboard";
import { Ajustes } from "../pages/Ajustes";
import { PrivateRoute } from "../components/PrivateRoute";

const RouterApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/dashboard" element={ <PrivateRoute>
                    <Route path="/dashboard" element={ <Dashboard /> }>
                        <Route path="ajustes" element={ <Ajustes /> } />
                    </Route>
                    </PrivateRoute>
                }>    
                </Route>
                <Route path="/" element={ <Home /> } />
                
                <Route path="/login" element={ <Login /> } />
                <Route path="/register" element={ <Register /> } />
                <Route path="*" element={<h2>Página no encontrada...</h2>} />
            </Routes>
        </BrowserRouter>
    )
};

export { RouterApp };