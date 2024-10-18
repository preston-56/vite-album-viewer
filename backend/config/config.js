"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
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
exports.config = config;
let sequelize;
exports.sequelize = sequelize;
if (process.env.DATABASE_URL) {
    exports.sequelize = sequelize = new sequelize_typescript_1.Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
    });
}
else {
    // Fallback to development configuration
    exports.sequelize = sequelize = new sequelize_typescript_1.Sequelize(config.development.database, config.development.username, config.development.password, {
        host: config.development.host,
        port: config.development.port,
        dialect: config.development.dialect,
    });
}
