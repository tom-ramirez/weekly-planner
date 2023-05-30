import { Router } from "express";

const taskRouter = Router();

taskRouter.route("/").get((req, res) => { res.send("Get every task") });
taskRouter.route("/:taskId").get((req, res) => { res.send("Get Single task" + req.params.taskId) });
taskRouter.route("/").post((req, res) => { res.send("Create task ") });
taskRouter.route("/:taskId").put((req, res) => { res.send("Update task" + req.params.taskId) });
taskRouter.route("/:taskId").delete((req, res) => { res.send("Delete task" + req.params.taskId) });

export { taskRouter };
