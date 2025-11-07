import express, {Request, Response} from 'express';

const app = express();
app.use(express.json());

const port = 3000;

app.get('/', (req: Request, res: Response) => {
    res
        .status(200)
        .json('HELLO MAMA!!!!');
})



app.listen(port, () => {console.log(`Server started on port ${port}`)});