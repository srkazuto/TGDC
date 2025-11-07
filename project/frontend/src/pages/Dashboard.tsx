import { useState, useEffect } from "react";
import axios from "axios";

type User = { id: number; name: string; email: string };
type Task = { id: number; title: string; description: string };

export default function DashboardPage({ userName, setLoggedIn }: { userName: string; setLoggedIn: Function }) {
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchTasks();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/users");
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createTask = async () => {
    if (!taskTitle) return;
    try {
      await axios.post("http://localhost:3000/api/tasks", { title: taskTitle, description: taskDesc });
      setTaskTitle("");
      setTaskDesc("");
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userName");
    setLoggedIn(false);
  };

  return (
    <div>
      <h1>Bienvenido, {userName}</h1>
      <button onClick={handleLogout}>Cerrar sesión</button>

      <h2>Usuarios</h2>
      <ul>
        {users.map(u => <li key={u.id}>{u.name} - {u.email}</li>)}
      </ul>

      <h2>Tareas</h2>
      <input placeholder="Título" value={taskTitle} onChange={e => setTaskTitle(e.target.value)} />
      <input placeholder="Descripción" value={taskDesc} onChange={e => setTaskDesc(e.target.value)} />
      <button onClick={createTask}>Agregar tarea</button>
      <ul>
        {tasks.map(t => <li key={t.id}>{t.title}: {t.description}</li>)}
      </ul>
    </div>
  );
}
