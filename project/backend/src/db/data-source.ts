import 'reflect-metadata';
import { DataSource } from "typeorm";
import dotenv from 'dotenv';
import { User } from '../models/User';
import { Task } from '../models/Task';

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'admin',
  database: process.env.DB_NAME || 'postgres',
  synchronize: true, // solo para desarrollo
  logging: false,
  entities: [User, Task],
});

AppDataSource.initialize()
  .then(() => console.log("✅ Conexión a PostgreSQL exitosa"))
  .catch((error) => console.error("❌ Error al conectar la base de datos:", error));
