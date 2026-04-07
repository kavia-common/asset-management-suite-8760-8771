import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getSession, subscribeAuth } from "../state/auth";

/**
 * PUBLIC_INTERFACE
 * Protects routes by requiring a token.
 */
export function ProtectedRoute({ children }) {
  const [session, setSession] = useState(getSession());
  useEffect(() => subscribeAuth(setSession), []);

  if (!session?.token) return <Navigate to="/login" replace />;
  return children;
}
