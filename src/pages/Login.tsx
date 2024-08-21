import { useState } from 'react';
import loginImage from '../assets/product/login.jpg';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');

    return (
        <div className="flex justify-between">
            <img src={loginImage} className='w-1/2 h-screen mr-1'/>

            <div className='flex flex-col justify-center w-full p-10 space-y-8'>
                <p className='font-marcellus text-3xl'>SIGN IN</p>

                <div className='space-y-3'>
                    <div>
                        <p>Email*</p>
                        <input value={email} onChange={(e) => {setEmail(e.target.value)}} className='w-full p-3 border-black border'/>
                    </div>

                    <p className='text-red-500 text-xs font-medium'>error</p>

                    <button className='w-full bg-black border-black border-2 p-3 text-white text-lg font-bold'>SIGN IN</button>
                </div>
            </div>
        </div>
    )
};

export default Login;