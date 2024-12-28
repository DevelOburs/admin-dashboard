import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import styles from "../styles/LoginForm.module.css";
import { setAuthToken } from "../utils/auth";
import axiosInstance from "../utils/AxiosInstance";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onLoginSuccess = (token) => {
    toast.success("Login successful!", { position: "bottom-right" });
    setAuthToken(token);
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("auth-api/login", {
        username,
        password,
      });
      if (!response.data.roles.includes("ADMIN")) {
        throw new Error("not admin!");
      }
      onLoginSuccess(response.data.token);
    } catch (err) {
      toast.error("Invalid username or password: " + err, {
        position: "bottom-right",
      });
      console.error("Login error:", err);
    }
  };

  return (
    <div className={styles.loginFormContainer}>
      <h2 className={styles.loginHeader}>Fridgify Admin</h2>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <div className={styles.formGroup}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.loginButton}>
          Login
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
