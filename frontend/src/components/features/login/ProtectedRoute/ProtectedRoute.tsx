import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebaseConfig";

interface ProtectedRouteProps {
  component: React.ComponentType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
}) => {
  const isAuthenticated = auth.currentUser !== null;

  return isAuthenticated ? <Component /> : <Navigate to="/" />;
};

export default ProtectedRoute;
