import { PrismaClient } from "@prisma/client";
import { Body, Delete, Get, Path, Post, Put, Route, Tags } from "tsoa";
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

type UserType = {
  id?: number;
  first_name: string;
  second_name?: string;
  email?: string;
  last_name?: string;
  password?: string;
  active?: boolean;
};

@Route("user")
@Tags("User")
export default class usersController {
  @Get("/")
  public async getAllUsers(): Promise<{
    data: UserType[];
  }> {
    const users = await prisma.user.findMany({
      select: {
        first_name: true,
        second_name: true,

        id: true,
      },
    });

    return {
      data: users,
    };
  }
  @Get("{userId}")
  public async getUserById(userId: string): Promise<{
    data: UserType;
  }> {
    console.log("Hello there");
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
      select: {
        first_name: true,
        second_name: true,
        id: true,
        active: true,
      },
    });

    return {
      data: user,
    };
  }

  @Post()
  public async createUser(@Body() request: UserType): Promise<{
    data: UserType;
  }> {
    const { first_name, second_name, password, email, last_name } = request;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        first_name,
        second_name,
        email,
        last_name,
        password: hashedPassword,
        active: true,
      },
    });
    return {
      data: user,
    };
  }

  @Put("{userId}")
  public async updateUser(
    @Body() request: UserType,
    userId: string
  ): Promise<{
    data: UserType;
  }> {
    const { first_name, second_name, password, active } = request;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.update({
      where: {
        id: parseInt(userId),
      },
      data: {
        first_name,
        second_name,
        password: hashedPassword,
        active,
      },
    });
    return {
      data: user,
    };
  }

  @Delete("{userId}")
  public async deleteUserById(userId: string): Promise<{
    data: UserType;
  }> {
    const user = await prisma.user.delete({
      where: {
        id: parseInt(userId),
      },
    });
    return {
      data: user,
    };
  }
}
