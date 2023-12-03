import React, { useState } from 'react';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';
import { useNavigate } from 'react-router-dom';

import { RiEyeLine, RiEyeOffFill } from 'react-icons/ri';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const [token, setToken] = useState(localStorage.getItem("authToken") || "");

    const navigate = useNavigate();

    const handleRegister = async () => {

        if (password !== passwordConfirmation) {
            console.error("Passwords do not match!");
            return;
        }

        // TODO - Review this function
        try {
            const credentials = { "email": email, "password": password };
            // Perform sign-in API request
            const registerResponse = await fetch("http://localhost:8080/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            // TODO - Review, deve retornar o token na mesma mas o resto não
            if (registerResponse.ok) {
                const { id, token, username } = await registerResponse.json();

                // Store the token securely
                localStorage.setItem("userId", id)
                localStorage.setItem("authToken", token);
                localStorage.setItem("email", email);
                localStorage.setItem("username", username);
                setToken(token);

                // TODO - Redirect to home page if user has no team, otherwise redirect to dashboard if team leader or profile if team member
                navigate('/');
            } else {
                // Handle sign-in error
                console.error("Failed to register:", registerResponse.statusText);
            }
        } catch (error) {
            console.error("Error during register:", error);
        }
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handlePasswordConfirmationChange = (e) => {
        setPasswordConfirmation(e.target.value);
    };

    return (
        <div>
            <Navbar />
            <div className="hero min-h-screen">
                <div className="hero-content flex-col w-full justify-center items-center">
                    <div className="text-center bg:text-left p-2 rounded-sm">
                        <h1 className="text-5xl font-bold">Create Free Account</h1>
                        <p className="text-xl mt-4 mb-6">
                            KeyUsageProfiler gives you the ability to obtain various key stroke statistics from a team in an interactive way!
                        </p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-xl h- shadow-2xl bg-base-100">
                        <form className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Username</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="username"
                                    className="input input-bordered w-full"
                                    required
                                    value={username}
                                    onChange={handleUsernameChange}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="email"
                                    className="input input-bordered w-full"
                                    required
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="join w-full">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="password"
                                        className="input input-bordered join-item w-full"
                                        required
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-bordered join-item"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <RiEyeOffFill /> : <RiEyeLine />}
                                    </button>
                                </div>
                                <div className="join w-full py-4">
                                    <input
                                        type={showPasswordConfirmation ? 'text' : 'password'}
                                        placeholder="confirm your password"
                                        className="input input-bordered join-item w-full"
                                        required
                                        value={passwordConfirmation}
                                        onChange={handlePasswordConfirmationChange}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-bordered join-item"
                                        onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                    >
                                        {showPasswordConfirmation ? <RiEyeOffFill /> : <RiEyeLine />}
                                    </button>
                                </div>
                            </div>

                            <div className="form-control mt-6 mb-2">
                                <button
                                    className="btn btn-primary"
                                    onClick={handleRegister}
                                >
                                    Sign Up
                                </button>
                            </div>
                            <p className="text-sm text-center">
                                Already have an account?{' '}
                                <a
                                    href=""
                                    onClick={() => navigate('/login')}
                                    className="link link-accent"
                                >
                                    Sign in
                                </a>{' '}
                                to your account.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
