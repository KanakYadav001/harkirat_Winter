import express from "express";

import { marketController } from "../controllers/market.controller";

import { Middleware } from "../middleware/auth.middleware";

const marketRoute = express.Router();

marketRoute.use(Middleware.authMiddleware);

marketRoute.post("/", marketController.createMarket);
marketRoute.get("/", marketController.getMarkrt);
marketRoute.post("/createOrder", marketController.createOrder);
marketRoute.get("/orderBook", marketController.getOrderBook);

export default marketRoute;
