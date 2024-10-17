"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = require("../src/config/config"); // Adjust the path accordingly
const environment = process.env.NODE_ENV || 'development';
if (!config_1.config) {
    throw new Error('Config object is undefined.');
}
if (!config_1.config[environment]) {
    throw new Error(`Configuration for environment "${environment}" not found.`);
}
console.log(`Running in ${environment} mode`);
const dbConfig = config_1.config[environment];
const sequelize = new sequelize_typescript_1.Sequelize(dbConfig);
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        console.log("Database connection has been established successfully.");
        yield sequelize.sync();
        console.log("Migrations completed successfully.");
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
    finally {
        yield sequelize.close();
    }
}))();
