import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPages";
import DashboardPage from "./pages/Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    // Verifica si la sesión está activa al cargar
    const checkSession = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/users/me", {
          withCredentials: true,
        });
        setIsLoggedIn(!!res.data.user);
      } catch {
        setIsLoggedIn(false);
      }
    };
    checkSession();
  }, []);

  if (isLoggedIn === null) return <p>Cargando...</p>; // mientras verifica

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <RegisterPage />}
        />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <DashboardPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
