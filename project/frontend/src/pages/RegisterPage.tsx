import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const { register, handleSubmit } = useForm<RegisterData>();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterData) => {
    try {
      if (!data.name || !data.email || !data.password) {
        setError("Por favor completa todos los campos");
        return;
      }

      if (!data.email.includes("@")) {
        setError("Correo inválido");
        return;
      }

      await axios.post("http://localhost:3000/api/users/register", data, {
        withCredentials: true,
      });

      alert("Usuario registrado correctamente");
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al registrar usuario");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Registro</h2>

        <input
          {...register("name")}
          type="text"
          placeholder="Nombre"
          className="border p-2 w-full mb-3 rounded"
        />

        <input
          {...register("email")}
          type="email"
          placeholder="Correo electrónico"
          className="border p-2 w-full mb-3 rounded"
        />

        <input
          {...register("password")}
          type="password"
          placeholder="Contraseña"
          className="border p-2 w-full mb-3 rounded"
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 w-full rounded hover:bg-blue-600"
        >
          Registrarse
        </button>

        <p className="text-sm text-center mt-3">
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Inicia sesión
          </a>
        </p>
      </form>
    </div>
  );
}
