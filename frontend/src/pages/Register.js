import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "./Register.css";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:5000/api/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
            .then((response) => {
                if (!response.status === 201) {
                    return response.json().then((err) => {
                        throw new Error(err.message);
                    })
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                localStorage.setItem("user", JSON.stringify(username));
                navigate("/home");
            })
            .catch((error) => {
                console.error("Error :", error.message);
                setError(error.message);
            });
    };

    return (
        <div className="main">
            <Header />
            <div className="registerContain">
                <form className="registerForm" onSubmit={handleSubmit}>
                    <h1>Register</h1>
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
                    <button type="submit" className="btn draw-border registerButton">Register</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
