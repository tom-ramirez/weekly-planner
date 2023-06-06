import { PrismaClient } from '@prisma/client'
import {Request, Response} from "express";

const prisma = new PrismaClient();

async function getUsers(req: Request, res: Response) {
    const users = await prisma.user.findMany({
        select: {
            first_name: true,
            second_name: true,
            id: true
        }
    });
    return res.status(200).json(users);
}

async function createUser(req: Request, res: Response) {
    const {first_name, second_name, password} = req.body;
    await prisma.user.create({
        data: {
            first_name, second_name, password, active: true
        }})
    return res.sendStatus(201)
}

async function updateUser(req: Request, res: Response) {
    const {first_name, second_name, password, active} = req.body;
    const{ userId } = req.params;
    await prisma.user.update({
        where:{
            id: parseInt(userId)
        },
        data: {
            first_name, second_name, password, active
        }})
    return res.status(204)
}

async function getUserById(req: Request, res: Response) {
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(req.params.userId)
        },
        select: {
            first_name: true,
            second_name: true,
            id: true,
            active: true
        }
    });
    if (user){
        return res.status(200).json(user);}
    else {
        return res.sendStatus(404)
    }
}

async function deleteUserById(req: Request, res: Response) {
    const {userId} = req.params;
    await prisma.user.delete({
        where: {
            id: parseInt(userId)
        }
    })
    return res.sendStatus(204)
}

const usersController= {
    getUsers,
    createUser,
    updateUser,
    getUserById,
    deleteUserById,
}

export  {
    usersController
};
