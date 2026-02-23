"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdsRepo = void 0;
const types_1 = require("../types");
const inversify_1 = require("inversify");
const DatabaseService_1 = require("../services/DatabaseService");
let AdsRepo = class AdsRepo {
    constructor(db) {
        this.db = db;
    }
    async initTable() {
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
                title_en VARCHAR(255),
                description_en TEXT,
                buttonText_en VARCHAR(100),
                title_es VARCHAR(255),
                description_es TEXT,
                buttonText_es VARCHAR(100),
                title_de VARCHAR(255),
                description_de TEXT,
                buttonText_de VARCHAR(100),
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
    }
    async findAll() {
        const rows = await this.db.query("SELECT * FROM ads ORDER BY createdAt DESC");
        return rows.map((row) => ({
            ...row,
            pages: typeof row.pages === "string" ? JSON.parse(row.pages) : (row.pages || []),
            isActive: !!row.isActive
        }));
    }
    async findByPage(page) {
        const rows = await this.db.query("SELECT * FROM ads WHERE isActive = TRUE AND JSON_CONTAINS(pages, JSON_QUOTE(?)) ORDER BY createdAt DESC", [page]);
        return rows.map((row) => ({
            ...row,
            pages: typeof row.pages === "string" ? JSON.parse(row.pages) : (row.pages || []),
            isActive: !!row.isActive
        }));
    }
    async findById(id) {
        const rows = await this.db.query("SELECT * FROM ads WHERE id = ?", [id]);
        if (rows.length === 0)
            return null;
        const row = rows[0];
        return {
            ...row,
            pages: typeof row.pages === "string" ? JSON.parse(row.pages) : (row.pages || []),
            isActive: !!row.isActive
        };
    }
    async create(ad) {
        const result = await this.db.query("INSERT INTO ads (title, description, imageUrl, buttonText, buttonUrl, format, pages, isActive, title_en, description_en, buttonText_en, title_es, description_es, buttonText_es, title_de, description_de, buttonText_de) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [ad.title, ad.description, ad.imageUrl, ad.buttonText, ad.buttonUrl, ad.format, JSON.stringify(ad.pages), ad.isActive !== false, ad.title_en, ad.description_en, ad.buttonText_en, ad.title_es, ad.description_es, ad.buttonText_es, ad.title_de, ad.description_de, ad.buttonText_de]);
        return result.insertId;
    }
    async update(id, ad) {
        const sets = [];
        const params = [];
        if (ad.title !== undefined) {
            sets.push("title = ?");
            params.push(ad.title);
        }
        if (ad.description !== undefined) {
            sets.push("description = ?");
            params.push(ad.description);
        }
        if (ad.imageUrl !== undefined) {
            sets.push("imageUrl = ?");
            params.push(ad.imageUrl);
        }
        if (ad.buttonText !== undefined) {
            sets.push("buttonText = ?");
            params.push(ad.buttonText);
        }
        if (ad.buttonUrl !== undefined) {
            sets.push("buttonUrl = ?");
            params.push(ad.buttonUrl);
        }
        if (ad.format !== undefined) {
            sets.push("format = ?");
            params.push(ad.format);
        }
        if (ad.pages !== undefined) {
            sets.push("pages = ?");
            params.push(JSON.stringify(ad.pages));
        }
        if (ad.isActive !== undefined) {
            sets.push("isActive = ?");
            params.push(ad.isActive);
        }
        if (ad.title_en !== undefined) {
            sets.push("title_en = ?");
            params.push(ad.title_en);
        }
        if (ad.description_en !== undefined) {
            sets.push("description_en = ?");
            params.push(ad.description_en);
        }
        if (ad.buttonText_en !== undefined) {
            sets.push("buttonText_en = ?");
            params.push(ad.buttonText_en);
        }
        if (ad.title_es !== undefined) {
            sets.push("title_es = ?");
            params.push(ad.title_es);
        }
        if (ad.description_es !== undefined) {
            sets.push("description_es = ?");
            params.push(ad.description_es);
        }
        if (ad.buttonText_es !== undefined) {
            sets.push("buttonText_es = ?");
            params.push(ad.buttonText_es);
        }
        if (ad.title_de !== undefined) {
            sets.push("title_de = ?");
            params.push(ad.title_de);
        }
        if (ad.description_de !== undefined) {
            sets.push("description_de = ?");
            params.push(ad.description_de);
        }
        if (ad.buttonText_de !== undefined) {
            sets.push("buttonText_de = ?");
            params.push(ad.buttonText_de);
        }
        if (sets.length === 0)
            return;
        params.push(id);
        await this.db.query(`UPDATE ads SET ${sets.join(", ")} WHERE id = ?`, params);
    }
    async delete(id) {
        await this.db.query("DELETE FROM ads WHERE id = ?", [id]);
    }
    async count() {
        const rows = await this.db.query("SELECT COUNT(*) as count FROM ads");
        return rows[0].count;
    }
    async seed() {
        const existing = await this.count();
        if (existing > 0)
            return;
        const ads = [
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
};
exports.AdsRepo = AdsRepo;
exports.AdsRepo = AdsRepo = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.DatabaseService)),
    __metadata("design:paramtypes", [DatabaseService_1.DatabaseService])
], AdsRepo);
//# sourceMappingURL=AdsRepo.js.map