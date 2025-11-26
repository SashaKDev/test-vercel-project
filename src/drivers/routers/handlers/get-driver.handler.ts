import {Request, Response} from "express";
import {Driver} from "../../types/types";
import {driversRepository} from "../../repositories/drivers.repository";

export const getDriverHandler = (req: Request, res: Response) => {

    const driver: Driver | null = driversRepository.findById(+req.params.id)
    if (!driver) {
        res.sendStatus(404);
        return;
    }
    res.status(200).json(driver);
}