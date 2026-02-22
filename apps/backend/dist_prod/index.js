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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv").config({ override: true }); // Must be FIRST before any imports that use process.env
const express_1 = __importDefault(require("express"));
const inversify_express_utils_1 = require("inversify-express-utils");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const inversify_express_utils_2 = require("inversify-express-utils");
const inversify_config_1 = require("./inversify.config");
const types_1 = require("./types");
let TestController = class TestController {
    getTest(req, res) {
        return res.send("Backend is working!");
    }
};
__decorate([
    (0, inversify_express_utils_2.httpGet)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TestController.prototype, "getTest", null);
TestController = __decorate([
    (0, inversify_express_utils_2.controller)("/api/test")
], TestController);
const server = new inversify_express_utils_1.InversifyExpressServer(inversify_config_1.container);
// Manually bind TestController if discovery fails
inversify_config_1.container.bind(TestController).toSelf();
server.setConfig((app) => {
    app.use(express_1.default.json({ limit: '50mb' }));
    app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
    app.use(typeof cors === 'function' ? cors() : cors.default());
    app.use(typeof helmet === 'function' ? helmet() : helmet.default());
    app.use(typeof morgan === 'function' ? morgan("dev") : morgan.default("dev"));
});
const app = server.build();
const PORT = process.env.PORT || 5001;
async function initDb() {
    try {
        const userRepo = inversify_config_1.container.get(types_1.TYPES.UserRepo);
        const contactRepo = inversify_config_1.container.get(types_1.TYPES.ContactRepo);
        const quotationRepo = inversify_config_1.container.get(types_1.TYPES.QuotationRepo);
        const authService = inversify_config_1.container.get(types_1.TYPES.AuthService);
        const blogRepo = inversify_config_1.container.get(types_1.TYPES.BlogRepo);
        const specificationsRepo = inversify_config_1.container.get(types_1.TYPES.SpecificationsRepo);
        const analyticsRepo = inversify_config_1.container.get(types_1.TYPES.AnalyticsRepo);
        const adsRepo = inversify_config_1.container.get(types_1.TYPES.AdsRepo);
        const mailingContactRepo = inversify_config_1.container.get(types_1.TYPES.MailingContactRepo);
        await userRepo.initTable();
        await contactRepo.initTable();
        await quotationRepo.initTable();
        await blogRepo.initTable();
        await specificationsRepo.initTable();
        await analyticsRepo.initTable();
        await adsRepo.initTable();
        await mailingContactRepo.initTable();
        await adsRepo.seed();
        // Migration: Add slug column and populate if needed
        try {
            const columns = await blogRepo.db.query("SHOW COLUMNS FROM blog LIKE 'slug'");
            if (columns.length === 0) {
                await blogRepo.db.query("ALTER TABLE blog ADD COLUMN slug VARCHAR(255) UNIQUE AFTER title");
                console.log("Added slug column to blog table.");
            }
            // Populate empty slugs
            const rowsWithoutSlug = await blogRepo.db.query("SELECT id, title FROM blog WHERE slug IS NULL OR slug = ''");
            for (const row of rowsWithoutSlug) {
                const slug = row.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                await blogRepo.db.query("UPDATE blog SET slug = ? WHERE id = ?", [slug, row.id]);
            }
        }
        catch (mErr) {
            console.warn("Migration warning (might be already done):", mErr);
        }
        // Seed Admin
        const adminEmail = "admin@nettmobinfotech.fr";
        const adminExists = await userRepo.findByEmail(adminEmail);
        if (!adminExists) {
            const hashedPassword = await authService.hashPassword("Admin123!");
            await userRepo.create({
                email: adminEmail,
                password: hashedPassword,
                firstName: "Admin",
                lastName: "Nettmob",
                isAdmin: true
            });
            console.log("Admin user seeded: admin@nettmobinfotech.fr / Admin123!");
        }
        // Seed Blog
        const blogCount = await blogRepo.count();
        if (blogCount === 0) {
            const articles = [
                {
                    title: "NettmobInfotech – Une vision moderne du digital au service des entreprises ambitieuses",
                    slug: "vision-moderne-du-digital",
                    category: "Création de site Web",
                    content: "Dans un monde de plus en plus connecté, avoir une présence en ligne ne suffit plus. Pour se démarquer, il faut une vision claire, des outils performants et une stratégie adaptée. NettmobInfotech s'engage à offrir des solutions digitales modernes axées sur la performance. Notre approche repose sur quatre piliers : Design orienté résultats, Accompagnement stratégique, Transparence totale et Solutions évolutives.",
                    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop",
                    author: "L'équipe NettmobInfotech"
                },
                {
                    title: "Pourquoi choisir NettmobInfotech ? Une solution complète pour accélérer votre transformation digitale",
                    slug: "choisir-nettmobinfotech-transformation-digitale",
                    category: "Marketing Digital",
                    content: "La transformation digitale n’est plus une option pour les entreprises qui souhaitent rester compétitives. C’est un levier de croissance indispensable qui permet d’optimiser les processus, d’améliorer l’expérience client et de conquérir de nouveaux marchés. NettmobInfotech propose une solution 'all-in-one' incluant du conseil stratégique, du développement sur mesure et un suivi continu des performances.",
                    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
                    author: "L'équipe NettmobInfotech"
                },
                {
                    title: "NettmobInfotech – Le partenaire digital qui transforme les idées en solutions numériques performantes",
                    slug: "partenaire-digital-solutions-performantes",
                    category: "Développement d'applications mobiles",
                    content: "À l’ère du numérique, chaque entreprise a besoin d’un partenaire de confiance pour transformer ses ambitions en réalités technologiques. L'expertise technique de notre équipe, utilisant des technologies performantes comme React et Node.js, nous permet de transformer des idées complexes en produits numériques évolutifs, efficaces et conviviaux.",
                    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
                    author: "L'équipe NettmobInfotech"
                },
                {
                    title: "L'IA et l'automatisation : Révolutionner votre entreprise avec NettmobInfotech",
                    slug: "ia-et-automatisation-revolution",
                    category: "Solution IA (Applications & Chatbots)",
                    content: "L'intelligence artificielle n'est plus une technologie du futur, c'est un outil indispensable pour les entreprises d'aujourd'hui. Elle transforme radicalement la façon dont les PME interagissent avec leurs clients et optimisent leurs opérations. Chez NettmobInfotech, nous développons des solutions d'IA personnalisées, des chatbots intelligents et des systèmes d'automatisation pour booster votre productivité et votre innovation.",
                    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
                    author: "L'équipe NettmobInfotech"
                }
            ];
            for (const article of articles) {
                await blogRepo.create(article);
            }
            console.log("Seeded 4 blog articles.");
        }
    }
    catch (error) {
        console.error("DB Init Error:", error);
    }
}
initDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on http://localhost:${PORT}`);
    });
});
//# sourceMappingURL=index.js.map