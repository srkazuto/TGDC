import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { AppDataSource } from "../db/data-source";
import { User } from "../models/User";

const userRepository = AppDataSource.getRepository(User);

//  Registrar usuario
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existing = await userRepository.findOne({ where: { email } });
    if (existing)
      return res.status(400).json({ message: "El correo ya está registrado" });

    const hashed = await bcrypt.hash(password, 10);
    const user = userRepository.create({ name, email, password: hashed });
    await userRepository.save(user);

    res.json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el registro" });
  }
};

//  Iniciar sesión
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await userRepository.findOne({ where: { email } });
    if (!user)
      return res.status(400).json({ message: "Usuario no encontrado" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    req.session.user = { id: user.id, name: user.name, email: user.email };
    res.json({ message: "Inicio de sesión exitoso", user: req.session.user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

//  Cerrar sesión
export const logoutUser = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Error al cerrar sesión" });
    res.json({ message: "Sesión cerrada correctamente" });
  });
};

//  Obtener todos los usuarios
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userRepository.find({
      select: ["id", "name", "email"], // ocultamos contraseñas
    });
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los usuarios", error });
  }
};

//  Obtener un usuario por ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id!);

    if (isNaN(numericId)) {
      return res.status(400).json({ message: "El ID debe ser un número válido" });
    }

    const user = await userRepository.findOne({
      where: { id: numericId },
      select: ["id", "name", "email"],
    });

    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el usuario", error });
  }
};

// Actualizar usuario
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id!);

    if (isNaN(numericId)) {
      return res.status(400).json({ message: "El ID debe ser un número válido" });
    }

    const { name, email, password } = req.body;
    const user = await userRepository.findOne({ where: { id: numericId } });

    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await userRepository.save(user);
    res.json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar usuario", error });
  }
};

//  Eliminar usuario
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id!);

    if (isNaN(numericId)) {
      return res.status(400).json({ message: "El ID debe ser un número válido" });
    }

    const user = await userRepository.findOne({ where: { id: numericId } });
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    await userRepository.remove(user);
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar usuario", error });
  }
};
