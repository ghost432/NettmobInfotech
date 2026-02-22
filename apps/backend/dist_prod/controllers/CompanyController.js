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
exports.CompanyController = void 0;
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const types_1 = require("../types");
const ContactRepo_1 = require("../repositories/ContactRepo");
const QuotationRepo_1 = require("../repositories/QuotationRepo");
const SpecificationsRepo_1 = require("../repositories/SpecificationsRepo");
const UserRepo_1 = require("../repositories/UserRepo");
const AnalyticsRepo_1 = require("../repositories/AnalyticsRepo");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const emailService_1 = __importDefault(require("../services/emailService"));
let CompanyController = class CompanyController {
    constructor(contactRepo, quotationRepo, specificationsRepo, userRepo, analyticsRepo) {
        this.contactRepo = contactRepo;
        this.quotationRepo = quotationRepo;
        this.specificationsRepo = specificationsRepo;
        this.userRepo = userRepo;
        this.analyticsRepo = analyticsRepo;
    }
    async getStats(req, res) {
        try {
            const [totalMessages, unreadMessages, unreadQuotes, unreadSpecs, totalUsers, adminCount] = await Promise.all([
                this.contactRepo.count(null),
                this.contactRepo.getUnreadCount(),
                this.quotationRepo.getUnreadCount(),
                this.specificationsRepo.getUnreadCount(),
                this.userRepo.count(),
                this.userRepo.countAdmins()
            ]);
            return res.json({
                totalMessages,
                unreadMessages,
                unreadQuotes,
                unreadSpecs,
                totalUsers,
                adminCount
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async getInfo(req, res) {
        return res.json({
            name: "NettmobInfotech",
            address: "10 Rue du Colisée, 75008 Paris, France",
            email: "contact@nettmobinfotech.fr",
            phone: "+33 7 66 39 09 92",
            mission: "Offrir des solutions informatiques innovantes et fiables.",
        });
    }
    async getServices(req, res) {
        return res.json([
            { id: 1, title: "Design Graphique", description: "Création d'identités visuelles percutantes." },
            { id: 2, title: "Création de Contenu", description: "Rédaction et production de contenus engageants." },
            { id: 3, title: "Création de Site Web", description: "Développement de sites vitrines et e-commerce." },
            { id: 4, title: "Développement Mobile", description: "Applications iOS et Android sur mesure." },
            { id: 5, title: "Marketing Digital", description: "Stratégies de croissance en ligne." },
            { id: 6, title: "SEO", description: "Optimisation pour les moteurs de recherche." },
        ]);
    }
    async submitContact(req, res) {
        try {
            await this.contactRepo.create(req.body);
            // Send email notification
            try {
                await emailService_1.default.sendContactEmail(req.body);
            }
            catch (emailError) {
                console.error("Failed to send contact email:", emailError);
            }
            return res.status(201).json({ message: "votre message a ete recu notre equipe vous contact sous peut" });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async getMessages(req, res) {
        try {
            const type = req.query.type; // 'recent' or 'archive'
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || (type === 'archive' ? 20 : 10);
            const offset = (page - 1) * limit;
            const isRead = type === 'archive' ? true : (type === 'recent' ? false : null);
            const [messages, total] = await Promise.all([
                this.contactRepo.findPaginated(isRead, limit, offset),
                this.contactRepo.count(isRead)
            ]);
            return res.json({
                messages,
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
    async getCount(req, res) {
        try {
            const count = await this.contactRepo.getUnreadCount();
            return res.json({ unreadCount: count });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async markAsRead(id, res) {
        try {
            await this.contactRepo.markAsRead(parseInt(id));
            return res.json({ success: true });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    // Quotation Endpoints
    async submitQuotation(req, res) {
        try {
            await this.quotationRepo.create(req.body);
            // Send email notification
            try {
                await emailService_1.default.sendQuoteEmail(req.body);
            }
            catch (emailError) {
                console.error("Failed to send quote email:", emailError);
            }
            return res.status(201).json({ message: "Votre demande de devis a été reçue avec succès." });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async getQuotations(req, res) {
        try {
            const type = req.query.type; // 'recent' or 'archive'
            const page = parseInt(req.query.page) || 1;
            const limit = 10;
            const offset = (page - 1) * limit;
            const isRead = type === 'archive' ? true : (type === 'recent' ? false : null);
            const [quotations, total] = await Promise.all([
                this.quotationRepo.findPaginated(isRead, limit, offset),
                this.quotationRepo.count(isRead)
            ]);
            return res.json({
                quotations,
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
    async getQuoteCount(req, res) {
        try {
            const count = await this.quotationRepo.getUnreadCount();
            return res.json({ unreadCount: count });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async markQuoteAsRead(id, res) {
        try {
            await this.quotationRepo.markAsRead(parseInt(id));
            return res.json({ success: true });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    // Specifications Endpoints
    async submitSpecification(req, res) {
        try {
            await this.specificationsRepo.create(req.body);
            // Send email notification
            try {
                await emailService_1.default.sendCahierDesChargesEmail(req.body);
            }
            catch (emailError) {
                console.error("Failed to send specifications email:", emailError);
            }
            return res.status(201).json({ message: "Votre cahier des charges a été reçu avec succès. Vous serez contacté sous peu." });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async getSpecifications(req, res) {
        try {
            const type = req.query.type; // 'recent' or 'archive'
            const page = parseInt(req.query.page) || 1;
            const limit = 10;
            const offset = (page - 1) * limit;
            const [specifications, total] = await Promise.all([
                this.specificationsRepo.findPaginated(type, limit, offset),
                this.specificationsRepo.count(type)
            ]);
            return res.json({
                specifications,
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
    async getSpecCount(req, res) {
        try {
            const count = await this.specificationsRepo.getUnreadCount();
            return res.json({ unreadCount: count });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async updateSpecStatus(id, req, res) {
        try {
            const { status } = req.body;
            if (!['read', 'archived'].includes(status)) {
                return res.status(400).json({ message: "Invalid status" });
            }
            await this.specificationsRepo.updateStatus(parseInt(id), status);
            return res.json({ success: true });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    // Analytics Endpoints
    async trackPageView(req, res) {
        try {
            const { pageUrl, referrer } = req.body;
            const ipAddress = req.ip || req.connection.remoteAddress || 'unknown';
            const userAgent = req.headers['user-agent'] || '';
            await this.analyticsRepo.track({
                pageUrl,
                ipAddress,
                userAgent,
                referrer
            });
            return res.status(201).json({ message: "Tracked" });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async getAnalyticsStats(req, res) {
        try {
            const stats = await this.analyticsRepo.getStats();
            return res.json(stats);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async getPageViews(req, res) {
        try {
            const { startDate, endDate } = req.query;
            const pageViews = await this.analyticsRepo.getPageViews(startDate, endDate);
            return res.json(pageViews);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async getGeography(req, res) {
        try {
            const data = await this.analyticsRepo.getGeographicData();
            return res.json(data);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async getViewsOverTime(req, res) {
        try {
            const days = parseInt(req.query.days) || 30;
            const data = await this.analyticsRepo.getViewsOverTime(days);
            return res.json(data);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async getBrowserStats(req, res) {
        try {
            const data = await this.analyticsRepo.getBrowserStats();
            return res.json(data);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async getDeviceStats(req, res) {
        try {
            const data = await this.analyticsRepo.getDeviceStats();
            return res.json(data);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
};
exports.CompanyController = CompanyController;
__decorate([
    (0, inversify_express_utils_1.httpGet)("/admin/stats", authMiddleware_1.adminMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getStats", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/info"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getInfo", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/services"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getServices", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)("/contact"),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "submitContact", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/admin/messages", authMiddleware_1.adminMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getMessages", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/admin/messages/count", authMiddleware_1.adminMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getCount", null);
__decorate([
    (0, inversify_express_utils_1.httpPatch)("/admin/messages/:id/read", authMiddleware_1.adminMiddleware),
    __param(0, (0, inversify_express_utils_1.requestParam)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "markAsRead", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)("/quotation"),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "submitQuotation", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/admin/quotations", authMiddleware_1.adminMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getQuotations", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/admin/quotations/count", authMiddleware_1.adminMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getQuoteCount", null);
__decorate([
    (0, inversify_express_utils_1.httpPatch)("/admin/quotations/:id/read", authMiddleware_1.adminMiddleware),
    __param(0, (0, inversify_express_utils_1.requestParam)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "markQuoteAsRead", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)("/specifications"),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "submitSpecification", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/admin/specifications", authMiddleware_1.adminMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getSpecifications", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/admin/specifications/count", authMiddleware_1.adminMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getSpecCount", null);
__decorate([
    (0, inversify_express_utils_1.httpPatch)("/admin/specifications/:id/status", authMiddleware_1.adminMiddleware),
    __param(0, (0, inversify_express_utils_1.requestParam)("id")),
    __param(1, (0, inversify_express_utils_1.request)()),
    __param(2, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "updateSpecStatus", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)("/analytics"),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "trackPageView", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/admin/analytics/stats", authMiddleware_1.adminMiddleware),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getAnalyticsStats", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/admin/analytics/pages", authMiddleware_1.adminMiddleware),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getPageViews", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/admin/analytics/geography", authMiddleware_1.adminMiddleware),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getGeography", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/admin/analytics/views-over-time", authMiddleware_1.adminMiddleware),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getViewsOverTime", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/admin/analytics/browsers", authMiddleware_1.adminMiddleware),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getBrowserStats", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/admin/analytics/devices", authMiddleware_1.adminMiddleware),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getDeviceStats", null);
exports.CompanyController = CompanyController = __decorate([
    (0, inversify_express_utils_1.controller)("/api/company"),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ContactRepo)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.QuotationRepo)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.SpecificationsRepo)),
    __param(3, (0, inversify_1.inject)(types_1.TYPES.UserRepo)),
    __param(4, (0, inversify_1.inject)(types_1.TYPES.AnalyticsRepo)),
    __metadata("design:paramtypes", [ContactRepo_1.ContactRepo,
        QuotationRepo_1.QuotationRepo,
        SpecificationsRepo_1.SpecificationsRepo,
        UserRepo_1.UserRepo,
        AnalyticsRepo_1.AnalyticsRepo])
], CompanyController);
//# sourceMappingURL=CompanyController.js.map