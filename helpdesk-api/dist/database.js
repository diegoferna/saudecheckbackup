"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knex = exports.config = void 0;
const knex_1 = require("knex");
const env_1 = require("./env");
exports.config = {
    client: 'mssql',
    connection: {
        database: 'Checklist',
        server: 'localhost',
        // host: '127.0.0.1',
        user: 'checklist',
        password: '123456',
        filename: env_1.env.DATABASE_URL,
        connectionTimeout: 30000,
        options: {
            encrypt: false,
            trustedConnection: true
        },
    },
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: './db/migrations'
    }
};
exports.knex = (0, knex_1.knex)(exports.config);
