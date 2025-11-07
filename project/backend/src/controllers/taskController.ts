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
    res.json({ message: "Tarea creada" });
  } catch (error) {
    res.status(500).json({ message: "Error al crear tarea" });
  }
};

// Obtener tareas
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
    res.status(500).json({ message: "Error al obtener tareas" });
  }
};

// Eliminar tarea
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (!idParam)
      return res.status(400).json({ message: "ID es obligatorio" });

    const numericId = parseInt(idParam);
    if (isNaN(numericId))
      return res.status(400).json({ message: "ID debe ser un número válido" });

    const sessionUser = req.session.user;
    if (!sessionUser) return res.status(401).json({ message: "No autorizado" });

    const task = await taskRepo.findOne({
      where: { id: numericId, user: { id: sessionUser.id } },
      relations: ["user"],
    });

    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });

    await taskRepo.remove(task);
    res.json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar tarea", error });
  }
};