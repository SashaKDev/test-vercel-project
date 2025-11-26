import {MongoClient, Db, Collection} from "mongodb";
import {Driver} from "../drivers/types/types";


export let client: MongoClient;
export let driversCollection: Collection<Driver>;

export const runDb = async (dbUrl: string) => {

    client = new MongoClient(dbUrl);

    const db: Db = client.db('incubator-db');

    driversCollection = db.collection('drivers');

    try {
        await client.connect();
        await db.command({ping: 1});
        console.log('Connected to MongoDB');
    } catch (e) {
        await client.close();
        console.log(e);
    }
}