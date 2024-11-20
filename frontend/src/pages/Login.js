import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((err) => {
                        throw new Error(err.message);
                    })
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                localStorage.setItem("user", JSON.stringify(data.user.username));
                navigate("/home");
            })
            .catch((error) => {
                console.error('Error logging in:', error.message);
                setError(error.message);
            });
    };

    return (
        <div className="main">
            <Header />
            <div className="loginContain">
                <form className="loginForm" onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    {error && <p>{error}</p>}
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => { setUsername(e.target.value); setError("") }}
                        placeholder="Enter your username"
                        required
                    />
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setError("") }}
                        placeholder="Enter your password"
                        required
                    />
                    <button type="submit" className="btn draw-border loginButton">Login</button>
                    <p>
                        Don't have an account? <a href="/register">Sign up</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
