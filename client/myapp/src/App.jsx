import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(" https://bankify-ztoj.onrender.com/api/home", {
          withCredentials: true,
        });

        if (response.data.msg !== "Please log in!") {
          navigate("/"); // User is authenticated, navigate to home
        } else {
          navigate("/login"); // User is not authenticated, navigate to login
        }
      } catch (error) {
        navigate("/login"); // Redirect to login on error (like token expired or server error)
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="loading-message">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
