//validar metodo http
//validar el endpoint
import { Router } from "express";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/tasksControllers";

const taskRouter = Router();

//Todas las queries que llegan acá comienzan con "/api/tasks"

//Quiero todas las tareas: -> http://localhost:3000/api/tasks
taskRouter.get("/", getAllTasks);
taskRouter.post("/", createTask);
taskRouter.get("/:id", updateTask);
taskRouter.delete("/:id", deleteTask);

// taskRouter.post("/api/auth/login", () => {});

// taskRouter.post("/api/auth/register", () => {});

// taskRouter.listen(PORT, () => {
//   console.log(`Servidor en escucha por el puerto ${PORT}`);
// });

export { taskRouter };
