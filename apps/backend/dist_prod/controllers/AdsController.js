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
exports.AdsController = void 0;
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const types_1 = require("../types");
const AdsRepo_1 = require("../repositories/AdsRepo");
const authMiddleware_1 = require("../middlewares/authMiddleware");
let AdsController = class AdsController {
    constructor(adsRepo) {
        this.adsRepo = adsRepo;
    }
    // Public: get ads for a specific page
    async getAdsByPage(req, res) {
        try {
            const page = req.query.page;
            if (!page) {
                const all = await this.adsRepo.findAll();
                return res.json(all.filter(a => a.isActive));
            }
            const ads = await this.adsRepo.findByPage(page);
            return res.json(ads);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    // Admin: get all ads
    async getAllAds(req, res) {
        try {
            const ads = await this.adsRepo.findAll();
            return res.json(ads);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    // Admin: create ad
    async createAd(req, res) {
        try {
            const { title, description, imageUrl, buttonText, buttonUrl, format, pages, isActive, title_en, description_en, buttonText_en, title_es, description_es, buttonText_es, title_de, description_de, buttonText_de } = req.body;
            if (!title || !format) {
                return res.status(400).json({ message: "title and format are required" });
            }
            const id = await this.adsRepo.create({
                title,
                description: description || "",
                imageUrl: imageUrl || "",
                buttonText: buttonText || "En savoir plus",
                buttonUrl: buttonUrl || "",
                format,
                pages: pages || [],
                isActive: isActive !== false,
                title_en: title_en || "",
                description_en: description_en || "",
                buttonText_en: buttonText_en || "",
                title_es: title_es || "",
                description_es: description_es || "",
                buttonText_es: buttonText_es || "",
                title_de: title_de || "",
                description_de: description_de || "",
                buttonText_de: buttonText_de || ""
            });
            const ad = await this.adsRepo.findById(id);
            return res.status(201).json(ad);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    // Admin: update ad
    async updateAd(id, req, res) {
        try {
            await this.adsRepo.update(parseInt(id), req.body);
            const ad = await this.adsRepo.findById(parseInt(id));
            return res.json(ad);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    // Admin: delete ad
    async deleteAd(id, res) {
        try {
            await this.adsRepo.delete(parseInt(id));
            return res.json({ success: true });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
};
exports.AdsController = AdsController;
__decorate([
    (0, inversify_express_utils_1.httpGet)("/"),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdsController.prototype, "getAdsByPage", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/admin", authMiddleware_1.adminMiddleware),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdsController.prototype, "getAllAds", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)("/admin", authMiddleware_1.adminMiddleware),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdsController.prototype, "createAd", null);
__decorate([
    (0, inversify_express_utils_1.httpPatch)("/admin/:id", authMiddleware_1.adminMiddleware),
    __param(0, (0, inversify_express_utils_1.requestParam)("id")),
    __param(1, (0, inversify_express_utils_1.request)()),
    __param(2, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], AdsController.prototype, "updateAd", null);
__decorate([
    (0, inversify_express_utils_1.httpDelete)("/admin/:id", authMiddleware_1.adminMiddleware),
    __param(0, (0, inversify_express_utils_1.requestParam)("id")),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdsController.prototype, "deleteAd", null);
exports.AdsController = AdsController = __decorate([
    (0, inversify_express_utils_1.controller)("/api/ads"),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.AdsRepo)),
    __metadata("design:paramtypes", [AdsRepo_1.AdsRepo])
], AdsController);
//# sourceMappingURL=AdsController.js.map