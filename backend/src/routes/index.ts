import {Router} from "express";
import chatRouter from "./chatRoutes.js";
import userRouter from "./userRoutes.js";

const router = Router();

router.use("/user",userRouter);
router.use("/chat", chatRouter);

export default router;