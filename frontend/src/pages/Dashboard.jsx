import { Outlet } from "react-router-dom";
import { Layout } from "../components/Layout";
import { useAuth } from "../context/authContext";

const Dashboard = () => {
    const { user } = useAuth();
    const { id, name, email } = user;

    return (
        <Layout>
            <h2>Dashboard</h2>
            <p><b>ID:</b> {id} </p>
            <p><b>Name:</b> {name} </p>
            <p><b>Email:</b> {email} </p>
            <Outlet />
        </Layout>
    )
}

export { Dashboard };