// src/pages/Dashboard.tsx
import { useState, useEffect } from "react";
import axios from "axios";

type User = {
  id: number;
  name: string;
  email: string;
};

type Task = {
  id: number;
  title: string;
  description?: string;
  userId: number;
};

export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userName, setUserName] = useState<string>("Usuario");

  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName") || "Usuario";
    setUserName(storedName);

    fetchUsers();
    fetchTasks();
  }, []);

  // 🔹 Usuarios
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/users", { withCredentials: true });
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const addUser = async () => {
    try {
      await axios.post("http://localhost:3000/api/users/register", {
        name: newUserName,
        email: newUserEmail,
        password: newUserPassword,
      }, { withCredentials: true });
      setNewUserName("");
      setNewUserEmail("");
      setNewUserPassword("");
      fetchUsers();
    } catch (error) {
      console.error("Error adding user", error);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${id}`, { withCredentials: true });
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  // 🔹 Tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/tasks", { withCredentials: true });
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  const addTask = async () => {
    try {
      await axios.post("http://localhost:3000/api/tasks", {
        title: newTaskTitle,
        description: newTaskDescription,
      }, { withCredentials: true });
      setNewTaskTitle("");
      setNewTaskDescription("");
      fetchTasks();
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${id}`, { withCredentials: true });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Bienvenido Sr. {userName}</h1>

      {/* Usuarios */}
      <section>
        <h2>Usuarios</h2>
        <div>
          <input placeholder="Nombre" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} />
          <input placeholder="Email" value={newUserEmail} onChange={(e) => setNewUserEmail(e.target.value)} />
          <input placeholder="Contraseña" value={newUserPassword} type="password" onChange={(e) => setNewUserPassword(e.target.value)} />
          <button onClick={addUser}>Agregar Usuario</button>
        </div>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.name} ({user.email}){" "}
              <button onClick={() => deleteUser(user.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </section>

      {/* Tasks */}
      <section>
        <h2>Tareas</h2>
        <div>
          <input placeholder="Título" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} />
          <input placeholder="Descripción" value={newTaskDescription} onChange={(e) => setNewTaskDescription(e.target.value)} />
          <button onClick={addTask}>Agregar Tarea</button>
        </div>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              {task.title} - {task.description}{" "}
              <button onClick={() => deleteTask(task.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
