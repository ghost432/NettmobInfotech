import { TYPES } from "../types";
import { inject, injectable } from "inversify";
import { DatabaseService } from "../services/DatabaseService";

export interface BlogPost {
    id?: number;
    title: string;
    slug: string;
    content: string;
    imageUrl: string;
    category: string;
    author: string;
    usefulCount?: number;
    notUsefulCount?: number;
    createdAt?: Date;
}

@injectable()
export class BlogRepo {
    constructor(@inject(TYPES.DatabaseService) private db: DatabaseService) { }

    private slugify(text: string): string {
        return text
            .toString()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/--+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
    }

    public async findAll(limit: number, offset: number): Promise<BlogPost[]> {
        const rows = await this.db.query(
            "SELECT * FROM blog ORDER BY createdAt DESC LIMIT ? OFFSET ?",
            [limit, offset]
        );
        return rows;
    }

    public async findById(id: number): Promise<BlogPost | null> {
        const rows = await this.db.query("SELECT * FROM blog WHERE id = ?", [id]);
        return rows.length > 0 ? rows[0] : null;
    }

    public async findBySlug(slug: string): Promise<BlogPost | null> {
        const rows = await this.db.query("SELECT * FROM blog WHERE slug = ?", [slug]);
        return rows.length > 0 ? rows[0] : null;
    }

    public async create(p: BlogPost): Promise<number> {
        const slug = p.slug || this.slugify(p.title);
        const result = await this.db.query(
            "INSERT INTO blog (title, slug, content, imageUrl, category, author) VALUES (?, ?, ?, ?, ?, ?)",
            [p.title, slug, p.content, p.imageUrl, p.category, p.author || "L'équipe NettmobInfotech"]
        );
        return result.insertId;
    }

    public async update(id: number, p: Partial<BlogPost>): Promise<void> {
        const sets: string[] = [];
        const params: any[] = [];

        if (p.title) {
            sets.push("title = ?"); params.push(p.title);
            if (!p.slug) {
                sets.push("slug = ?"); params.push(this.slugify(p.title));
            }
        }
        if (p.slug) { sets.push("slug = ?"); params.push(p.slug); }
        if (p.content) { sets.push("content = ?"); params.push(p.content); }
        if (p.imageUrl) { sets.push("imageUrl = ?"); params.push(p.imageUrl); }
        if (p.category) { sets.push("category = ?"); params.push(p.category); }
        if (p.author) { sets.push("author = ?"); params.push(p.author); }

        if (sets.length === 0) return;

        params.push(id);
        await this.db.query(`UPDATE blog SET ${sets.join(", ")} WHERE id = ?`, params);
    }

    public async delete(id: number): Promise<void> {
        await this.db.query("DELETE FROM blog WHERE id = ?", [id]);
    }

    public async count(): Promise<number> {
        const rows = await this.db.query("SELECT COUNT(*) as count FROM blog");
        return rows[0].count;
    }

    public async addFeedback(id: number, isUseful: boolean): Promise<void> {
        const field = isUseful ? "usefulCount" : "notUsefulCount";
        await this.db.query(`UPDATE blog SET ${field} = ${field} + 1 WHERE id = ?`, [id]);
    }

    public async initTable() {
        await this.db.query(`
            CREATE TABLE IF NOT EXISTS blog (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                slug VARCHAR(255) UNIQUE NOT NULL,
                content LONGTEXT NOT NULL,
                imageUrl LONGTEXT,
                category VARCHAR(100) NOT NULL,
                author VARCHAR(100) DEFAULT "L'équipe NettmobInfotech",
                usefulCount INT DEFAULT 0,
                notUsefulCount INT DEFAULT 0,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX (slug)
            )
        `);
    }
}
