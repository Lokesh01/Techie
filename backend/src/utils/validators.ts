import { NextFunction, Request, Response } from "express";
import { ValidationChain, body, validationResult } from "express-validator";

export const loginValidator = [
  body("email").trim().isEmail().withMessage("Incorrect format form email"),
  body("password")
    .trim() //* removes trailing and leading whitespaces
    .isLength({ min: 8 })
    .withMessage("Incorrect format for password"),
];

export const signupValidator = [
  body("name").notEmpty().withMessage("Name field is required"),
  ...loginValidator,
];

export const chatCompletionValidator = [
  body("message").notEmpty().withMessage("Message  is required"),
];

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) break;
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return res.status(422).json({ errors: errors.array() }); //* 422 unprocessable entity
  };
};
