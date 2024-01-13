// src/index.ts
import express from 'express';
import { Request, Response } from 'express';
import 'dotenv/config';
//router
import Router from './routes/Router';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/test', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// Use Router under '/api'
app.use('/', Router);

// Error Handling
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

  
