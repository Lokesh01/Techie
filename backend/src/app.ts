import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";

dotenv.config();
const app = express();

//* middlewares
app.use(express.json());
app.use(morgan("dev")); // todo: remove this in production

app.get("/", (req, res, next) => {
  res.send("send the response");
});

export default app;
