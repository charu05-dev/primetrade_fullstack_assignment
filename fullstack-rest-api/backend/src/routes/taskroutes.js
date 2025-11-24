import express from "express";
import { auth } from "../middlewares/authMiddleware.js";
import { createTask, getTasks, deleteTask } from "../controllers/taskcontroller.js";

const router = express.Router();

router.post("/", auth, createTask);
router.get("/", auth, getTasks);
router.delete("/:id", auth, deleteTask);

export default router;
