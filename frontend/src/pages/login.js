import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../static/js/APIClient';
import { AuthPage } from '../components';

const Login = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const user = await api.login(username, password);
            if (user) {
                setIsLoggedIn(true);
                navigate('/');
            }
        } catch (error) {
        }
    };

    return (
        <AuthPage>
            <div className="md:w-1/2 flex flex-col justify-center">
                <form onSubmit={handleLogin} className="p-4">
                    <h1 className="text-center font-bold text-6xl">Welcome</h1>
                    <h2 className="mb-4 text-center font-medium text-sm">to your personal food journey</h2>
                    <div className="mb-4">
                        <input
                            type="text"
                            id="username"
                            placeholder="Username"
                            className="w-full p-2 border rounded-md"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            className="w-full p-2 border rounded-md"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="bg-zinc-800 text-white rounded-md py-2 px-4 mt-3 w-full">Login</button>
                </form>
                <p className="mt-2 text-center">
                    Don't have an account? <a href="/signup" className="text-blue-500">Create an Account</a>
                </p>
            </div>
        </AuthPage>
    );
};

export default Login;
