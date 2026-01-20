import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authStore } from "../api/client";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const token = authStore.getToken();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
