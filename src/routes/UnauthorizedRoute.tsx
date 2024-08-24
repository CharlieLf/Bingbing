import useAuthContext from "@hooks/useAuthContext";
import { useAuth } from "@ic-reactor/react";
import { Navigate } from "react-router-dom";

interface Props {
    children: React.ReactNode;
}

const UnauthorizedRoute: React.FC<Props> = ({ children }) => {
    const { user } = useAuthContext();
    if (user === undefined) return <div>Loading...</div>;
    return user ? <Navigate to="/" replace /> : children;
};

export default UnauthorizedRoute;