import { Router } from "express";
import { check } from "express-validator";
import authController from "../controllers/auth";
import validate from "../utils/validation";

const authRouter = Router();
const controller = new authController();

authRouter.route("/").post(
  [
    check("email")
      .isLength({ min: 3 })
      .withMessage("the email must have minimum length of 3")
      .trim(),
    check("password")
      .isLength({ min: 8 })

      .withMessage("your password should have min and max length between 8-15"),
  ],
  validate,
  async (_req, res) => {
    const response = await controller.authenticate(_req.body);
    return response.error ? res.sendStatus(401) : res.send(response);
  }
);
/*
authRouter.route("/refresh").get(async (_req, res) => {
  const response = await controller.refresh(res.locals.user as number);
  return response.error ? res.sendStatus(401) : res.send(response);
});

  */

/*
authRouter.get("/", async (_req, res) => {
  const response = await controller.getAllUsers();
  return res.send(response);
});

 */
export { authRouter };
