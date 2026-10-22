import express from "express";

import authController from "../controller/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register",authController.registerUser);
authRouter.post("/login",authController.loginUser);
authRouter.get("/getUser/:id", authMiddleware ,authController.getUser);



export default authRouter;

