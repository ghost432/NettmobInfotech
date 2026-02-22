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
exports.SpecificationsRepo = void 0;
const types_1 = require("../types");
const inversify_1 = require("inversify");
const DatabaseService_1 = require("../services/DatabaseService");
let SpecificationsRepo = class SpecificationsRepo {
    constructor(db) {
        this.db = db;
    }
    async create(spec) {
        const result = await this.db.query("INSERT INTO project_specifications (companyName, contactName, email, phone, projectType, otherProjectType, description, budget, deadline, startDate, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'unread')", [spec.companyName, spec.contactName, spec.email, spec.phone, spec.projectType, spec.otherProjectType, spec.description, spec.budget, spec.deadline, spec.startDate]);
        return result.insertId;
    }
    async findAll() {
        return await this.db.query("SELECT * FROM project_specifications ORDER BY createdAt DESC");
    }
    async findPaginated(status, limit, offset) {
        let sql = "SELECT * FROM project_specifications";
        const params = [];
        if (status) {
            // If status is 'archive', we might want 'archived' status. 
            // If status is 'recent', we might want 'unread' OR 'read' but not 'archived' or just 'unread'?
            // Let's stick to the pattern in ContactRepo if possible, or adapt.
            // The prompt asked for "archive et recent". 
            // Let's assume 'recent' = unread + read (active), 'archive' = archived.
            if (status === 'archived') {
                sql += " WHERE status = 'archived'";
            }
            else if (status === 'recent') {
                sql += " WHERE status != 'archived'";
            }
            else {
                // specific status search if needed
                sql += " WHERE status = ?";
                params.push(status);
            }
        }
        sql += " ORDER BY createdAt DESC LIMIT ? OFFSET ?";
        params.push(limit, offset);
        return await this.db.query(sql, params);
    }
    async count(status) {
        let sql = "SELECT COUNT(*) as count FROM project_specifications";
        const params = [];
        if (status) {
            if (status === 'archived') {
                sql += " WHERE status = 'archived'";
            }
            else if (status === 'recent') {
                sql += " WHERE status != 'archived'";
            }
            else {
                sql += " WHERE status = ?";
                params.push(status);
            }
        }
        const rows = await this.db.query(sql, params);
        return rows[0].count;
    }
    async getUnreadCount() {
        const rows = await this.db.query("SELECT COUNT(*) as count FROM project_specifications WHERE status = 'unread'");
        return rows[0].count;
    }
    async updateStatus(id, status) {
        await this.db.query("UPDATE project_specifications SET status = ? WHERE id = ?", [status, id]);
    }
    async initTable() {
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
};
exports.SpecificationsRepo = SpecificationsRepo;
exports.SpecificationsRepo = SpecificationsRepo = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.DatabaseService)),
    __metadata("design:paramtypes", [DatabaseService_1.DatabaseService])
], SpecificationsRepo);
//# sourceMappingURL=SpecificationsRepo.js.map