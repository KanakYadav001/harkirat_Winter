import express from "express";
import { adminController } from "../controllers/admin.controller";
import { Middleware } from "../middleware/auth.middleware";
const adminRoute = express.Router();

adminRoute.use(Middleware.adminMiddleware);

adminRoute.post("/resolve", adminController.resolveMarket);

export default adminRoute;
