import { Router } from "express";
import plannerController from "../controllers/planner";
import validate from "../utils/validation";
import { check } from "express-validator";

const plannerRouter = Router();
const controller = new plannerController();

plannerRouter.route("/").get(async (_req, res) => {
  const response = await controller.getPlanners();
  return res.send(response);
});

plannerRouter.route("/:plannerId").get(async (_req, res) => {
  const response = await controller.getPlannerById(_req.params.plannerId);
  return res.send(response);
});
plannerRouter
  .route("/")
  .post(
    [
      check("start_date").exists().isDate(),
      check("end_date").exists().isDate(),
      check("user_id").exists().isNumeric(),
    ],
    validate,
    async (_req, res) => {
      const response = await controller.createPlanner(_req.body);
      return res.send(response);
    }
  );
plannerRouter
  .route("/:plannerId")
  .put(
    [
      check("start_date").isDate(),
      check("end_date").isDate(),
      check("user_id"),
    ],
    validate,
    async (_req, res) => {
      const response = await controller.updatePlanner(
        _req.body,
        _req.params.plannerId
      );
      return res.send(response);
    }
  );
plannerRouter.route("/:plannerId").delete(async (_req, res) => {
  const response = await controller.deletePlannerById(_req.params.plannerId);
  return res.send(response);
});

export { plannerRouter };
