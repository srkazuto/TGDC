import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPages";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoutes";
import { useState, useEffect } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedLogged = localStorage.getItem("loggedIn") === "true";
    const storedName = localStorage.getItem("userName") || "";
    setLoggedIn(storedLogged);
    setUserName(storedName);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to={loggedIn ? "/dashboard" : "/login"} />} />
      <Route path="/login" element={<LoginPage setLoggedIn={setLoggedIn} setUserName={setUserName} />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute loggedIn={loggedIn}>
            <DashboardPage userName={userName} setLoggedIn={setLoggedIn} />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
