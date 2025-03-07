import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const RedirectRoute = () => {
    const { user } = useContext(UserContext);
    if (user.token) {
        return <Navigate to="/dashboard" replace />;
    }
    return <Outlet />;
};

export default RedirectRoute;