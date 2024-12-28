import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Users from "./Users";
import Recipes from "./Recipes";
import "../styles/Dashboard.css";
import { clearAuthToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuthToken();
    toast.success("Logged out successfully!", { position: "bottom-right" });
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="dashboardContainer">
      <button onClick={handleLogout} className="logoutButton">
        Logout
      </button>

      <header className="dashboardHeader">
        <h1>Fridgify Admin</h1>
      </header>

      <div className="tabs">
        <button
          className={activeTab === "users" ? "tab active" : "tab"}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
        <button
          className={activeTab === "recipes" ? "tab active" : "tab"}
          onClick={() => setActiveTab("recipes")}
        >
          Recipes
        </button>
      </div>
      <div className="tabContent">
        {activeTab === "users" && <Users />}
        {activeTab === "recipes" && <Recipes />}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
