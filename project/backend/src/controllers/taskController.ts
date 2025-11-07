import { Request, Response } from "express";
import { AppDataSource } from "../db/data-source";
import { Task } from "../models/Task";
import { User } from "../models/User";

const taskRepo = AppDataSource.getRepository(Task);
const userRepo = AppDataSource.getRepository(User);

// Crear tarea
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const sessionUser = req.session.user;
    if (!sessionUser) return res.status(401).json({ message: "No autorizado" });

    const user = await userRepo.findOneBy({ id: sessionUser.id });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const task = taskRepo.create({ title, description, user });
    await taskRepo.save(task);

    res.json({ message: "Tarea creada exitosamente", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear tarea" });
  }
};

// Obtener todas las tareas del usuario
export const getTasks = async (req: Request, res: Response) => {
  try {
    const sessionUser = req.session.user;
    if (!sessionUser) return res.status(401).json({ message: "No autorizado" });

    const tasks = await taskRepo.find({
      where: { user: { id: sessionUser.id } },
      relations: ["user"],
    });

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener tareas" });
  }
};

// Obtener tarea por ID (solo del usuario)
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const sessionUser = req.session.user;
    if (!sessionUser) return res.status(401).json({ message: "No autorizado" });

    const task = await taskRepo.findOne({
      where: { id: parseInt(id!), user: { id: sessionUser.id } },
      relations: ["user"],
    });

    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener tarea" });
  }
};

// Actualizar tarea
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const sessionUser = req.session.user;
    if (!sessionUser) return res.status(401).json({ message: "No autorizado" });

    const task = await taskRepo.findOne({
      where: { id: parseInt(id!), user: { id: sessionUser.id } },
    });

    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });

    task.title = title || task.title;
    task.description = description || task.description;

    await taskRepo.save(task);
    res.json({ message: "Tarea actualizada correctamente", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar tarea" });
  }
};

// Eliminar tarea
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const sessionUser = req.session.user;
    if (!sessionUser) return res.status(401).json({ message: "No autorizado" });

    const task = await taskRepo.findOne({
      where: { id: parseInt(id!), user: { id: sessionUser.id } },
    });

    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });

    await taskRepo.remove(task);
    res.json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar tarea" });
  }
};
