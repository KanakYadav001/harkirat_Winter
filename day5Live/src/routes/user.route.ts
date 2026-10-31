import express from "express";
import { authController } from "../controllers/user.controller.ts";

import { Middleware } from "../middleware/auth.middleware.ts";

const authRoute = express.Router();

authRoute.post("/auth/signup", authController.signup);

authRoute.post("/auth/signin", authController.signin);

authRoute.use(Middleware.authMiddleware);

authRoute.get("/profile", authController.getProfile);

authRoute.post("/onramp", authController.addBalance);

authRoute.get("/balance", authController.getBalance);

export default authRoute;
