import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { AppDataSource } from "../db/data-source";
import { User } from "../models/User";

const userRepository = AppDataSource.getRepository(User);

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existing = await userRepository.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: "El correo ya está registrado" });

    const hashed = await bcrypt.hash(password, 10);
    const user = userRepository.create({ name, email, password: hashed });
    await userRepository.save(user);

    res.json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el registro" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await userRepository.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Contraseña incorrecta" });

    req.session.user = { id: user.id, name: user.name, email: user.email };
    res.json({ message: "Inicio de sesión exitoso", user: req.session.user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

export const logoutUser = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Error al cerrar sesión" });
    res.json({ message: "Sesión cerrada correctamente" });
  });
};
