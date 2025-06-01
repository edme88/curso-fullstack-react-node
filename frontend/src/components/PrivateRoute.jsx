import { useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const [user, setUser] = useState(false);

    return user ? children : <Navigate to={"/login"} />;
}

export { PrivateRoute };