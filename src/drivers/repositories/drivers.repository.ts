import {Driver} from "../types/types";
import {db} from "../../db/in-memory.db";
import {WithId} from "mongodb";
import {driversCollection} from "../../db/mongo.db";


export const driversRepository = {
    findAll(): Driver[] {
        return db.drivers;
    },

    findById(id: number): Driver | null {
        const foundDriver = db.drivers.find(d => d.id === +id)
        if (!foundDriver) {
            return null;
        };
        return foundDriver;
    },

    async create(newDriver: Driver): Promise<WithId<Driver>> {
        const insertResult = await driversCollection.insertOne(newDriver);

        return { ...newDriver, _id: insertResult.insertedId };
    }
}