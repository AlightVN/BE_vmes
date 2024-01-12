// src/config/db.ts
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'postgres', 
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 5432),
  username:process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

export default sequelize;
