import express from "express";
import dotenv from "dotenv";
import colors from "colors";
// import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();

//* middlewares
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
// app.use(morgan("dev")); // todo: remove this in production

app.use("/api", appRouter);

export default app;
