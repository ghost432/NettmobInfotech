"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const https = __importStar(require("https"));
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
    async translateText(req, res) {
        console.log("Entering translateText with body:", req.body);
        try {
            const { text, targetLang } = req.body;
            if (!text || !targetLang)
                return res.status(400).json({ message: "text and targetLang are required" });
            const apiKey = process.env.DEEPL_API_KEY;
            if (!apiKey) {
                console.error("DEEPL_API_KEY is not defined in environment variables");
                return res.status(500).json({ message: "La clé API de traduction n'est pas configurée." });
            }
            // DeepL API requires the language code to be uppercase in most cases (e.g. EN, DE, ES)
            // However, British/American English might require specific EN-GB or EN-US for target lang
            // For general 'en', 'es', 'de' from our frontend, we'll convert to uppercase.
            const targetLangUpper = targetLang.toUpperCase() === 'EN' ? 'EN-US' : targetLang.toUpperCase();
            // Depending on the key ending in :fx, it uses the free API URL
            const apiUrl = apiKey.endsWith(':fx')
                ? 'https://api-free.deepl.com/v2/translate'
                : 'https://api.deepl.com/v2/translate';
            const payloadData = JSON.stringify({
                text: [text],
                target_lang: targetLangUpper,
                source_lang: 'FR'
            });
            const parsedUrl = new URL(apiUrl);
            const reqOptions = {
                hostname: parsedUrl.hostname,
                path: parsedUrl.pathname,
                method: 'POST',
                family: 4, // force IPv4 to avoid ETIMEDOUT bugs
                headers: {
                    'Authorization': `DeepL-Auth-Key ${apiKey}`,
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(payloadData)
                }
            };
            const data = await new Promise((resolve, reject) => {
                const request = https.request(reqOptions, (resObj) => {
                    let responseData = "";
                    resObj.on("data", chunk => responseData += chunk);
                    resObj.on("end", () => {
                        if (resObj.statusCode && resObj.statusCode >= 400) {
                            reject(new Error(`DeepL API Error (${resObj.statusCode}): ${responseData}`));
                        }
                        else {
                            try {
                                resolve(JSON.parse(responseData));
                            }
                            catch (e) {
                                reject(e);
                            }
                        }
                    });
                });
                request.on("error", reject);
                request.write(payloadData);
                request.end();
            });
            console.log("DeepL Data received:", data);
            if (data && data.translations && data.translations.length > 0) {
                return res.json({ translatedText: data.translations[0].text });
            }
            console.log("Translation failed structure, returning 500");
            return res.status(500).json({ message: "Translation failed to return expected data structure" });
        }
        catch (error) {
            console.error("Translation error Caught:", error);
            return res.status(500).json({ message: "Internal server error during translation" });
        }
    }
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
    (0, inversify_express_utils_1.httpPost)("/translate", authMiddleware_1.adminMiddleware),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "translateText", null);
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