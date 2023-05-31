import express, { json, urlencoded, Request, Response } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import {plannerRouter, taskRouter, userRouter} from "./routers";
import swaggerUI from "swagger-ui-express";

const app = express();
const port = 3000;

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Weekly Planner",
        version: "1.0.0",
    },
    servers: [
        {
            url: "http://localhost:3000",
            description: "Local development server",
        },
    ],
};

const openapiSpecification = swaggerJSDoc({
    swaggerDefinition,

    apis: ["./routers/*.ts"],
});

app.get("/", (req: Request, res: Response) =>
    res.send("Hello World")
);

app.listen(port, () => console.log(`Application started on port: ${port}`));
app.use("/user", userRouter);
app.use("/planner", plannerRouter);
app.use("/task", taskRouter);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(openapiSpecification));
app.use("/swagger.json", (req: Request, res: Response) =>
    res.json(openapiSpecification).status(200)
);
app.use(json());
app.use(urlencoded({ extended: true }));