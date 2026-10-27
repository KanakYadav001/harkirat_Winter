import express from "express";
import {registerUser , loginUser , getUserDetails , getTransaction , addFunds} from "../controller/auth.controller.js";
import {authMiddleware} from "../middleware/auth.middleware.js";
const authRouter = express.Router();




authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);

authRouter.get("/profile", authMiddleware , getUserDetails);
authRouter.get("/transactions",authMiddleware, getTransaction);



authRouter.post("/onramp", addFunds);


export default authRouter;




