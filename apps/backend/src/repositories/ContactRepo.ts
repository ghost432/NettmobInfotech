import { TYPES } from "../types";
import { inject, injectable } from "inversify";
import { DatabaseService } from "../services/DatabaseService";

export interface ContactMessage {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    isRead: boolean;
    createdAt?: Date;
}

@injectable()
export class ContactRepo {
    constructor(@inject(TYPES.DatabaseService) private db: DatabaseService) { }

    public async create(msg: ContactMessage): Promise<number> {
        const result = await this.db.query(
            "INSERT INTO contacts (firstName, lastName, email, phone, subject, message) VALUES (?, ?, ?, ?, ?, ?)",
            [msg.firstName, msg.lastName, msg.email, msg.phone, msg.subject, msg.message]
        );
        return result.insertId;
    }

    public async findAll(): Promise<ContactMessage[]> {
        return await this.db.query("SELECT * FROM contacts ORDER BY createdAt DESC");
    }

    public async findPaginated(isRead: boolean | null, limit: number, offset: number): Promise<ContactMessage[]> {
        let sql = "SELECT * FROM contacts";
        const params: any[] = [];

        if (isRead !== null) {
            sql += " WHERE isRead = ?";
            params.push(isRead ? 1 : 0);
        }

        sql += " ORDER BY createdAt DESC LIMIT ? OFFSET ?";
        params.push(limit, offset);

        return await this.db.query(sql, params);
    }

    public async count(isRead: boolean | null): Promise<number> {
        let sql = "SELECT COUNT(*) as count FROM contacts";
        const params: any[] = [];

        if (isRead !== null) {
            sql += " WHERE isRead = ?";
            params.push(isRead ? 1 : 0);
        }

        const rows = await this.db.query(sql, params);
        return rows[0].count;
    }

    public async getUnreadCount(): Promise<number> {
        const rows = await this.db.query("SELECT COUNT(*) as count FROM contacts WHERE isRead = 0");
        return rows[0].count;
    }

    public async markAsRead(id: number): Promise<void> {
        await this.db.query("UPDATE contacts SET isRead = 1 WHERE id = ?", [id]);
    }

    public async initTable() {
        await this.db.query(`
            CREATE TABLE IF NOT EXISTS contacts (
                id INT AUTO_INCREMENT PRIMARY KEY,
                firstName VARCHAR(100) NOT NULL,
                lastName VARCHAR(100) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(50) NOT NULL,
                subject VARCHAR(255) NOT NULL,
                message TEXT NOT NULL,
                isRead TINYINT(1) DEFAULT 0,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
    }
}
