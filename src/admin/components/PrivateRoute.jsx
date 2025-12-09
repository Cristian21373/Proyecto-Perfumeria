import { useAuth } from "../../shared/context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, user } = useAuth();

    console.log("PRIVATE ROUTE → isAuthenticated:", isAuthenticated);
    console.log("PRIVATE ROUTE → user:", user);

    if (!isAuthenticated) {
        console.log("PRIVATE ROUTE → Bloqueando acceso. Redirigiendo a /admin/login");
        return <Navigate to="/admin/login" />;
    }

    console.log("PRIVATE ROUTE → Acceso permitido");
    return children;
};

export default PrivateRoute;
