import express from "express";
import {createMarket ,  getAllMarkets ,betMarket , getBetsMarket } from "../controller/market.controller.js";
import {authMiddleware} from "../middleware/auth.middleware.js";
const marketRouter = express.Router();


marketRouter.post("/", authMiddleware , createMarket);
marketRouter.get("/", authMiddleware , getAllMarkets);
marketRouter.post("/bet", authMiddleware , betMarket);
marketRouter.get("/bets", authMiddleware , getBetsMarket);



export default marketRouter;