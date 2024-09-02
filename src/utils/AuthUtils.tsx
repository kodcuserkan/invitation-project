import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useLoginStore from '../store/login';
const AuthMiddleware = () => {
    const navigate = useNavigate();

    const { isLogin } = useLoginStore(({ isLogin }) => ({
        isLogin
    }));

    useEffect(() => {
        if (isLogin()) {
            navigate('/thank-you');
        }
    }, [isLogin, navigate]);
};

export default AuthMiddleware;
