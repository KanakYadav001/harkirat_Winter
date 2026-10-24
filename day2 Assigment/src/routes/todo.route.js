import express from "express";

import todoRoutes from "../controller/todo.controller.js";



const router = express.Router();



router.post("/create", todoRoutes.createTodo);
router.get("/getAll", todoRoutes.getAllTodos);
router.get("/getById/:id", todoRoutes.getTodoById);
router.put("/update/:id", todoRoutes.updateTodo);
router.patch("/updateStatus/:id", todoRoutes.updateTodoStatus);
router.delete("/delete/:id", todoRoutes.deleteTodo);




export default router;




