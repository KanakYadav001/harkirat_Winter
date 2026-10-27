import express from "express";
import authRouter from "./routes/auth.route.js";
import marketRouter from "./routes/market.route.js";
import walletRouter from "./routes/wallet.route.js";
import cookieParser from "cookie-parser";


const app = express();



app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/market", marketRouter);
app.use("/api/wallet", walletRouter);


export default app;