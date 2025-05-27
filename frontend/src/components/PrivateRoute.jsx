import { useState } from "react";

const PrivateRoute = ({children}) => {
    const [user, setUser] = useState(false);

    return user ? children : <Navigate to={"/login"} />;
}

export {PrivateRoute};