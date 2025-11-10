import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type User = {
  id: number;
  name: string;
  email: string;
};

type Props = {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DashboardPage({ setLoggedIn }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/users/profile", {
        withCredentials: true,
      });
      setUser(res.data);
      setName(res.data.name);
      setEmail(res.data.email);
    } catch (err) {
      console.error("Error obteniendo perfil:", err);
      navigate("/login");
    }
  };

  const handleUpdate = async () => {
    setMessage("");
    try {
      const res = await axios.put(
        "http://localhost:3000/api/users/profile",
        { name, email, currentPassword, newPassword },
        { withCredentials: true }
      );
      setUser(res.data.user);
      setMessage("Perfil actualizado correctamente");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err: any) {
      console.error(err);
      setMessage(err.response?.data?.message || "Error al actualizar");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/users/logout", {}, { withCredentials: true });
      setLoggedIn(false);
      localStorage.removeItem("loggedIn");
      navigate("/login");
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    }
  };

  if (!user) return <p>Cargando perfil...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 via-white to-blue-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Perfil de Usuario</h1>

        <form className="space-y-5">
          <div>
            <label className="block text-left font-semibold mb-1">Nombre</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label className="block text-left font-semibold mb-1">Correo electrónico</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu correo"
            />
          </div>

          <div>
            <label className="block text-left font-semibold mb-1">
              Contraseña actual (solo si deseas cambiarla)
            </label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-left font-semibold mb-1">Nueva contraseña</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {message && (
            <p className={`text-center font-semibold ${message.includes("correctamente") ? "text-green-500" : "text-red-500"}`}>
              {message}
            </p>
          )}

          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
            <button
              type="button"
              onClick={handleUpdate}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
            >
              Guardar cambios
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
            >
              Cerrar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
