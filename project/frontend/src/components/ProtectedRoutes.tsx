import type React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ loggedIn, children }: { loggedIn: boolean, children: React.ReactNode }) {
  if (!loggedIn) return <Navigate to="/login" />;
  return children;
}
