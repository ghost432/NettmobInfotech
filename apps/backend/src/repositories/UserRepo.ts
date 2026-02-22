import { TYPES } from "../types";
import { inject, injectable } from "inversify";
import { DatabaseService } from "../services/DatabaseService";

export interface User {
    id?: number;
    email: string;
    password?: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    createdAt?: Date;
}

@injectable()
export class UserRepo {
    constructor(@inject(TYPES.DatabaseService) private db: DatabaseService) { }

    public async findByEmail(email: string): Promise<User | null> {
        const rows = await this.db.query("SELECT * FROM users WHERE email = ?", [email]);
        return rows[0] || null;
    }

    public async findById(id: number): Promise<User | null> {
        const rows = await this.db.query("SELECT * FROM users WHERE id = ?", [id]);
        return rows[0] || null;
    }

    public async create(user: User): Promise<number> {
        const result = await this.db.query(
            "INSERT INTO users (email, password, firstName, lastName, isAdmin) VALUES (?, ?, ?, ?, ?)",
            [user.email, user.password, user.firstName, user.lastName, user.isAdmin ? 1 : 0]
        );
        return result.insertId;
    }

    public async findAll(): Promise<User[]> {
        return await this.db.query("SELECT id, email, firstName, lastName, isAdmin, createdAt FROM users ORDER BY createdAt DESC");
    }

    public async count(): Promise<number> {
        const rows = await this.db.query("SELECT COUNT(*) as count FROM users");
        return rows[0].count;
    }

    public async countAdmins(): Promise<number> {
        const rows = await this.db.query("SELECT COUNT(*) as count FROM users WHERE isAdmin = 1");
        return rows[0].count;
    }

    public async initTable() {
        await this.db.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                firstName VARCHAR(100) NOT NULL,
                lastName VARCHAR(100) NOT NULL,
                isAdmin TINYINT(1) DEFAULT 0,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
    }
}
