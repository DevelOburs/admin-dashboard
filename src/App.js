import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import "./styles/App.css";
import LoadingSpinner from "./utils/LoadingSpinner";
import { LoadingProvider } from "./utils/LoadingContext";

function App() {
  return (
    <LoadingProvider>
      <LoadingSpinner />
      <Router>
        <Routes>
          {/* Public route - login page */}
          <Route path="/login" element={<LoginForm />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          />
        </Routes>
      </Router>
    </LoadingProvider>
  );
}

export default App;
