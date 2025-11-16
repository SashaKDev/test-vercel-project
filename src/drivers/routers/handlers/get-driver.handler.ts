import {Request, Response} from "express";
import {db} from "../../../db/in-memory.db";

export const getDriverHandler = (req: Request, res: Response) => {

    const foundDriver = db.drivers.find(d => d.id === +req.params.id);
    if (!foundDriver) {
        res.sendStatus(404);
        return;
    }
    res
        .status(200)
        .json(foundDriver);
}