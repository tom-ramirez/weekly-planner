import express, { Request, Response } from "express";
import {plannerRouter, taskRouter, userRouter} from "./routers";

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) =>
    res.send("Hello World")
);

app.listen(port, () => console.log(`Application started on port: ${port}`));
app.use("/user", userRouter);
app.use("/planner", plannerRouter);
app.use("/task", taskRouter);
