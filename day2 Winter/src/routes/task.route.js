import express from 'express'

import taskController from '../controller/task.controller.js'
import authMiddleware from '../middleware/auth.middleware.js'


const taskRouter = express.Router();

taskRouter.post("/", authMiddleware ,  taskController.createTask)
taskRouter.get("/:id", authMiddleware ,  taskController.getTask)
taskRouter.delete("/:id", authMiddleware , taskController.deleteTask)
taskRouter.put("/:id", authMiddleware , taskController.updateTask)

export default taskRouter


