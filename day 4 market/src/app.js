import express from "express";
import authRouter from "./routes/auth.route.js";
import marketRouter from "./routes/market.route.js";
import cookieParser from "cookie-parser";
import resolveRouter from "./routes/resolve.route.js";

const app = express();



app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/market", marketRouter);
app.use("/api/v1", resolveRouter);


export default app;