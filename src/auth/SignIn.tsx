import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThankYou from '../ThankYou';
import useLoginStore from '../store/login';
import { SignInResponse } from '../types';


const SignIn: React.FC = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isSignInSuccess, setSignInSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const redirectUri = searchParams.get('redirecturi') || '';
    const clientId = searchParams.get('clientid') || '';
    const { setAuthResponse } = useLoginStore(({ setAuthResponse }) => ({
        setAuthResponse
    }));

    const handleSignIn = async () => {
        const endpoint = import.meta.env.VITE_API_ENDPOINT;
        const response = await fetch(import.meta.env.VITE_SIGNIN_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
    
        if (response.ok) {
            const data:SignInResponse = await response.json();
            console.log(data);
            setSignInSuccess(true);
            setError('');
            
            const date = new Date();
            date.setDate(date.getDate() + 30); 
            const expiresAt = date.getTime(); 
            
            setAuthResponse({ expiresAt });
            window.location.href = `${redirectUri}?token=${data.token}&apiendpoint=${endpoint}`;
        } else {
            setError('Invalid credentials. Please retry.');
            console.log('Invalid credentials');
        }
    };

    if (isSignInSuccess) {
        return (
            <ThankYou />
        );
    }

    return (
        <>
            <div className="flex flex-col h-screen items-center justify-center">
                <h1 className='text-2xl my-8 text-center'>Nava Authentication</h1>
                <div className="bg-white shadow-md rounded px-8 pb-8 mb-4">
                    <h2 className="text-2xl mb-4">Sign In</h2>
                    <form>
                        <p className="text-red-500 text-sm mb-4">{error}</p>
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
                        <div className="mb-6">
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
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={handleSignIn}
                            >
                                Sign In
                            </button>
                        </div>
                    </form>
                    <p className="text-sm pt-3">
                        Don't have an account?{' '}
                        <Link
                            to={`/signup?redirecturi=${encodeURIComponent(redirectUri)}&clientid=${encodeURIComponent(clientId)}`}
                            className="text-blue-500 hover:underline">
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </>

    );
};

export default SignIn;
