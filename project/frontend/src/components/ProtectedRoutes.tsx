import type React from "react";
import { Navigate } from "react-router-dom";

type Props = {
  loggedIn: boolean;
  children: React.ReactNode;
};

export default function ProtectedRoute({ loggedIn, children }: Props) {
  if (!loggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
}
