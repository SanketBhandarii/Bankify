import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setUsername("");
      setPassword("");
      setEmail("");
      const response = await axios.post("http://localhost:8000/api/signup", {
        username,
        email,
        password,
      });
      setSuccess(response.data.msg);
      if (
        response.data.msg !== "User with this credentials already exist" &&
        response.data.msg == "SignUp successful"
      ) {
        setTimeout(() => {
          setSuccess("");
          navigate("/login");
        }, 1500);
        return;
      } else {
        setTimeout(() => {
          setSuccess("");
          setUsername("");
          setPassword("");
          setEmail("");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="signup-inputs">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength="8"
            />
            <button type="submit" className="signup-button">
              Sign Up
            </button>
          </div>
        </form>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <p className="signup-footer">
          Already have an account?{" "}
          <NavLink to={"/login"} className="signup-link">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;
