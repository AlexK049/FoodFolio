import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import APIClient from '../static/js/APIClient.js';
import AuthPage from '../components/authPage.js';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const res = await APIClient.signup(firstName, lastName, username, password);
            navigate('/login');
        } catch (error) {
        }
    };

    return (
        <AuthPage>
            <div className="md:w-1/2 flex flex-col justify-center">
                <form onSubmit={handleSignup} className="p-4">
                    <h1 className="text-center font-bold text-6xl">Welcome</h1>
                    <h2 className="mb-4 text-center font-medium text-sm">to your personal food journey</h2>
                    <input
                        type="text"
                        id="firstName"
                        placeholder="First Name"
                        className="w-full p-2 border rounded-md mb-4"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                        type="text"
                        id="lastName"
                        placeholder="Last Name"
                        className="w-full p-2 border rounded-md mb-4"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <input
                        type="text"
                        id="username"
                        placeholder="Username"
                        className="w-full p-2 border rounded-md mb-4"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        className="w-full p-2 border rounded-md mb-4"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="bg-zinc-800 text-white rounded-md py-2 px-4 mt-3 w-full">Login</button>
                </form>
                <p className="mt-2 text-center">
                    Already a user? <a href="/login" className="text-blue-500">Login</a>
                </p>
            </div>
        </AuthPage>
    );
};

export default Signup;
