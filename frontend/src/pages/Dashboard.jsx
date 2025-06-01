import { Outlet } from "react-router-dom";
import { Layout } from "../components/Layout";

const Dashboard = () => {
    return (
        <Layout>
            <h2>Dashboard</h2>
            <Outlet />
        </Layout>
    )
}

export { Dashboard };