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
exports.QuotationRepo = void 0;
const types_1 = require("../types");
const inversify_1 = require("inversify");
const DatabaseService_1 = require("../services/DatabaseService");
let QuotationRepo = class QuotationRepo {
    constructor(db) {
        this.db = db;
    }
    async create(q) {
        const result = await this.db.query("INSERT INTO quotations (firstName, lastName, email, phone, company, services, budget, timeline, details) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [q.firstName, q.lastName, q.email, q.phone, q.company, JSON.stringify(q.services), q.budget, q.timeline, q.details]);
        return result.insertId;
    }
    async findPaginated(isRead, limit, offset) {
        let sql = "SELECT * FROM quotations";
        const params = [];
        if (isRead !== null) {
            sql += " WHERE isRead = ?";
            params.push(isRead ? 1 : 0);
        }
        sql += " ORDER BY createdAt DESC LIMIT ? OFFSET ?";
        params.push(limit, offset);
        const rows = await this.db.query(sql, params);
        return rows.map((r) => ({
            ...r,
            services: JSON.parse(r.services || "[]")
        }));
    }
    async count(isRead) {
        let sql = "SELECT COUNT(*) as count FROM quotations";
        const params = [];
        if (isRead !== null) {
            sql += " WHERE isRead = ?";
            params.push(isRead ? 1 : 0);
        }
        const rows = await this.db.query(sql, params);
        return rows[0].count;
    }
    async getUnreadCount() {
        const rows = await this.db.query("SELECT COUNT(*) as count FROM quotations WHERE isRead = 0");
        return rows[0].count;
    }
    async markAsRead(id) {
        await this.db.query("UPDATE quotations SET isRead = 1 WHERE id = ?", [id]);
    }
    async initTable() {
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
};
exports.QuotationRepo = QuotationRepo;
exports.QuotationRepo = QuotationRepo = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.DatabaseService)),
    __metadata("design:paramtypes", [DatabaseService_1.DatabaseService])
], QuotationRepo);
//# sourceMappingURL=QuotationRepo.js.map