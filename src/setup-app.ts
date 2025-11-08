import express, {Express, Request, Response} from 'express';
import {driversRouter} from "./drivers/routers/drivers.router";
import {testingRouter} from "./testing/routers/testing.router";

export const setupApp = (app: Express) => {

    app.use(express.json());

    app.get("/", (req: Request, res: Response) => {
        res
            .status(200)
            .json({message: 'Hello World!'});
    })

    app.use('/drivers', driversRouter);
    app.use('/testing', testingRouter);

    return app;
}