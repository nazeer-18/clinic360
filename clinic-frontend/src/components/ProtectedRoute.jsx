import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";  // Navigate is for redirection, Outlet renders child routes
import { UserContext } from "../context/UserContext";  // Assuming you have this context

const ProtectedRoute = () => {
    const { user } = useContext(UserContext);
    if (!user.token) {
        return <Navigate to="/login" replace />;
    }
    // If the user is logged in, render the child components (the protected route)
    return <Outlet />;
};

export default ProtectedRoute;
