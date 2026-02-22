import { injectable } from "inversify";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({ override: true });

@injectable()
export class DatabaseService {
    private pool: mysql.Pool;

    constructor() {
        this.pool = mysql.createPool({
            host: process.env.DB_HOST || "localhost",
            user: process.env.DB_USER || "root",
            password: process.env.DB_PASSWORD || "",
            database: process.env.DB_NAME || "nettmob_db",
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
    }

    public async query(sql: string, params?: any[]): Promise<any> {
        const [results] = await this.pool.query(sql, params);
        return results;
    }

    public async getConnection(): Promise<mysql.PoolConnection> {
        return await this.pool.getConnection();
    }
}
