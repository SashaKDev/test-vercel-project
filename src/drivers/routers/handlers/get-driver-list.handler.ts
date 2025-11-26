import {Request, Response} from "express";
import {db} from "../../../db/in-memory.db";
import {Driver} from "../../types/types";
import {driversRepository} from "../../repositories/drivers.repository";


export const getDriverListHandler = (req: Request, res: Response) => {
    const foundDrivers: Driver[] = driversRepository.findAll();
    res.status(200).json(foundDrivers);
}