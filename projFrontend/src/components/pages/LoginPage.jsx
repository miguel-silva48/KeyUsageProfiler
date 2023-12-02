import React, { useState } from 'react';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';
import { useNavigate } from 'react-router-dom';

import { RiEyeLine, RiEyeCloseLine } from 'react-icons/ri';

import { fetchData } from '../../utils';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("authToken") || "");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const credentials = { email: email, password : password };
      // Perform sign-in API request
      const signInResponse = await fetch("http://localhost:8080/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (signInResponse.ok) {
        const { token } = await signInResponse.json();

        // Store the token securely
        localStorage.setItem("authToken", token);
        setToken(token);

        // TODO - Redirect to home page if user has no team, otherwise redirect to dashboard if team leader or profile if team member
        navigate('/');
      } else {
        // Handle sign-in error
        console.error("Failed to sign in:", signInResponse.statusText);
      }
    } catch (error) {
      console.error("Error during sign in:", error);
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
      <Navbar />
      <div className="hero min-h-screen bg-[url('/src/assets/shopping2.jpg')]">
        <div className="hero-content flex-col w-full lg:flex-row-reverse justify-center items-center">
          <div className="text-center bg:text-left bg-secondary bg-opacity-80 p-2 rounded-md">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              New here?{' '}
              <a
                href=""
                onClick={() => navigate('/registerUser')}
                className="link link-accent"
              >
                Sign up
              </a>{' '}
              for an account to get started.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
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
                    className="input input-bordered join-item "
                    required
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <button
                    type="button"
                    className="btn btn-bordered join-item"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <RiEyeCloseLine /> : <RiEyeLine />}
                  </button>
                </div>
              </div>
              <div className="form-control mt-6">
                <button
                  className="btn btn-primary"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
