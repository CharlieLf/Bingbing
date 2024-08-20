import { createContext } from "react";

interface AuthContextProps {

}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);