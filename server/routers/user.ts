import { Router } from "express";
import { check } from "express-validator";
import usersController from "../controllers/user";
import validate from "../utils/validation";

const userRouter = Router();
const controller = new usersController();
userRouter.get("/", async (_req, res) => {
  const response = await controller.getAllUsers();
  return res.send(response);
});

userRouter.route("/:userId").get(async (_req, res) => {
  const response = await controller.getUserById(_req.params.userId);
  return res.send(response);
});

userRouter.route("/").post(
  [
    check("password")
      .isLength({ min: 8 })
      .withMessage("your password should have min 8 characters")
      .matches(/\d/)
      .withMessage("your password should have at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("your password should have at least one special character"),
    check("first_name")
      .trim()
      .isLength({ min: 4 })
      .withMessage("the first name must have minimum length of 3"),
    check("second_name")
      .trim()
      .isLength({ min: 3 })
      .withMessage("the last name must have minimum length of 3"),
  ],
  validate,
  async (_req, res) => {
    const response = await controller.createUser(_req.body);
    return res.send(response);
  }
);

userRouter.route("/:userId").put(
  [
    check("password")
      .isLength({ min: 8 })
      .withMessage("your password should have min and max length between 8-15")
      .matches(/\d/)
      .withMessage("your password should have at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("your password should have at least one special character"),
    check("first_name")
      .trim()
      .isLength({ min: 4 })
      .withMessage("the first name must have minimum length of 3"),
    check("second_name")
      .trim()
      .isLength({ min: 3 })
      .withMessage("the last name must have minimum length of 3"),
  ],
  validate,
  async (_req, res) => {
    const response = await controller.updateUser(_req.body, _req.params.userId);
    return res.send(response);
  }
  //controller.updateUser
);
userRouter.route("/:userId").delete(async (_req, res) => {
  const response = await controller.deleteUserById(_req.params.userId);
  return res.send(response);
});

export { userRouter };
