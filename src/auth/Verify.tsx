import React, { useState } from 'react';
import useLoginStore from '../store/login';
import ThankYou from '../ThankYou';
import { VerifyProps, VerifyResponse } from '../types';

const Verify: React.FC<VerifyProps> = (props) => {
    const [otp, setOtp] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isSignInSuccess, setSignInSuccess] = useState<boolean>(false);


    const { setAuthResponse } = useLoginStore(({ setAuthResponse }) => ({
        setAuthResponse
    }));

    const handleVerify = async () => {
        const endpoint = import.meta.env.VITE_API_ENDPOINT; 
        const verify = {
            phone: props.phone,
            otp: otp,
        }
        console.log(JSON.stringify(verify))
        const response = await fetch(import.meta.env.VITE_VERIFY_ENDPOINT || '', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(verify),
        });
        if (response.ok) {
            const responseData: VerifyResponse = await response.json();
            setAuthResponse({expiresAt: Number(responseData.expires_in)})
            console.log(responseData)
            setSignInSuccess(true);
            window.location.href = `${props.redirectUri}?token=${responseData.jwt_token}&apiendpoint=${endpoint}`;
        } else {
            setError('Invalid OTP. Please retry.')
            setOtp('')
        }
    };

    if(isSignInSuccess) {
        return (
            <ThankYou />
        )
    }

    return (
        <div className="flex flex-col h-screen items-center justify-center">
            <h1 className='text-2xl my-8 text-center'>Nava 2-Factor Authentication</h1>
            <div className="bg-white shadow-md rounded px-8 pb-8 mb-4">
                <h2 className="text-2xl mb-4">Verification</h2>
                <form>
                    <p className="text-red-500 text-sm mb-4">{error}</p>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
                            Enter OTP:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="otp"
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter the 6-digit OTP"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={handleVerify}
                        >
                            Verify
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

}


export default Verify;