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
exports.MailingContactRepo = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../types");
const DatabaseService_1 = require("../services/DatabaseService");
let MailingContactRepo = class MailingContactRepo {
    constructor(db) {
        this.db = db;
    }
    async initTable() {
        await this.db.query(`
            CREATE TABLE IF NOT EXISTS mailing_contacts (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL UNIQUE,
                name VARCHAR(255) DEFAULT '',
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
    }
    async findAll() {
        return this.db.query("SELECT * FROM mailing_contacts ORDER BY createdAt DESC");
    }
    async upsertMany(emails, name = "") {
        let inserted = 0;
        for (const email of emails) {
            const trimmed = email.trim().toLowerCase();
            if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed))
                continue;
            const existing = await this.db.query("SELECT id FROM mailing_contacts WHERE email = ?", [trimmed]);
            if (existing.length === 0) {
                await this.db.query("INSERT INTO mailing_contacts (email, name) VALUES (?, ?)", [trimmed, name]);
                inserted++;
            }
        }
        return inserted;
    }
    async deleteById(id) {
        await this.db.query("DELETE FROM mailing_contacts WHERE id = ?", [id]);
    }
};
exports.MailingContactRepo = MailingContactRepo;
exports.MailingContactRepo = MailingContactRepo = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.DatabaseService)),
    __metadata("design:paramtypes", [DatabaseService_1.DatabaseService])
], MailingContactRepo);
//# sourceMappingURL=MailingContactRepo.js.map