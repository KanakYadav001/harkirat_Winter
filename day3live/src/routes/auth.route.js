import express from "express";
import authController from "../controller/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
const authRouter = express.Router();

authRouter.post("/register",authController.register) 
authRouter.post("/login",authController.login)

authRouter.get("/getuser", authMiddleware , authController.getUser)
          

export default authRouter;