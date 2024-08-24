import useToken from "@hooks/useToken";
import useUser from "@hooks/useUser";
import { useAuth } from "@ic-reactor/react";
import User from "@models/user";
import { createContext, useEffect, useState } from "react";

interface AuthContextProps {
    user: User | null | undefined;
    fetchUser: () => Promise<void>;
    balance: number;
}

interface Props {
    children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps>({
    user: undefined,
    fetchUser: async () => { },
    balance: 0
});

const AuthProvider: React.FC<Props> = ({ children }) => {
    const { logout } = useAuth();
    const { getUser } = useUser().getUser();
    const [user, setUser] = useState<User | null | undefined>(undefined);
    const [balance, setBalance] = useState(0);
    const { getBalance } = useToken().getBalance();

    async function fetchUser() {
        try {
            const result = await getUser();
            if (!result || 'err' in result) {
                await logout();
                setUser(null);
                return
            }
            setUser(User.castToUser(result.ok));
            // getBalance().then(res => {
            // if (!res || 'err' in res) {
            //     await logout();
            //     setUser(null);
            //     console.log('an unknown error occured');

            //     return;
            // }
            // setBalance(Number(res.ok));
            // })
        } catch (error) {
            await logout();
            setUser(null);
        }
    }

    useEffect(() => {
        if (user === undefined) fetchUser();
    }, [])

    return (
        <AuthContext.Provider value={{ user, fetchUser, balance }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider };
export default AuthContext;