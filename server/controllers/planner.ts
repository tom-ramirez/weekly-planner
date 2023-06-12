import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Body, Delete, Get, Path, Post, Put, Route, Tags } from "tsoa";

const prisma = new PrismaClient();

type PlannerType = {
  id: number;
  start_date: Date;
  end_date: Date;
  user_id?: number;
  user?: any;
  task?: {
    id: number;
    title: string;
    description: string;
    due: Date;
    accomplished: boolean;
    is_habit: boolean;
  }[];
};

@Route("planner")
@Tags("planner")
export default class plannerController {
  @Get("/")
  async getPlanners(): Promise<{
    data: PlannerType[];
  }> {
    const planners = await prisma.planner.findMany({
      select: {
        start_date: true,
        end_date: true,
        id: true,
        task: true,
      },
    });

    return {
      data: planners,
    };
  }

  @Get("{plannerId}")
  async getPlannerById(plannerId: string): Promise<{
    data: PlannerType;
  }> {
    const planner = await prisma.planner.findUnique({
      where: {
        id: parseInt(plannerId),
      },
      select: {
        start_date: true,
        end_date: true,
        id: true,
        task: true,
      },
    });
    return {
      data: planner,
    };
  }

  @Post()
  async createPlanner(@Body() request: PlannerType): Promise<{
    data: PlannerType;
  }> {
    const { start_date, end_date, user_id } = request;
    const planner = await prisma.planner.create({
      data: {
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        user_id,
      },
    });
    return {
      data: planner,
    };
  }

  @Put("{plannerId}")
  async updatePlanner(
    @Body() request: PlannerType,
    plannerId: string
  ): Promise<{
    data: PlannerType;
  }> {
    const { start_date, end_date, user_id } = request;
    const planner = await prisma.planner.update({
      where: {
        id: parseInt(plannerId),
      },
      data: {
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        user_id,
      },
    });
    return { data: planner };
  }

  @Delete("{plannerId}")
  async deletePlannerById(plannerId: string): Promise<{
    data: PlannerType;
  }> {
    const planner = await prisma.planner.delete({
      where: {
        id: parseInt(plannerId),
      },
    });
    return { data: planner };
  }
}
