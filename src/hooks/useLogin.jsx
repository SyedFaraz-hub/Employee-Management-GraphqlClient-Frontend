import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../graphql/Mutations';
import { notification } from 'antd';
import {jwtDecode} from 'jwt-decode';

const useLogin = () => {
    const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);

    const handleLogin = async (email, password) => {
        try {
            const response = await login({
                variables: {
                    email,
                    password,
                },
            });

            if (response.data.Login) {
                localStorage.setItem('token', response.data.Login);
                localStorage.setItem('user', JSON.stringify(jwtDecode(response.data.Login)));
                
                notification.success({
                    message: "Success",
                    description: "Login successful",
                });
            }
        } catch (err) {
            console.error('Login error:', err);
            notification.error({
                message: "Error",
                description: "Please check your credentials",
            });
        }
    };

    return {
        data,
        loading,
        error,
        handleLogin,
    };
};

export default useLogin;
