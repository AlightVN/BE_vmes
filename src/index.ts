// src/index.ts
import express from 'express';
import sequelize from './config/database';
import { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
  });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});