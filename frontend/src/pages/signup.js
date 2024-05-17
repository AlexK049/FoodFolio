import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import APIClient from '../static/js/APIClient.js';

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
        <div className="row justify-content-center mt-5">
            <div className="card col-lg-5 col-md-8 col-sm-10">
                <form onSubmit={handleSignup} className="signup-form">
                    <h2 className="mb-4 text-center">Create an Account</h2>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Sign Up</button>
                </form>
                <p className="mt-2 text-center">
                    Already a user? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
