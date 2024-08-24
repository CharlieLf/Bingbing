import { useState } from 'react';
import loginImage from '../assets/product/login.jpg';
import { Link } from 'react-router-dom';
import { useAuth } from '@ic-reactor/react';
import useUser from '@hooks/useUser';

const Login: React.FC = () => {
    const { getUser } = useUser().getUser();
    const [error, setError] = useState<string>('');
    const { login, logout } = useAuth({
        onLoginSuccess: async () => {
            const result = await getUser();
            if (!result) {
                setError('An error occurred');
                await logout();
                return;
            }
            if ('err' in result) {
                await logout();
                setError(result.err);
                return;
            }
        },
        onLoginError: (error) => {
            setError(error ?? 'An error occurred');
        }
    });

    async function handleLogin() {
        await login();
    }

    return (
        <div className="flex justify-between">
            <img src={loginImage} className='w-1/2 h-screen mr-1' />

            <div className='flex flex-col justify-center w-full p-10 space-y-8'>
                <p className='font-marcellus text-3xl'>SIGN IN</p>

                <div className='space-y-3'>
                    <p className='text-red-500 text-xs font-medium min-h-4'>{error}</p>

                    <button onClick={handleLogin} className='w-full bg-black border-black border-2 p-3 text-white text-lg font-bold'>SIGN IN</button>
                    <Link to="/register">
                        <p className="p-2 w-full text-center">
                            Don't have an account yet? <span className="font-bold">Sign up here.</span>
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default Login;