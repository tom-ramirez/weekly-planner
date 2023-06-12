import { Router } from "express";
import tasksController from "../controllers/task";
import validate from "../utils/validation";
import { check } from "express-validator";

const taskRouter = Router();
const controller = new tasksController();

taskRouter.route("/").get(async (_req, res) => {
  const response = await controller.getTasks();
  return res.send(response);
});
taskRouter.route("/:taskId").get(async (_req, res) => {
  const response = await controller.getTaskById(_req.params.taskId);
  return res.send(response);
});
taskRouter
  .route("/")
  .post(
    [
      check("title").exists().isString(),
      check("description").exists().isString(),
      check("due").exists().isDate(),
      check("accomplished"),
      check("is_habit"),
      check("planner_id").exists().isNumeric(),
    ],
    validate,
    async (_req, res) => {
      const response = await controller.createTask(_req.body);
      return res.send(response);
    }
  );
taskRouter
  .route("/:taskId")
  .put(
    [
      check("title").exists().isString(),
      check("description").exists().isString(),
      check("due").exists().isDate(),
      check("accomplished").exists(),
      check("is_habit").exists(),
      check("planner_id").exists().isNumeric(),
    ],
    validate,
    async (_req, res) => {
      const response = await controller.updateTask(
        _req.body,
        _req.params.taskId
      );
      return res.send(response);
    }
  );
taskRouter.route("/:taskId").delete(async (_req, res) => {
  const response = await controller.deleteTaskById(_req.params.taskId);
  return res.send(response);
});

export { taskRouter };
