
import express from 'express'
import workspaceController from '../controller/workspace.controller.js'
import authMiddleware from '../middleware/auth.middleware.js'
const workspaceRouter = express.Router();


workspaceRouter.post("/", authMiddleware , workspaceController.createWorkspace)
workspaceRouter.get("/", authMiddleware , workspaceController.getWorkspace)
workspaceRouter.delete("/:id", authMiddleware , workspaceController.deteleWorkspace)



export default workspaceRouter
