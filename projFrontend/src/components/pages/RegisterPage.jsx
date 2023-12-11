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
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleRegister = async () => {

        if (username === "") {
            console.error("REGISTER: Empty username");
            setErrorMessage("Username cannot be empty. Please check and try again.");
            return;
        }

        if (email === "") {
            console.error("REGISTER: Empty email");
            setErrorMessage("Email cannot be empty. Please check and try again.");
            return;
        }

        if (password === "") {
            console.error("REGISTER: Empty password");
            setErrorMessage("Password cannot be empty. Please check and try again.");
            return;
        }

        if (password !== passwordConfirmation) {
            console.error("REGISTER: Unmatched passwords");
            setErrorMessage("Passwords do not match. Please check and try again.");
            return;
        }

        try {
            const credentials = { "username": username, "email": email, "password": password };
            // Perform sign-up API request
            const registerResponse = await fetch("http://localhost:8080/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            if (registerResponse.ok) {
                console.log("REGISTER: Sign up successful!");
                const { id, token, refreshToken, username, email, userType } = await registerResponse.json();

                // Store the token securely
                localStorage.setItem("userId", id)
                localStorage.setItem("authToken", token);
                localStorage.setItem("refreshToken", refreshToken);
                localStorage.setItem("email", email);
                localStorage.setItem("username", username);
                localStorage.setItem("userType", userType);
                setToken(token);

                //Auto-login after successful registration
                const loginResponse = await fetch("http://localhost:8080/api/auth/signin", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ "email": email, "password": password }),
                });

                if (loginResponse.ok) {
                    console.log("LOGIN: Sign in after registration successful!");
                    const {token} = await loginResponse.json();

                    // Store the token securely
                    localStorage.setItem("authToken", token);
                    setToken(token);

                    //New user are all of type USER
                    //Send them to to the homepage to incentivize them to join a team
                    navigate('/');
                } else {
                    console.error("LOGIN: Failed to signin after registration - ", loginResponse.statusText);
                    setErrorMessage("Invalid email or password. Please try again.");
                }
            } else {
                // Handle sign-up error
                console.error("REGISTER: signup failed - ", registerResponse.statusText);
                setErrorMessage("Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("REGISTER: Error during signup - ", error);
            setErrorMessage("Connection error. Please try again later.");
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

                            {errorMessage && (
                                <div className="alert alert-error mt-4">
                                    <div className="flex-1">
                                        <label>{errorMessage}</label>
                                    </div>
                                </div>
                            )}

                            <div className="form-control mt-6 mb-2">
                                <button
                                    type="button"
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
