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
exports.ContactRepo = void 0;
const types_1 = require("../types");
const inversify_1 = require("inversify");
const DatabaseService_1 = require("../services/DatabaseService");
let ContactRepo = class ContactRepo {
    constructor(db) {
        this.db = db;
    }
    async create(msg) {
        const result = await this.db.query("INSERT INTO contacts (firstName, lastName, email, phone, subject, message) VALUES (?, ?, ?, ?, ?, ?)", [msg.firstName, msg.lastName, msg.email, msg.phone, msg.subject, msg.message]);
        return result.insertId;
    }
    async findAll() {
        return await this.db.query("SELECT * FROM contacts ORDER BY createdAt DESC");
    }
    async findPaginated(isRead, limit, offset) {
        let sql = "SELECT * FROM contacts";
        const params = [];
        if (isRead !== null) {
            sql += " WHERE isRead = ?";
            params.push(isRead ? 1 : 0);
        }
        sql += " ORDER BY createdAt DESC LIMIT ? OFFSET ?";
        params.push(limit, offset);
        return await this.db.query(sql, params);
    }
    async count(isRead) {
        let sql = "SELECT COUNT(*) as count FROM contacts";
        const params = [];
        if (isRead !== null) {
            sql += " WHERE isRead = ?";
            params.push(isRead ? 1 : 0);
        }
        const rows = await this.db.query(sql, params);
        return rows[0].count;
    }
    async getUnreadCount() {
        const rows = await this.db.query("SELECT COUNT(*) as count FROM contacts WHERE isRead = 0");
        return rows[0].count;
    }
    async markAsRead(id) {
        await this.db.query("UPDATE contacts SET isRead = 1 WHERE id = ?", [id]);
    }
    async initTable() {
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
};
exports.ContactRepo = ContactRepo;
exports.ContactRepo = ContactRepo = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.DatabaseService)),
    __metadata("design:paramtypes", [DatabaseService_1.DatabaseService])
], ContactRepo);
//# sourceMappingURL=ContactRepo.js.map