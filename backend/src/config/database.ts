import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const dbName = process.env.DB_NAME || ''; 
const dbUser = process.env.DB_USER || '';
const dbPassword = process.env.DB_PASSWORD || '';
const dbHost = process.env.DB_HOST || 'localhost'; 
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'postgres',
});

export const dbConfig = {
  development: {
    username: dbUser,
    password: dbPassword,
    database: dbName,
    host: dbHost,
    dialect: 'postgres',
  },
};

export default sequelize;
