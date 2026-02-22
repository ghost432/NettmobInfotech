import { injectable, inject } from "inversify";
import { TYPES } from "../types";
import { DatabaseService } from "../services/DatabaseService";

export interface MailingContact {
    id: number;
    email: string;
    name: string;
    createdAt: string;
}

@injectable()
export class MailingContactRepo {
    constructor(@inject(TYPES.DatabaseService) private db: DatabaseService) { }

    async initTable(): Promise<void> {
        await this.db.query(`
            CREATE TABLE IF NOT EXISTS mailing_contacts (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL UNIQUE,
                name VARCHAR(255) DEFAULT '',
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
    }

    async findAll(): Promise<MailingContact[]> {
        return this.db.query("SELECT * FROM mailing_contacts ORDER BY createdAt DESC");
    }

    async upsertMany(emails: string[], name = ""): Promise<number> {
        let inserted = 0;
        for (const email of emails) {
            const trimmed = email.trim().toLowerCase();
            if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) continue;
            const existing = await this.db.query(
                "SELECT id FROM mailing_contacts WHERE email = ?", [trimmed]
            );
            if (existing.length === 0) {
                await this.db.query(
                    "INSERT INTO mailing_contacts (email, name) VALUES (?, ?)", [trimmed, name]
                );
                inserted++;
            }
        }
        return inserted;
    }

    async deleteById(id: number): Promise<void> {
        await this.db.query("DELETE FROM mailing_contacts WHERE id = ?", [id]);
    }
}
