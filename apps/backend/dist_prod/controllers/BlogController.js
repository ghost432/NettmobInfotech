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
exports.BlogController = void 0;
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const types_1 = require("../types");
const BlogRepo_1 = require("../repositories/BlogRepo");
const authMiddleware_1 = require("../middlewares/authMiddleware");
let BlogController = class BlogController {
    constructor(blogRepo) {
        this.blogRepo = blogRepo;
    }
    async getPosts(pageStr, limitStr, res) {
        try {
            const page = parseInt(pageStr) || 1;
            const limit = parseInt(limitStr) || 15;
            const offset = (page - 1) * limit;
            const [posts, total] = await Promise.all([
                this.blogRepo.findAll(limit, offset),
                this.blogRepo.count()
            ]);
            return res.json({
                posts,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit)
                }
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async getPost(id, res) {
        try {
            const post = await this.blogRepo.findById(parseInt(id));
            if (!post)
                return res.status(404).json({ message: "Article non trouvé" });
            return res.json(post);
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async getPostBySlug(slug, res) {
        try {
            const post = await this.blogRepo.findBySlug(slug);
            if (!post)
                return res.status(404).json({ message: "Article non trouvé" });
            return res.json(post);
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async addFeedback(id, req, res) {
        try {
            const { isUseful } = req.body;
            await this.blogRepo.addFeedback(parseInt(id), !!isUseful);
            return res.json({ success: true });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    // Admin Endpoints
    async createPost(req, res) {
        try {
            const id = await this.blogRepo.create(req.body);
            return res.status(201).json({ id, message: "Article créé avec succès" });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async updatePost(id, req, res) {
        try {
            await this.blogRepo.update(parseInt(id), req.body);
            return res.json({ message: "Article mis à jour avec succès" });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async deletePost(id, res) {
        try {
            await this.blogRepo.delete(parseInt(id));
            return res.json({ message: "Article supprimé avec succès" });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
};
exports.BlogController = BlogController;
__decorate([
    (0, inversify_express_utils_1.httpGet)("/"),
    __param(0, (0, inversify_express_utils_1.queryParam)("page")),
    __param(1, (0, inversify_express_utils_1.queryParam)("limit")),
    __param(2, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getPosts", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/:id"),
    __param(0, (0, inversify_express_utils_1.requestParam)("id")),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getPost", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/slug/:slug"),
    __param(0, (0, inversify_express_utils_1.requestParam)("slug")),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getPostBySlug", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)("/:id/feedback"),
    __param(0, (0, inversify_express_utils_1.requestParam)("id")),
    __param(1, (0, inversify_express_utils_1.request)()),
    __param(2, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "addFeedback", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)("/", authMiddleware_1.adminMiddleware),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "createPost", null);
__decorate([
    (0, inversify_express_utils_1.httpPatch)("/:id", authMiddleware_1.adminMiddleware),
    __param(0, (0, inversify_express_utils_1.requestParam)("id")),
    __param(1, (0, inversify_express_utils_1.request)()),
    __param(2, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "updatePost", null);
__decorate([
    (0, inversify_express_utils_1.httpDelete)("/:id", authMiddleware_1.adminMiddleware),
    __param(0, (0, inversify_express_utils_1.requestParam)("id")),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "deletePost", null);
exports.BlogController = BlogController = __decorate([
    (0, inversify_express_utils_1.controller)("/api/blog"),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.BlogRepo)),
    __metadata("design:paramtypes", [BlogRepo_1.BlogRepo])
], BlogController);
//# sourceMappingURL=BlogController.js.map