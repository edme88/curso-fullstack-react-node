import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { PrivateRoute } from "../components/PrivateRoute";

const RouterApp = () => (
    <BrowserRouter>
        <Routes>
            {/* <Route path="/">
                <PrivateRoute>
                    <Home />
                </PrivateRoute>
            </Route> */}
            <Route path="/" element={ <Home /> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="/register" element={ <Register /> } />
            <Route path="*" element={<h2>Página no encontrada...</h2>} />
        </Routes>
    </BrowserRouter>
);

export { RouterApp };