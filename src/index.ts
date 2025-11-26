import express from 'express';
import { setupApp } from './setup-app';
import {runDb} from "./db/mongo.db";

const bootstrap = async () => {
    const app = express();
    setupApp(app);

    const PORT = 5001;
    try{

            await runDb('mongodb+srv://root:12344321$@cluster0.gcyvrjh.mongodb.net/?appName=Cluster0');

    } catch(err){
        console.log(err);
    }


    app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)});

    return app;
}

bootstrap();
