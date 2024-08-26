import useAuthContext from "@hooks/useAuthContext";
import { Navigate } from "react-router-dom";

interface Props {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
    const { user } = useAuthContext();
    if (user === undefined) return <div>Loading...</div>;
    return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;