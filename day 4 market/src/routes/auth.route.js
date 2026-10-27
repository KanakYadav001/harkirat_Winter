import express from "express";
import {registerUser , loginUser , getUserDetails , getTransaction , addFunds} from "../controller/auth.controller.js";
const authRouter = express.Router();




authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/profile", getUserDetails);
authRouter.get("/transactions", getTransaction);
authRouter.post("/onramp", addFunds);


export default authRouter;




