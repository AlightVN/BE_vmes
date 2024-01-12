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
// Kiểm tra kết nối xog nhớ // hết
const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); 
    console.log('Database synchronized successfully.');
  } catch (err) {
    console.error('Error synchronizing database:', err);
  }
};

// Kiểm tra kết nối
sequelize
  .authenticate()
  .then(async () => {
    console.log('Connection has been established successfully.');
    if (process.env.SYNC_DB === 'true') {
      await syncDatabase();
    }
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
