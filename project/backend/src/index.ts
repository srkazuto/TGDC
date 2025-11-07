import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import { AppDataSource } from './db/data-source';
import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';
import { logger } from './middleware/logger';

dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(logger);

app.use(
  session({
    secret: 'mi-secreto',
    resave: false,
    saveUninitialized: false,
  })
);

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Base de datos conectada");

    // Rutas
    app.use("/api/users", userRoutes);
    app.use("/api/tasks", taskRoutes);

    app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
  })
  .catch((err) => console.error("❌ Error al conectar la base de datos:", err));
