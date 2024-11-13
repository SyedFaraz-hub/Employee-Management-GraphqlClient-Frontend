import { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { Mail, Lock, EyeClosed, EyeIcon } from "lucide-react";
import { Redirect } from 'react-router-dom';
import { useLogin } from '../hooks';

const SignIn = () => {
    const { handleLogin, data, loading } = useLogin();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    if (data?.Login) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Login</h2>
                <Form layout="vertical">
                    <Form.Item label="Email">
                        <Input
                            prefix={<Mail className="w-5 h-5 text-gray-400" />}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            className='py-2'
                        />
                    </Form.Item>
                    <Form.Item label="Password">
                        <Input
                            prefix={<Lock className="w-5 h-5 text-gray-400" />}
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="your password"
                            suffix={
                                <Button type="link" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeIcon className="w-5 h-5 text-gray-400" /> : <EyeClosed className="w-5 h-5 text-gray-400" />}
                                </Button>
                            }
                        />
                    </Form.Item>
                    <Button
                        disabled={email === '' || password === ''}
                        loading={loading} type="primary" onClick={() => handleLogin(email, password)}>
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default SignIn;