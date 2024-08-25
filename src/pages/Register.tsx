import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import registerImage from '../assets/product/register.jpg';
import Input from '@components/Input';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAgentManager, useAuth } from '@ic-reactor/react';
import useAuthContext from "@hooks/useAuthContext";
import { createUserQuery, getUserQuery } from "@/services/userService";

const Register: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [dob, setDOB] = useState<Date | null>(null);
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [error, setError] = useState<string>('');

    const { getUser } = getUserQuery();
    const { createUser } = createUserQuery(name, email, phoneNumber, BigInt(dob?.getTime() ?? Date.now()), address);
    const { login } = useAuthContext();

    async function handleRegister(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        try {
            if (!name || !email || !dob || !phoneNumber || !address) {
                setError('Please fill all fields');
                return;
            }
            await login();
            const result = await createUser();
            if (!result) {
                setError('Registration failed');
                return;
            }
            if ('err' in result) {
                setError('User already exists');
                return;
            }
            await getUser();
        } catch (e: any) {
            setError(e.message);
        }
    }

    return (
        <div className="flex justify-between">
            <img src={registerImage} className='w-[756] h-screen mr-1' />

            <form className='flex flex-col justify-center w-full p-10 space-y-8'>
                <p className='font-marcellus text-3xl'>SIGN UP</p>

                <div className='space-y-3'>
                    <Input
                        label='Name*'
                        data={name}
                        inputOnChange={(e) => { setName(e.target.value) }} />

                    <Input
                        label='Email*'
                        data={email}
                        inputOnChange={(e) => { setEmail(e.target.value) }} />

                    <div className='flex flex-col'>
                        <label>Date of Birth*</label>
                        <DatePicker selected={dob} onChange={(date) => { setDOB(date) }} className='w-full p-3 border-black border' />
                    </div>

                    <Input
                        label='Phone Number*'
                        data={phoneNumber}
                        inputOnChange={(e) => { setPhoneNumber(e.target.value) }} />

                    <Input
                        label='Address*'
                        data={address}
                        inputOnChange={(e) => { setAddress(e.target.value) }} />

                    <p className='text-red-500 text-xs font-medium min-h-4'>{error}</p>

                    <button onClick={(e) => { handleRegister(e) }} className='w-full bg-black border-black border-2 p-3 text-white text-lg font-bold'>SIGN UP</button>
                    <Link to="/login">
                        <p className="p-2 w-full text-center">
                            Already have an account? <span className="font-bold">Sign in here.</span>
                        </p>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Register;