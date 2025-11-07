import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

type LoginForm = { email: string; password: string };
type Props = { setLoggedIn: (value: boolean) => void; setUserName: (name: string) => void; };

export default function LoginPage({ setLoggedIn, setUserName }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    setError("");
    try {
      const res = await axios.post("http://localhost:3000/api/users/login", data);
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("userName", res.data.user.name);
      setLoggedIn(true);
      setUserName(res.data.user.name);
      navigate("/dashboard");
    } catch (err) {
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", textAlign: "center" }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email:</label>
          <input type="email" {...register("email", { required: "El email es obligatorio" })} />
          {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
        </div>

        <div>
          <label>Contraseña:</label>
          <input type="password" {...register("password", { required: "La contraseña es obligatoria" })} />
          {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Entrar</button>
      </form>
      <p>
        ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
    </div>
  );
}
