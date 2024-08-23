// import { createContext, useState, useContext, ReactNode } from 'react';

// export const AuthContext = createContext({
//     authenticated: false,
//     setAuthenticated: (value: boolean) => { },
// });

// const AuthProvider = ({ children }: { children: ReactNode }) => {
//     const [authenticated, setAuthenticated] = useState(false);
//     return (
//         <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error('useAuth must be used within an AuthProvider');
//     }
//     return context;
// };

// export default useAuth;

// export { AuthProvider };