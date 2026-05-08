import React, { useState } from "react";
import { toast } from "react-toastify";

function Login({ setIsLoggedIn }) {
  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState("Student");

  const handleLogin = (e) => {
    e.preventDefault();

    // ADMIN LOGIN
    if (
      role === "Admin" &&
      username === "admin" &&
      password === "admin123"
    ) {
      localStorage.setItem("user", username);
      localStorage.setItem("role", role);

      toast.success("Admin Login Successful");

      setIsLoggedIn(true);

      return;
    }

    // STUDENT LOGIN
    if (
      role === "Student" &&
      username === "student" &&
      password === "1234"
    ) {
      localStorage.setItem("user", username);
      localStorage.setItem("role", role);

      toast.success(
        "Student Login Successful"
      );

      setIsLoggedIn(true);

      return;
    }

    toast.error("Invalid Credentials");
  };

  return (
    <div className="login-container">
      <form
        className="login-form"
        onSubmit={handleLogin}
      >
        <h2>🏨 Hostel Complaint Portal</h2>

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        <select
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
        >
          <option>Student</option>
          <option>Admin</option>
        </select>

        <button type="submit">
          Login
        </button>

        <div className="demo-credentials">
          <p>
            <strong>Student:</strong>{" "}
            student / 1234
          </p>

          <p>
            <strong>Admin:</strong>{" "}
            admin / admin123
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;