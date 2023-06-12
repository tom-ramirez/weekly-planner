import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Body, Delete, Get, Post, Put, Route, Tags } from "tsoa";

const prisma = new PrismaClient();
type TaskType = {
  id?: number;
  title: string;
  description: string;
  due: Date;
  accomplished: boolean;
  is_habit: boolean;
  planner?: {
    id: number;
    start_date: Date;
    end_date: Date;
    user_id: number;
  };
  planner_id?: number;
};

@Route("task")
@Tags("task")
export default class tasksController {
  @Get("/")
  public async getTasks(): Promise<{
    data: TaskType[];
  }> {
    const tasks = await prisma.task.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        due: true,
        accomplished: true,
        is_habit: true,
        planner: true,
      },
    });
    return { data: tasks };
  }

  @Get("{taskId}")
  public async getTaskById(taskId: string): Promise<{
    data: TaskType;
  }> {
    const task = await prisma.task.findUnique({
      where: {
        id: parseInt(taskId),
      },
      select: {
        id: true,
        title: true,
        description: true,
        due: true,
        accomplished: true,
        is_habit: true,
        planner: true,
      },
    });
    return { data: task };
  }

  @Post()
  public async createTask(
    @Body() request: TaskType
  ): Promise<{ data: TaskType }> {
    const { title, description, due, accomplished, is_habit, planner_id } =
      request;
    const task = await prisma.task.create({
      data: {
        title,
        description,
        due: new Date(due),
        accomplished,
        is_habit,
        planner_id,
      },
    });
    return {
      data: task,
    };
  }

  @Put("{taskId}")
  public async updateTask(
    @Body() request: TaskType,
    taskId: string
  ): Promise<{
    data: TaskType;
  }> {
    const { title, description, due, accomplished, is_habit, planner_id } =
      request;
    const task = await prisma.task.update({
      where: {
        id: parseInt(taskId),
      },

      data: {
        title,
        description,
        due: new Date(due),
        accomplished,
        is_habit,
        planner_id,
      },
    });
    return {
      data: task,
    };
  }

  @Delete("{taskId}")
  public async deleteTaskById(taskId: string): Promise<{
    data: TaskType;
  }> {
    const task = await prisma.task.delete({
      where: {
        id: parseInt(taskId),
      },
    });
    return {
      data: task,
    };
  }
}
