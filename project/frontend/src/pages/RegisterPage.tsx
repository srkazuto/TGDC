import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

type RegisterForm = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterForm) => {
    setError("");
    try {
      const res = await axios.post("http://localhost:3000/api/users/register", data);
      console.log(res.data);
      alert("Usuario registrado correctamente!");
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al registrar usuario");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: "15px" }}>
          <label>Nombre:</label>
          <input
            type="text"
            {...register("name", { required: "El nombre es obligatorio" })}
            style={{ display: "block", width: "100%", marginTop: "5px" }}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Email:</label>
          <input
            type="email"
            {...register("email", { required: "El email es obligatorio" })}
            style={{ display: "block", width: "100%", marginTop: "5px" }}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Contraseña:</label>
          <input
            type="password"
            {...register("password", { required: "La contraseña es obligatoria" })}
            style={{ display: "block", width: "100%", marginTop: "5px" }}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" style={{ width: "100%", padding: "10px" }}>
          Registrarse
        </button>
      </form>

      <p style={{ marginTop: "15px" }}>
        ¿Ya tienes una cuenta?{" "}
        <Link to="/login" style={{ color: "blue", textDecoration: "underline" }}>
          Inicia sesión aquí
        </Link>
      </p>
    </div>
  );
}
