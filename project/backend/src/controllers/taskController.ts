import { Request, Response } from "express";
import { AppDataSource } from "../db/data-source";
import { Task } from "../models/Task";
import { User } from "../models/User";

const taskRepo = AppDataSource.getRepository(Task);
const userRepo = AppDataSource.getRepository(User);

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const sessionUser = req.session.user;
    if (!sessionUser) return res.status(401).json({ message: "No autorizado" });

    const user = await userRepo.findOneBy({ id: sessionUser.id });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const task = taskRepo.create({ title, description, user });
    await taskRepo.save(task);

    res.json({ message: "Tarea creada exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear tarea" });
  }
};

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
