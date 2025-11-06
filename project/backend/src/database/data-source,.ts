import 'reflect-metadata'
import { DataSource } from "typeorm";
import dotenv from 'dotenv'
import {User} from '../entities/User'
import {Task} from '../entities/Task'


dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST  || "localhost",
    port : Number(process.env.DB_PORT) || 5432,
    username : process.env.DB_NAME || 'postgres',
    password : process.env.DB_PASS || 'postgres',
    database :process.env.DB_NAME || 'postgres',
    synchronize : true, // en produccion usamos migraciones
    logging :false,
    entities : [User, Task],
})

