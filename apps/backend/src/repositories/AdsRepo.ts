import { TYPES } from "../types";
import { inject, injectable } from "inversify";
import { DatabaseService } from "../services/DatabaseService";

export type AdFormat = "square" | "rectangle" | "vertical" | "horizontal";
export type AdPage = "home" | "expertise" | "service-detail" | "services" | "actus" | "devis" | "cahier";

export interface Ad {
    id?: number;
    title: string;
    description: string;
    imageUrl: string;
    buttonText: string;
    buttonUrl: string;
    format: AdFormat;
    pages: AdPage[];
    isActive: boolean;
    createdAt?: Date;
}

@injectable()
export class AdsRepo {
    constructor(@inject(TYPES.DatabaseService) private db: DatabaseService) { }

    public async initTable(): Promise<void> {
        await this.db.query(`
            CREATE TABLE IF NOT EXISTS ads (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                imageUrl LONGTEXT,
                buttonText VARCHAR(100) DEFAULT 'En savoir plus',
                buttonUrl VARCHAR(500),
                format ENUM('square', 'rectangle', 'vertical', 'horizontal') DEFAULT 'rectangle',
                pages JSON,
                isActive BOOLEAN DEFAULT TRUE,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
    }

    public async findAll(): Promise<Ad[]> {
        const rows = await this.db.query("SELECT * FROM ads ORDER BY createdAt DESC");
        return rows.map((row: any) => ({
            ...row,
            pages: typeof row.pages === "string" ? JSON.parse(row.pages) : (row.pages || []),
            isActive: !!row.isActive
        }));
    }

    public async findByPage(page: string): Promise<Ad[]> {
        const rows = await this.db.query(
            "SELECT * FROM ads WHERE isActive = TRUE AND JSON_CONTAINS(pages, JSON_QUOTE(?)) ORDER BY createdAt DESC",
            [page]
        );
        return rows.map((row: any) => ({
            ...row,
            pages: typeof row.pages === "string" ? JSON.parse(row.pages) : (row.pages || []),
            isActive: !!row.isActive
        }));
    }

    public async findById(id: number): Promise<Ad | null> {
        const rows = await this.db.query("SELECT * FROM ads WHERE id = ?", [id]);
        if (rows.length === 0) return null;
        const row = rows[0];
        return {
            ...row,
            pages: typeof row.pages === "string" ? JSON.parse(row.pages) : (row.pages || []),
            isActive: !!row.isActive
        };
    }

    public async create(ad: Ad): Promise<number> {
        const result = await this.db.query(
            "INSERT INTO ads (title, description, imageUrl, buttonText, buttonUrl, format, pages, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [ad.title, ad.description, ad.imageUrl, ad.buttonText, ad.buttonUrl, ad.format, JSON.stringify(ad.pages), ad.isActive !== false]
        );
        return result.insertId;
    }

    public async update(id: number, ad: Partial<Ad>): Promise<void> {
        const sets: string[] = [];
        const params: any[] = [];

        if (ad.title !== undefined) { sets.push("title = ?"); params.push(ad.title); }
        if (ad.description !== undefined) { sets.push("description = ?"); params.push(ad.description); }
        if (ad.imageUrl !== undefined) { sets.push("imageUrl = ?"); params.push(ad.imageUrl); }
        if (ad.buttonText !== undefined) { sets.push("buttonText = ?"); params.push(ad.buttonText); }
        if (ad.buttonUrl !== undefined) { sets.push("buttonUrl = ?"); params.push(ad.buttonUrl); }
        if (ad.format !== undefined) { sets.push("format = ?"); params.push(ad.format); }
        if (ad.pages !== undefined) { sets.push("pages = ?"); params.push(JSON.stringify(ad.pages)); }
        if (ad.isActive !== undefined) { sets.push("isActive = ?"); params.push(ad.isActive); }

        if (sets.length === 0) return;
        params.push(id);
        await this.db.query(`UPDATE ads SET ${sets.join(", ")} WHERE id = ?`, params);
    }

    public async delete(id: number): Promise<void> {
        await this.db.query("DELETE FROM ads WHERE id = ?", [id]);
    }

    public async count(): Promise<number> {
        const rows = await this.db.query("SELECT COUNT(*) as count FROM ads");
        return rows[0].count;
    }

    public async seed(): Promise<void> {
        const existing = await this.count();
        if (existing > 0) return;

        const ads: Ad[] = [
            {
                title: "Automatisez vos tâches avec l'IA",
                description: "AI Agency Nexus – La plateforme d'automatisation intelligente qui transforme votre productivité. Gagnez du temps, réduisez les erreurs.",
                imageUrl: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=1932&auto=format&fit=crop",
                buttonText: "Découvrir la plateforme",
                buttonUrl: "https://aiagencynexus.com",
                format: "rectangle",
                pages: ["home", "services"],
                isActive: true
            },
            {
                title: "Créez votre site web en quelques clics",
                description: "Quantum Insight Agency génère des sites web professionnels grâce à l'IA. Design unique, code optimisé, déployé en minutes.",
                imageUrl: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?q=80&w=2061&auto=format&fit=crop",
                buttonText: "Générer mon site",
                buttonUrl: "https://quantuminsightagency.com",
                format: "square",
                pages: ["actus", "expertise"],
                isActive: true
            },
            {
                title: "Chatbots IA & Génération d'images",
                description: "Neural Sphere Agency – Des chatbots intelligents et une génération d'images créative propulsés par l'IA pour votre entreprise.",
                imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop",
                buttonText: "Explorer Neural Sphere",
                buttonUrl: "https://neuralsphereagency.com",
                format: "vertical",
                pages: ["devis", "cahier", "service-detail"],
                isActive: true
            },
            {
                title: "L'IA au service de votre croissance",
                description: "AI Agency Nexus automatise vos workflows, vos emails et vos rapports. Intégration simple avec vos outils existants.",
                imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2045&auto=format&fit=crop",
                buttonText: "Essayer gratuitement",
                buttonUrl: "https://aiagencynexus.com",
                format: "horizontal",
                pages: ["home", "expertise", "actus"],
                isActive: true
            },
            {
                title: "Votre site web sur mesure en 24h",
                description: "Quantum Insight Agency utilise l'IA pour créer des sites web élégants et performants. SEO optimisé, responsive, 100% personnalisé.",
                imageUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2069&auto=format&fit=crop",
                buttonText: "Voir une démo",
                buttonUrl: "https://quantuminsightagency.com",
                format: "rectangle",
                pages: ["services", "service-detail"],
                isActive: true
            },
            {
                title: "Chatbots & Images IA pour votre marque",
                description: "Neural Sphere Agency : créez des assistants virtuels sur-mesure et des visuels époustouflants grâce à notre suite IA.",
                imageUrl: "https://images.unsplash.com/photo-1684369175809-f9642140a1bd?q=80&w=2072&auto=format&fit=crop",
                buttonText: "Commencer maintenant",
                buttonUrl: "https://neuralsphereagency.com",
                format: "square",
                pages: ["home", "services", "devis", "cahier"],
                isActive: true
            }
        ];

        for (const ad of ads) {
            await this.create(ad);
        }
    }
}
