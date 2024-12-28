import React from "react";
import { Navigate } from "react-router-dom";
import { getAuthToken } from "../utils/auth";

const PrivateRoute = ({ element, ...rest }) => {
  return getAuthToken() ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
