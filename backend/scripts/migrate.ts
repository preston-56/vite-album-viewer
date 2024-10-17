import "reflect-metadata";
import { Sequelize } from "sequelize-typescript";
import { config } from "../src/config/config"; // Adjust the path accordingly
import { initModels } from "../src/models/index"; // Adjust according to your project structure

const environment = (process.env.NODE_ENV as 'development' | 'test' | 'production') || 'development';

if (!config) {
  throw new Error('Config object is undefined.');
}

if (!config[environment]) {
  throw new Error(`Configuration for environment "${environment}" not found.`);
}

console.log(`Running in ${environment} mode`);
const dbConfig = config[environment];

const sequelize = new Sequelize(dbConfig);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
    await sequelize.sync();
    console.log("Migrations completed successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  } finally {
    await sequelize.close();
  }
})();