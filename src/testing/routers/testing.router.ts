import express, {Router,Request, Response} from "express";
import {db} from "../../db/in-memory.db";


export const testingRouter = Router({});

testingRouter.delete('/all-data', (req: Request, res: Response) => {
    db.drivers = [];
    res.sendStatus(204);
});