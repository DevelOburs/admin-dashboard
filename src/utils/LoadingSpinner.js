import React from "react";
import { useLoading } from "./LoadingContext";
import "../styles/LoadingSpinner.css";

const LoadingSpinner = () => {
  const { loading } = useLoading();

  return (
    loading && (
      <div className="loadingSpinner">
        <div className="spinner"></div>
      </div>
    )
  );
};

export default LoadingSpinner;
