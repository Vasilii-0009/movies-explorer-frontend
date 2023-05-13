import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ element: Component, ...props }) {
  return props.loggedIn ? Component : <Navigate to="/signin" />;
}

export default ProtectedRoute;
