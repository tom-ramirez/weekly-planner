import { Router } from "express";
import { tasksController } from "../controllers";
import validate from "../utils/validation";
import { check } from "express-validator";

const taskRouter = Router();

taskRouter.route("/").get(tasksController.getTasks);
taskRouter.route("/:taskId").get(tasksController.getTaskById);
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
    tasksController.createTask
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
    tasksController.updateTask
  );
taskRouter.route("/:taskId").delete(tasksController.deleteTaskById);

export { taskRouter };
