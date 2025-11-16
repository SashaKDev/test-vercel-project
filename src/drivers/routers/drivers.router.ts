import express from "express";
import {getDriverListHandler} from "./handlers/get-driver-list.handler";
import {getDriverHandler} from "./handlers/get-driver.handler";
import {createDriverHandler} from "./handlers/create-driver.handler";


export const driversRouter = express.Router({});

driversRouter
    .get('', getDriverListHandler)

    .get('/:id', getDriverHandler)

    .post('', createDriverHandler)
