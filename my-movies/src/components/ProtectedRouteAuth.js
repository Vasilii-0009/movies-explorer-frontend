import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRouteAuth({ element: Component, ...props }) {
   return props.tokenLocalStorage ? <Navigate to="/" /> : Component;
}

export default ProtectedRouteAuth;
