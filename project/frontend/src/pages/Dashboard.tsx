import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // 🔹 Verifica si el usuario tiene sesión activa
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/users/me", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        console.error("No autenticado, redirigiendo al login...");
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  // 🔹 Cierra la sesión
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/users/logout",
        {},
        { withCredentials: true }
      );
      alert("Sesión cerrada correctamente");
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // 🔹 Si aún no se ha cargado el usuario
  if (!user) return <p>Cargando...</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", textAlign: "center" }}>
      <h2>Bienvenido, {user.name} 🎉</h2>
      <p>Email: {user.email}</p>

      <hr style={{ margin: "20px 0" }} />

      <h3>Panel de Control</h3>
      <p>Aquí podrás ver tus tareas, categorías o datos según la prueba técnica.</p>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          cursor: "pointer",
          backgroundColor: "tomato",
          color: "white",
          border: "none",
          borderRadius: "6px",
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
}
