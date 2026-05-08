import React, { useState } from "react";

import ComplaintForm from "./components/ComplaintForm";
import ComplaintList from "./components/ComplaintList";
import Login from "./components/Login";

import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] =
    useState(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <>
      {!isLoggedIn ? (
        <Login setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <div className="container">
          <div className="top-bar">
            <div>
              Welcome,{" "}
              {localStorage.getItem("user")} (
              {localStorage.getItem("role")})
            </div>

            <button
              className="logout-btn"
              onClick={logout}
            >
              Logout
            </button>
          </div>

          <div className="hero-section">
            <h1>
              🏨 Hostel Complaint Management
            </h1>

            <p>
              Smart complaint tracking system
              for students and administrators
            </p>
          </div>

          <ComplaintForm />

          <ComplaintList />
        </div>
      )}

      <ToastContainer position="top-right" />
    </>
  );
}

export default App;