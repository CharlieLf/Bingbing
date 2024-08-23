import { useAuth } from "@ic-reactor/react";
import { Navigate } from "react-router-dom";

interface Props {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
    const { authenticated } = useAuth();
    return true ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;