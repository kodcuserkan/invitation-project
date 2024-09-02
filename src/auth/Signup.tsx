// SignUp.tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Verify from './Verify';

const SignUp: React.FC = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [isSignupSuccess, setSignupSuccess] = useState<boolean>(false);
    const redirectUri = searchParams.get('redirecturi') || '';

    // const clientId = searchParams.get('clientid') || '';

    const handleSignUp = async () => {
        try {
            const user = {
                email: email,
                username: username,
                password: password,
                phone: phoneNumber,
            };
            console.log(JSON.stringify(user))
            const response = await fetch(import.meta.env.VITE_SIGNUP_ENDPOINT || '', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            if (response.ok) {
                console.log('Sign up successful');
                setSignupSuccess(true);
            } else {
                const errorData = await response.json();
                alert(`Sign up failed: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error during sign up:', error);
            alert('An error occurred during sign up. Please try again.');
        }
    };


    if (isSignupSuccess) {
        return (
            <Verify redirectUri={redirectUri} username={email} phone={phoneNumber} />
        );
    }

    return (
        <>
            <div className="flex flex-col h-screen items-center justify-center">
                <h1 className='text-2xl my-8 text-center'>Nava-Assist Sign Up</h1>
                <div className="bg-white shadow-md rounded px-8 pb-8 mb-4">
                    <h2 className="text-2xl mb-4">Sign Up</h2>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                                Phone Number:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="phoneNumber"
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="Enter your phone number"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={handleSignUp}
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
                <p className="text-sm">
                    Already have an account?{' '}
                    <Link to={{
                        pathname: '/signin',
                        search: searchParams.toString()
                    }} className="text-blue-500 hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </>
    );
};

export default SignUp;
