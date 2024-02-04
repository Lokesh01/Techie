import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/tokenManager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.log(error);
    return res.json({ message: "ERROR", cause: error.message });
  }
};

export const userSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await hash(password, 10);

    // !check if user already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(401)
        .send("User already exist please try to login instead !");
    }

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = createToken(newUser._id.toString(), newUser.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res
      .status(201)
      .json({ message: "OK", name: newUser.name, email: newUser.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("User not registerd");
    }

    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      return res.status(401).send("Invalid password credentials!");
    }

    //* clearing the cookie after every login
    res.clearCookie(COOKIE_NAME, {
      domain: "localhost",
      httpOnly: true,
      signed: true,
      path: "/",
    });

    //* authorization logic with cookie and jwt
    const token = createToken(user._id.toString(), email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7); //* cookie will expire in 7 days from date of creation
    res.cookie(COOKIE_NAME, token, {
      path: "/", // cookie is set to the root path means valid for entire domain
      domain: "localhost", // todo: need to change in production
      expires,
      httpOnly: true,
      signed: true,
    });

    return res.status(200).json({ message: "OK", id: user._id.toString() });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
