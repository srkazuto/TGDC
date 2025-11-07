import { Navigate } from "react-router-dom";

type Props = {
  loggedIn: boolean;
  children: React.ReactNode
};

export default function PublicRoute({ loggedIn, children }: Props) {
  if (loggedIn) {
    // Si ya está logeado, no puede ir al login/register
    return <Navigate to="/dashboard" replace />;
  }
  return children; // Si no está logeado, permite ver la ruta
}
