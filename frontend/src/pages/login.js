import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../static/js/APIClient';
import mainLogo from '../static/images/pretzel-logo.png'
import styles from '../static/css/login.module.css'

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
        <div className="row justify-content-center mt-5">
            <div className="card col-lg-5 col-md-8 col-sm-10">
                <form onSubmit={handleLogin}>
                    <h2 className="mb-4 text-center">Login</h2>
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
                    <button type="submit" className="btn btn-primary mt-3">
                        Login
                    </button>
                </form>
                <p className="mt-2 text-center">
                    Don't have an account? <Link to="/signup">Create an Account</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
