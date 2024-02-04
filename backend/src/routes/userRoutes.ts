import { Router } from "express";
import { getAllUsers, userLogin, userSignUp } from "../controllers/userController.js";
import { loginValidator, signupValidator, validate } from "../utils/validators.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup",validate(signupValidator), userSignUp);
userRouter.post("/login",validate(loginValidator),userLogin)

export default userRouter;
