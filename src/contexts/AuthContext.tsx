import { getBalanceQuery } from "@/services/tokenService";
import { getUserQuery } from "@/services/userService";
import useServiceContext from "@hooks/useServiceContext";
import { useAgentManager, useAuth } from "@ic-reactor/react";
import User from "@models/user";
import { createContext, useEffect } from "react";

interface AuthContextProps {
    user: User | null | undefined;
    balance: number;
    login: () => Promise<void>;
    logout: () => Promise<void>;
}

interface Props {
    children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps>({
    user: undefined,
    balance: 0,
    login: async () => undefined,
    logout: async () => undefined
});

const AuthProvider: React.FC<Props> = ({ children }) => {
    const { authenticating } = useServiceContext();
    const { user, getUser, getUserLoading } = getUserQuery();
    const { balance, getBalance } = getBalanceQuery();
    const { login, logout } = useAgentManager();

    const fetchUser = async () => {
        await getUser();
    }

    useEffect(() => {
        if (!authenticating && !getUserLoading) {
            fetchUser();
        }
    }, [authenticating]);

    return (
        <AuthContext.Provider value={{
            user,
            balance,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider };
export default AuthContext;