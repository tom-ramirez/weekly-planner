import { Router } from "express";

const userRouter = Router();

userRouter.route("/").get((req, res) => { res.send("Hello user") });
userRouter.route("/:userId").get((req, res) => { res.send("Get Single user" + req.params.userId) });
userRouter.route("/").post((req, res) => { res.send("Create user") });
userRouter.route("/:userId").put((req, res) => { res.send("Update user" + req.params.userId) });
userRouter.route("/:userId").delete((req, res) => { res.send("Delete user" + req.params.userId) });

export { userRouter };
