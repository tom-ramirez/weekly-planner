import { Router } from "express";

const plannerRouter = Router();
plannerRouter.route("/").get((req, res) => { res.send("Get every planner") });
plannerRouter.route("/:plannerId").get((req, res) => { res.send("Get Single planner" + req.params.plannerId) });
plannerRouter.route("/").post((req, res) => { res.send("Create planner ") });
plannerRouter.route("/:plannerId").put((req, res) => { res.send("Update planner" + req.params.plannerId) });
plannerRouter.route("/:plannerId").delete((req, res) => { res.send("Delete planner" + req.params.plannerId) });

export { plannerRouter };
