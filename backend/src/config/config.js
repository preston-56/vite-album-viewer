"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
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
// Create a Sequelize instance using the development config
const sequelize = new sequelize_typescript_1.Sequelize(config.development.database, config.development.username, config.development.password, {
    host: config.development.host,
    port: config.development.port,
    dialect: config.development.dialect,
});
exports.sequelize = sequelize;
