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
exports.BlogRepo = void 0;
const types_1 = require("../types");
const inversify_1 = require("inversify");
const DatabaseService_1 = require("../services/DatabaseService");
let BlogRepo = class BlogRepo {
    constructor(db) {
        this.db = db;
    }
    slugify(text) {
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
    async findAll(limit, offset) {
        const rows = await this.db.query("SELECT * FROM blog ORDER BY createdAt DESC LIMIT ? OFFSET ?", [limit, offset]);
        return rows;
    }
    async findById(id) {
        const rows = await this.db.query("SELECT * FROM blog WHERE id = ?", [id]);
        return rows.length > 0 ? rows[0] : null;
    }
    async findBySlug(slug) {
        const rows = await this.db.query("SELECT * FROM blog WHERE slug = ?", [slug]);
        return rows.length > 0 ? rows[0] : null;
    }
    async create(p) {
        const slug = p.slug || this.slugify(p.title);
        const result = await this.db.query("INSERT INTO blog (title, slug, content, imageUrl, category, author) VALUES (?, ?, ?, ?, ?, ?)", [p.title, slug, p.content, p.imageUrl, p.category, p.author || "L'équipe NettmobInfotech"]);
        return result.insertId;
    }
    async update(id, p) {
        const sets = [];
        const params = [];
        if (p.title) {
            sets.push("title = ?");
            params.push(p.title);
            if (!p.slug) {
                sets.push("slug = ?");
                params.push(this.slugify(p.title));
            }
        }
        if (p.slug) {
            sets.push("slug = ?");
            params.push(p.slug);
        }
        if (p.content) {
            sets.push("content = ?");
            params.push(p.content);
        }
        if (p.imageUrl) {
            sets.push("imageUrl = ?");
            params.push(p.imageUrl);
        }
        if (p.category) {
            sets.push("category = ?");
            params.push(p.category);
        }
        if (p.author) {
            sets.push("author = ?");
            params.push(p.author);
        }
        if (sets.length === 0)
            return;
        params.push(id);
        await this.db.query(`UPDATE blog SET ${sets.join(", ")} WHERE id = ?`, params);
    }
    async delete(id) {
        await this.db.query("DELETE FROM blog WHERE id = ?", [id]);
    }
    async count() {
        const rows = await this.db.query("SELECT COUNT(*) as count FROM blog");
        return rows[0].count;
    }
    async addFeedback(id, isUseful) {
        const field = isUseful ? "usefulCount" : "notUsefulCount";
        await this.db.query(`UPDATE blog SET ${field} = ${field} + 1 WHERE id = ?`, [id]);
    }
    async initTable() {
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
};
exports.BlogRepo = BlogRepo;
exports.BlogRepo = BlogRepo = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.DatabaseService)),
    __metadata("design:paramtypes", [DatabaseService_1.DatabaseService])
], BlogRepo);
//# sourceMappingURL=BlogRepo.js.map