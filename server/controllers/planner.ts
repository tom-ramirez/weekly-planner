import { PrismaClient } from '@prisma/client'
import {Request, Response} from "express";

const prisma = new PrismaClient();

async function getPlanners(req: Request, res: Response) {
    const planners = await prisma.planner.findMany({
        select: {
            start_date: true,
            end_date: true,
            id: true
        }
    });
    return res.status(200).json(planners);
}

async function createPlanner(req: Request, res: Response) {
    const {start_date, end_date, user_id} = req.body;
    await prisma.planner.create({
        data: {
            start_date: new Date(start_date), end_date: new Date(end_date), user_id
        }})
    res.sendStatus(201)
}

async function updatePlanner(req: Request, res: Response) {
    const {start_date, end_date, user_id} = req.body;
    const{ plannerId } = req.params;
    await prisma.planner.update({
        where:{
            id: parseInt(plannerId)
        },
        data: {
            start_date: new Date(start_date), end_date: new Date(end_date), user_id
        }})
    return res.status(204);
}

async function getPlannerById(req: Request, res: Response) {
    const planner = await prisma.planner.findUnique({
        where: {
            id: parseInt(req.params.plannerId)
        },
        select: {
            start_date: true,
            end_date: true,
            id: true
        }
    });
    if (planner){
        return res.status(200).json(planner);}
    else {
        return res.sendStatus(404)
    }
}

async function deletePlannerById(req: Request, res: Response) {
    const {plannerId} = req.params;
    await prisma.planner.delete({
        where: {
            id: parseInt(plannerId)
        }
    });
    return res.sendStatus(204);
}

const plannersController= {
    getPlanners,
    createPlanner,
    updatePlanner,
    getPlannerById,
    deletePlannerById,
}

export  {
    plannersController
};
