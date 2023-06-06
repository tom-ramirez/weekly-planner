import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

async function getTasks(req: Request, res: Response) {
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
  return res.status(200).json(tasks);
}

async function createTask(req: Request, res: Response) {
  const { title, description, due, accomplished, is_habit, planner_id } =
    req.body;
  await prisma.task.create({
    data: {
      title,
      description,
      due: new Date(due),
      accomplished,
      is_habit,
      planner_id,
    },
  });
  res.sendStatus(201);
}

async function updateTask(req: Request, res: Response) {
  const { title, description, due, accomplished, is_habit, planner_id } =
    req.body;
  const { taskId } = req.params;
  await prisma.task.update({
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
  return res.status(204);
}

async function getTaskById(req: Request, res: Response) {
  const task = await prisma.task.findUnique({
    where: {
      id: parseInt(req.params.taskId),
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
  if (task) {
    return res.status(200).json(task);
  } else {
    return res.sendStatus(404);
  }
}

async function deleteTaskById(req: Request, res: Response) {
  const { taskId } = req.params;
  await prisma.task.delete({
    where: {
      id: parseInt(taskId),
    },
  });
  return res.sendStatus(204);
}

const tasksController = {
  getTasks,
  createTask,
  updateTask,
  getTaskById,
  deleteTaskById,
};

export { tasksController };
