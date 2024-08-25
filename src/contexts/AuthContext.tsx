import { getBalanceQuery } from "@/services/tokenService";
import { getUserQuery } from "@/services/userService";
import useServiceContext from "@hooks/useServiceContext";
import { useAgentManager, useAuth } from "@ic-reactor/react";
import { AuthClientLoginOptions } from "@ic-reactor/react/dist/types";
import User from "@models/user";
import { createContext, useEffect, useState } from "react";

interface AuthContextProps {
    user: User | null | undefined;
    setUser: (user: User | null | undefined) => void;
    balance: number;
    login: (options?: AuthClientLoginOptions) => Promise<void>;
    getIdentity: () => Promise<void>;
    removeIdentity: () => Promise<void>;
    fetchUser: () => Promise<void>;
}

interface Props {
    children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps>({
    user: undefined,
    setUser: () => undefined,
    balance: 0,
    login: async () => undefined,
    getIdentity: async () => undefined,
    removeIdentity: async () => undefined,
    fetchUser: async () => undefined
});

const AuthProvider: React.FC<Props> = ({ children }) => {
    const [user, setUser] = useState<User | undefined | null>();
    const { authenticating } = useServiceContext();
    const { getUser, getUserLoading } = getUserQuery();
    const { balance, getBalance } = getBalanceQuery();
    const { login, logout } = useAgentManager();

    const fetchUser = async () => {
        const result = await getUser();
        if (!result || 'err' in result) {
            await logout();
            setUser(null);
            return;
        }
        setUser(User.castToUser(result.ok));
    }


    useEffect(() => {
        if (user === undefined && !getUserLoading && !authenticating) {
            fetchUser();
        }
    }, [authenticating]);

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            balance,
            getIdentity: login,
            login,
            removeIdentity: logout,
            fetchUser
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider };
export default AuthContext;