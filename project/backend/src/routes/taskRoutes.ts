import { Router } from "express";
import { createTask, getTasks } from "../controllers/taskController";
import { isAuthenticated } from "../middleware/auth";

const router = Router();

router.post("/", isAuthenticated, createTask);
router.get("/", isAuthenticated, getTasks);

export default router;
