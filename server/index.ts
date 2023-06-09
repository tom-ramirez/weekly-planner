import express, { json, urlencoded, Request, Response } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import { authRouter, plannerRouter, taskRouter, userRouter } from "./routers";
import swaggerUI from "swagger-ui-express";
import morgan from "morgan";

const { verifyToken } = require("./middleware/authentication");

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
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(openapiSpecification));
app.use(
  "/docs",
  swaggerUI.serve,
  swaggerUI.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);
app.use("/swagger.json", (req: Request, res: Response) =>
  res.json(openapiSpecification).status(200)
);

app.use("/auth", authRouter);

app.all("*", verifyToken);

app.use("/user", userRouter);
app.use("/planner", plannerRouter);
app.use("/task", taskRouter);

app.listen(port, () => console.log(`Application started on port: ${port}`));
