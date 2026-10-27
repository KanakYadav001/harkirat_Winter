import express from "express";

import { resolveMarket } from "../controller/resolve.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const resolveRouter = express.Router();


resolveRouter.post("/resolve",authMiddleware , resolveMarket);


export default resolveRouter;