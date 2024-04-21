import express from "express";
import dotenv from "dotenv";
import colors from "colors";
// import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

dotenv.config();
const app = express();
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

//* middlewares
app.use(cors({ origin: String(process.env.CLIENT_URL), credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
// app.use(morgan("dev")); // todo: remove this in production

//* serving static frontend
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api", appRouter);

export default app;
