import React, { useState } from 'react';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';
import { useNavigate } from 'react-router-dom';

import { RiEyeLine, RiEyeOffFill } from 'react-icons/ri';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("authToken") || "");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {

    if (email === "") {
      console.error("LOGIN: Empty email");
      setErrorMessage("Email cannot be empty. Please check and try again.");
      return;
    }

    if (password === "") {
      console.error("LOGIN: Empty password");
      setErrorMessage("Password cannot be empty. Please check and try again.");
      return;
    }

    try {
      const credentials = { "email": email, "password" : password };
      // Perform sign-in API request
      const signInResponse = await fetch("http://localhost:8080/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (signInResponse.ok) {
        console.log("LOGIN: Sign in successful!");
        const { id, token, refreshToken, username, email, userType } = await signInResponse.json();

        // Store the token securely
        localStorage.setItem("userId", id)
        localStorage.setItem("authToken", token);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("email", email);
        localStorage.setItem("username", username);
        localStorage.setItem("userType", userType);
        setToken(token);

        if (userType === "TEAM_LEADER") {
          navigate('/dashboard');
        } else if (userType === "TEAM_MEMBER") {
          navigate('/user');
        } else {
          navigate('/');
        }
      } else {
        //Bad credentials
        console.error("LOGIN: Failed to signin - ", signInResponse.statusText);
        setErrorMessage("Invalid email or password. Please try again.");
      }
    } catch (error) {
      //Connection error
      console.error("LOGIN: Error during signin - ", error);
      setErrorMessage("Connection error. Please try again later.");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <Navbar/>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col w-full justify-center items-center">
          <div className="text-center bg:text-left p-2 rounded-sm">
            <h1 className="text-5xl font-bold">Sign in to your account</h1>
            <p className="text-xl mt-4 mb-6">
              KeyUsageProfiler gives you the ability to obtain various key stroke statistics from a team in an interactive way!
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-xl h- shadow-2xl bg-base-100">
            <form className="card-body">
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
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>
              <p className="text-sm text-center">
              Don't have an account?{' '}
              <a
                href=""
                onClick={() => navigate('/register')}
                className="link link-accent"
              >
                Sign up
              </a>{' '}
              to get started.
            </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
