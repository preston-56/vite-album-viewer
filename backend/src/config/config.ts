import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';

dotenv.config();

interface DBConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: 'postgres' | 'mysql' | 'sqlite' | 'mariadb' | 'mssql'; // Add other dialects as needed
}

interface Config {
  development: DBConfig;
  test: DBConfig;
  production: DBConfig;
}

const config: Config = {
  development: {
    username: process.env.DB_USER || 'default_user',
    password: process.env.DB_PASSWORD || 'default_password',
    database: process.env.DB_NAME || 'albumviewerdb',
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres'
  },
  test: {
    username: process.env.DB_USER || 'default_user',
    password: process.env.DB_PASSWORD || 'default_password',
    database: process.env.DB_NAME || 'test_db',
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres'
  },
  production: {
    username: process.env.DB_USER || 'default_user',
    password: process.env.DB_PASSWORD || 'default_password',
    database: process.env.DB_NAME || 'prod_db',
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres'
  }
};

// Create a Sequelize instance using the development config
const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: config.development.host,
  port: config.development.port,
  dialect: config.development.dialect,
});

export { sequelize, config };
