import 'reflect-metadata'
import { DataSource } from "typeorm";
import dotenv from 'dotenv'
import {User} from '../entities'
import {Task} from '../entities'


dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: ,
    port : ,
    username : ,
    password : ,
    database :,
    synchronize : true,
    logging :false,
    entities : [User, Task],
})

