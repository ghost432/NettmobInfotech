import { TYPES } from "../types";
import { inject, injectable } from "inversify";
import { DatabaseService } from "../services/DatabaseService";

export interface ProjectSpecification {
    id?: number;
    companyName: string;
    contactName: string;
    email: string;
    phone: string;
    projectType: string;
    otherProjectType?: string;
    description: string;
    budget?: string;
    deadline?: string;
    startDate?: string;
    status: 'unread' | 'read' | 'archived';
    createdAt?: Date;
}

@injectable()
export class SpecificationsRepo {
    constructor(@inject(TYPES.DatabaseService) private db: DatabaseService) { }

    public async create(spec: ProjectSpecification): Promise<number> {
        const result = await this.db.query(
            "INSERT INTO project_specifications (companyName, contactName, email, phone, projectType, otherProjectType, description, budget, deadline, startDate, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'unread')",
            [spec.companyName, spec.contactName, spec.email, spec.phone, spec.projectType, spec.otherProjectType, spec.description, spec.budget, spec.deadline, spec.startDate]
        );
        return result.insertId;
    }

    public async findAll(): Promise<ProjectSpecification[]> {
        return await this.db.query("SELECT * FROM project_specifications ORDER BY createdAt DESC");
    }

    public async findPaginated(status: string | null, limit: number, offset: number): Promise<ProjectSpecification[]> {
        let sql = "SELECT * FROM project_specifications";
        const params: any[] = [];

        if (status) {
            // If status is 'archive', we might want 'archived' status. 
            // If status is 'recent', we might want 'unread' OR 'read' but not 'archived' or just 'unread'?
            // Let's stick to the pattern in ContactRepo if possible, or adapt.
            // The prompt asked for "archive et recent". 
            // Let's assume 'recent' = unread + read (active), 'archive' = archived.
            if (status === 'archived') {
                sql += " WHERE status = 'archived'";
            } else if (status === 'recent') {
                sql += " WHERE status != 'archived'";
            } else {
                // specific status search if needed
                sql += " WHERE status = ?";
                params.push(status);
            }
        }

        sql += " ORDER BY createdAt DESC LIMIT ? OFFSET ?";
        params.push(limit, offset);

        return await this.db.query(sql, params);
    }

    public async count(status: string | null): Promise<number> {
        let sql = "SELECT COUNT(*) as count FROM project_specifications";
        const params: any[] = [];

        if (status) {
            if (status === 'archived') {
                sql += " WHERE status = 'archived'";
            } else if (status === 'recent') {
                sql += " WHERE status != 'archived'";
            } else {
                sql += " WHERE status = ?";
                params.push(status);
            }
        }

        const rows = await this.db.query(sql, params);
        return rows[0].count;
    }

    public async getUnreadCount(): Promise<number> {
        const rows = await this.db.query("SELECT COUNT(*) as count FROM project_specifications WHERE status = 'unread'");
        return rows[0].count;
    }

    public async updateStatus(id: number, status: 'read' | 'archived'): Promise<void> {
        await this.db.query("UPDATE project_specifications SET status = ? WHERE id = ?", [status, id]);
    }

    public async initTable() {
        await this.db.query(`
            CREATE TABLE IF NOT EXISTS project_specifications (
                id INT AUTO_INCREMENT PRIMARY KEY,
                companyName VARCHAR(255) NOT NULL,
                contactName VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(50) NOT NULL,
                projectType VARCHAR(100) NOT NULL,
                otherProjectType VARCHAR(255),
                description TEXT NOT NULL,
                budget VARCHAR(100),
                deadline VARCHAR(100),
                startDate VARCHAR(100),
                status ENUM('unread', 'read', 'archived') DEFAULT 'unread',
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
    }
}
