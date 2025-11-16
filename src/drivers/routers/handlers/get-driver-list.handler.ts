import {Request, Response} from "express";
import {db} from "../../../db/in-memory.db";


export const getDriverListHandler = (req: Request, res: Response) => {
    res.status(200).json(db.drivers);
}