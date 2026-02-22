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
exports.AuthController = void 0;
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const types_1 = require("../types");
const AuthService_1 = require("../services/AuthService");
const UserRepo_1 = require("../repositories/UserRepo");
const authMiddleware_1 = require("../middlewares/authMiddleware");
let AuthController = class AuthController {
    constructor(authService, userRepo) {
        this.authService = authService;
        this.userRepo = userRepo;
    }
    async register(req, res) {
        try {
            const { email, password, firstName, lastName } = req.body;
            const existingUser = await this.userRepo.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }
            const hashedPassword = await this.authService.hashPassword(password);
            const userId = await this.userRepo.create({
                email,
                password: hashedPassword,
                firstName,
                lastName,
                isAdmin: false
            });
            return res.status(201).json({ id: userId, message: "User created" });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await this.userRepo.findByEmail(email);
            if (!user || !user.password) {
                return res.status(401).json({ message: "Invalid credentials" });
            }
            const isMatch = await this.authService.comparePassword(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }
            const token = this.authService.generateToken(user);
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    isAdmin: !!user.isAdmin
                }
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async getUsers(req, res) {
        try {
            const users = await this.userRepo.findAll();
            return res.json(users);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async createUser(req, res) {
        try {
            const { email, password, firstName, lastName, isAdmin } = req.body;
            const existingUser = await this.userRepo.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }
            const hashedPassword = await this.authService.hashPassword(password);
            await this.userRepo.create({
                email,
                password: hashedPassword,
                firstName,
                lastName,
                isAdmin: !!isAdmin
            });
            return res.status(201).json({ message: "User created successfully" });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, inversify_express_utils_1.httpPost)("/register"),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)("/login"),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/admin/users", authMiddleware_1.adminMiddleware),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getUsers", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)("/admin/users", authMiddleware_1.adminMiddleware),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "createUser", null);
exports.AuthController = AuthController = __decorate([
    (0, inversify_express_utils_1.controller)("/api/auth"),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.AuthService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.UserRepo)),
    __metadata("design:paramtypes", [AuthService_1.AuthService,
        UserRepo_1.UserRepo])
], AuthController);
//# sourceMappingURL=AuthController.js.map