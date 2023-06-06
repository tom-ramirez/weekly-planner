import { Router } from "express";
import {plannersController} from "../controllers";
import validate from "../utils/validation";
import {check} from "express-validator";


const plannerRouter = Router();
plannerRouter.route("/").get(plannersController.getPlanners);
plannerRouter.route("/:plannerId").get(plannersController.getPlannerById);
plannerRouter.route("/").post(
    [
        check("start_date").exists().isDate(),
        check("end_date").exists().isDate(),
        check("user_id").exists().isNumeric(),
],
    validate,
    plannersController.createPlanner
);
plannerRouter.route("/:plannerId").put(
    [
        check("start_date")
            .isDate(),
        check("end_date")
            .isDate(),
        check("user_id"),
    ],
    validate,
    plannersController.updatePlanner
);
plannerRouter.route("/:plannerId").delete(plannersController.deletePlannerById);

export { plannerRouter };
