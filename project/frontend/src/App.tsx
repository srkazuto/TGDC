import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPages";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const storedLogin = localStorage.getItem("loggedIn") === "true";
    setLoggedIn(storedLogin);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage setLoggedIn={setLoggedIn} />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute loggedIn={loggedIn}>
            <DashboardPage setLoggedIn={setLoggedIn} />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
