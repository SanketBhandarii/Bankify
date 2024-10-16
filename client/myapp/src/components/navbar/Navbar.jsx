import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Navbar.css"; // Import CSS for styling

const Navbar = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = async () => {
    try {
      const response = await axios.get(" https://bankify-ztoj.onrender.com/api/logout", { withCredentials: true });
      navigate("/login");
      // Redirect to the login page
    } catch (error) {
      console.error("Logout error", error);
      alert("Failed to log out.");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Bankify</h1>
      </div>
      <div className="navbar-links">
        {/* Add other links here if needed */}
      </div>
      <div className="navbar-actions">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
