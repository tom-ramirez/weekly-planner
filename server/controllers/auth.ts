import { PrismaClient } from "@prisma/client";
import { Body, Get, Post, Route, Tags } from "tsoa";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();

type LoginFormType = {
  email: string;
  password: string;
};

type JWTResponse = {
  accessToken?: string;
  refreshToken?: string;
  error?: string;
};

@Route("auth")
@Tags("auth")
export default class authController {
  @Post()
  async authenticate(@Body() request: LoginFormType): Promise<JWTResponse> {
    const { email, password } = request;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      const passwordCorrect = await bcrypt.compare(password, user.password);
      if (passwordCorrect) {
        return {
          accessToken: jwt.sign({ sub: user.id }, "accessJWTSecret", {
            expiresIn: 1200,
          }),
          refreshToken: jwt.sign({ sub: user.id }, "refreshJWTSecret", {
            expiresIn: 1209600,
          }),
        };
      }
    }
    return { error: "Wrong username or password" };
  }

  async refresh(req: Request, res: Response): Promise<JWTResponse> {
    // @ts-ignore
    const userId = res.locals.user as number;

    var user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user) {
      return {
        accessToken: jwt.sign({ sub: user.id }, "accessJWTSecret", {
          expiresIn: 1200,
        }),
        refreshToken: jwt.sign({ sub: user.id }, "refreshJWTSecret", {
          expiresIn: 1209600,
        }),
      };
    }
    return { error: "Wrong username or password" };
  }

  /*
  @Get("/refresh")
  async refresh(userId: number): Promise<JWTResponse> {
    console.log("eureka", userId);
    var user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (user) {
      return {
        accessToken: jwt.sign({ sub: user.id }, "accessJWTSecret", {
          expiresIn: 1200,
        }),
        refreshToken: jwt.sign({ sub: user.id }, "refreshJWTSecret", {
          expiresIn: 1209600,
        }),
      };
    }
    return { error: "Something went wrong " };
  }
 */
}
