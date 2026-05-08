import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import ComplaintForm from "./components/ComplaintForm";
import ComplaintList from "./components/ComplaintList";
import Login from "./components/Login";

import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] =
    useState(localStorage.getItem("user"));

  const [complaints, setComplaints] =
    useState([]);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/complaints"
      );

      setComplaints(res.data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

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

          <ComplaintForm
            complaints={complaints}
            setComplaints={setComplaints}
          />

          <ComplaintList
            complaints={complaints}
            setComplaints={setComplaints}
          />
        </div>
      )}

      <ToastContainer position="top-right" />
    </>
  );
}

export default App;