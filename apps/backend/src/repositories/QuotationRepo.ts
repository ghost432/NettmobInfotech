import { TYPES } from "../types";
import { inject, injectable } from "inversify";
import { DatabaseService } from "../services/DatabaseService";

export interface QuotationRequest {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    services: string; // JSON string of selected services
    budget: string;
    timeline: string;
    details: string;
    isRead: boolean;
    createdAt?: Date;
}

@injectable()
export class QuotationRepo {
    constructor(@inject(TYPES.DatabaseService) private db: DatabaseService) { }

    public async create(q: any): Promise<number> {
        const result = await this.db.query(
            "INSERT INTO quotations (firstName, lastName, email, phone, company, services, budget, timeline, details) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [q.firstName, q.lastName, q.email, q.phone, q.company, JSON.stringify(q.services), q.budget, q.timeline, q.details]
        );
        return result.insertId;
    }

    public async findPaginated(isRead: boolean | null, limit: number, offset: number): Promise<QuotationRequest[]> {
        let sql = "SELECT * FROM quotations";
        const params: any[] = [];

        if (isRead !== null) {
            sql += " WHERE isRead = ?";
            params.push(isRead ? 1 : 0);
        }

        sql += " ORDER BY createdAt DESC LIMIT ? OFFSET ?";
        params.push(limit, offset);

        const rows = await this.db.query(sql, params);
        return rows.map((r: any) => ({
            ...r,
            services: JSON.parse(r.services || "[]")
        }));
    }

    public async count(isRead: boolean | null): Promise<number> {
        let sql = "SELECT COUNT(*) as count FROM quotations";
        const params: any[] = [];

        if (isRead !== null) {
            sql += " WHERE isRead = ?";
            params.push(isRead ? 1 : 0);
        }

        const rows = await this.db.query(sql, params);
        return rows[0].count;
    }

    public async getUnreadCount(): Promise<number> {
        const rows = await this.db.query("SELECT COUNT(*) as count FROM quotations WHERE isRead = 0");
        return rows[0].count;
    }

    public async markAsRead(id: number): Promise<void> {
        await this.db.query("UPDATE quotations SET isRead = 1 WHERE id = ?", [id]);
    }

    public async initTable() {
        await this.db.query(`
            CREATE TABLE IF NOT EXISTS quotations (
                id INT AUTO_INCREMENT PRIMARY KEY,
                firstName VARCHAR(100) NOT NULL,
                lastName VARCHAR(100) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(50) NOT NULL,
                company VARCHAR(200),
                services TEXT,
                budget VARCHAR(100),
                timeline VARCHAR(100),
                details TEXT,
                isRead TINYINT(1) DEFAULT 0,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
    }
}
