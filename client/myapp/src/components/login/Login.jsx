import React, { useState } from "react";
import "../signup/SignUp.css";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setEmail("");
      setPassword("");
      const response = await axios.post(
        "http://localhost:8000/api/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      setSuccess(response.data.msg);
      if (response.data.msg !== "Incorrect password or email") {
        setTimeout(() => {
          setSuccess("");
            navigate("/");
        }, 1500);
      } else {
        setPassword("");
        setEmail("");
        setTimeout(() => {
          setSuccess("");
        }, 2000);
      }
    } catch (error) {
      console.log(error);

      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="signup-inputs">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
            <button type="submit" className="signup-button">
              Login
            </button>
          </div>
        </form>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <p className="signup-footer">
          Don't have an account?{" "}
          <NavLink to={"/signup"} className="signup-link">
            SignUp
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
