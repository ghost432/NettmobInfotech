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
exports.UserRepo = void 0;
const types_1 = require("../types");
const inversify_1 = require("inversify");
const DatabaseService_1 = require("../services/DatabaseService");
let UserRepo = class UserRepo {
    constructor(db) {
        this.db = db;
    }
    async findByEmail(email) {
        const rows = await this.db.query("SELECT * FROM users WHERE email = ?", [email]);
        return rows[0] || null;
    }
    async findById(id) {
        const rows = await this.db.query("SELECT * FROM users WHERE id = ?", [id]);
        return rows[0] || null;
    }
    async create(user) {
        const result = await this.db.query("INSERT INTO users (email, password, firstName, lastName, isAdmin) VALUES (?, ?, ?, ?, ?)", [user.email, user.password, user.firstName, user.lastName, user.isAdmin ? 1 : 0]);
        return result.insertId;
    }
    async findAll() {
        return await this.db.query("SELECT id, email, firstName, lastName, isAdmin, createdAt FROM users ORDER BY createdAt DESC");
    }
    async count() {
        const rows = await this.db.query("SELECT COUNT(*) as count FROM users");
        return rows[0].count;
    }
    async countAdmins() {
        const rows = await this.db.query("SELECT COUNT(*) as count FROM users WHERE isAdmin = 1");
        return rows[0].count;
    }
    async initTable() {
        await this.db.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                firstName VARCHAR(100) NOT NULL,
                lastName VARCHAR(100) NOT NULL,
                isAdmin TINYINT(1) DEFAULT 0,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
    }
};
exports.UserRepo = UserRepo;
exports.UserRepo = UserRepo = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.DatabaseService)),
    __metadata("design:paramtypes", [DatabaseService_1.DatabaseService])
], UserRepo);
//# sourceMappingURL=UserRepo.js.map