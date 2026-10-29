import express from "express";
import {
  signup,
  signin,
  getProfile,
  addBalance,
  getBalance
} from "../controllers/user.controller.ts";



import { authMiddleware } from "../middleware/auth.middleware.ts";



const authRoute = express.Router();



authRoute.post("/auth/signup", signup);

authRoute.post("/auth/signin", signin);

authRoute.get("/profile", authMiddleware, getProfile);

authRoute.post("/onramp", addBalance);

authRoute.get('/balance' ,authMiddleware , getBalance)

export default authRoute;
