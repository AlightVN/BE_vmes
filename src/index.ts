// src/index.ts
import express from 'express';
import { Request, Response } from 'express';
import 'dotenv/config';
//router
import userRouter from './routes/userRouter';
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
  });

app.use('/users', userRouter);
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});