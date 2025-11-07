import express, {Request, Response} from 'express';

const app = express();
app.use(express.json());

const port = 3000;

app.get('/', (req: Request, res: Response) => {
    res
        .status(200)
        .json('<h1>HELLO VLADIK!!!!</h1>>');
})



app.listen(port, () => {console.log(`Server started on port ${port}`)});