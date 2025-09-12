"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
// src/config/db.ts
require("dotenv/config");
const pg_1 = require("pg");
const node_postgres_1 = require("drizzle-orm/node-postgres");
const schema_1 = require("../config/schema");
const isProduction = process.env.NODE_ENV === 'production';
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: isProduction ? { rejectUnauthorized: false } : false,
});
exports.db = (0, node_postgres_1.drizzle)(pool, { schema: schema_1.schema });
