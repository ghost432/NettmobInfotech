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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const inversify_1 = require("inversify");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const types_1 = require("../types");
const UserRepo_1 = require("../repositories/UserRepo");
let AuthService = class AuthService {
    constructor(userRepo) {
        this.userRepo = userRepo;
        this.JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";
    }
    async hashPassword(password) {
        return await bcryptjs_1.default.hash(password, 10);
    }
    async comparePassword(password, hash) {
        return await bcryptjs_1.default.compare(password, hash);
    }
    generateToken(user) {
        return jsonwebtoken_1.default.sign({ id: user.id, email: user.email, isAdmin: user.isAdmin }, this.JWT_SECRET, { expiresIn: "7d" });
    }
    verifyToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, this.JWT_SECRET);
        }
        catch (e) {
            return null;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.UserRepo)),
    __metadata("design:paramtypes", [UserRepo_1.UserRepo])
], AuthService);
//# sourceMappingURL=AuthService.js.map