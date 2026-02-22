import "reflect-metadata";
require("dotenv").config({ override: true }); // Must be FIRST before any imports that use process.env
import express from "express";
import { InversifyExpressServer } from "inversify-express-utils";
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
import { controller, httpGet } from "inversify-express-utils";
import { container } from "./inversify.config";
import { TYPES } from "./types";
import { UserRepo } from "./repositories/UserRepo";
import { ContactRepo } from "./repositories/ContactRepo";
import { AuthService } from "./services/AuthService";
import { MailingContactRepo } from "./repositories/MailingContactRepo";

@controller("/api/test")
class TestController {
    @httpGet("/")
    public getTest(req: express.Request, res: express.Response) {
        return res.send("Backend is working!");
    }
}


const server = new InversifyExpressServer(container);

// Manually bind TestController if discovery fails
container.bind<TestController>(TestController).toSelf();

server.setConfig((app) => {
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));
    app.use(typeof cors === 'function' ? cors() : cors.default());
    app.use(typeof helmet === 'function' ? helmet() : helmet.default());
    app.use(typeof morgan === 'function' ? morgan("dev") : morgan.default("dev"));
});

const app = server.build();
const PORT = process.env.PORT || 5001;

async function initDb() {
    try {
        const userRepo = container.get<UserRepo>(TYPES.UserRepo);
        const contactRepo = container.get<ContactRepo>(TYPES.ContactRepo);
        const quotationRepo = container.get<any>(TYPES.QuotationRepo);
        const authService = container.get<AuthService>(TYPES.AuthService);
        const blogRepo = container.get<any>(TYPES.BlogRepo);
        const specificationsRepo = container.get<any>(TYPES.SpecificationsRepo);
        const analyticsRepo = container.get<any>(TYPES.AnalyticsRepo);
        const adsRepo = container.get<any>(TYPES.AdsRepo);
        const mailingContactRepo = container.get<MailingContactRepo>(TYPES.MailingContactRepo);

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
            const columns = await (blogRepo as any).db.query("SHOW COLUMNS FROM blog LIKE 'slug'");
            if (columns.length === 0) {
                await (blogRepo as any).db.query("ALTER TABLE blog ADD COLUMN slug VARCHAR(255) UNIQUE AFTER title");
                console.log("Added slug column to blog table.");
            }

            // Populate empty slugs
            const rowsWithoutSlug = await (blogRepo as any).db.query("SELECT id, title FROM blog WHERE slug IS NULL OR slug = ''");
            for (const row of rowsWithoutSlug) {
                const slug = row.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                await (blogRepo as any).db.query("UPDATE blog SET slug = ? WHERE id = ?", [slug, row.id]);
            }
        } catch (mErr) {
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
                await blogRepo.create(article as any);
            }
            console.log("Seeded 4 blog articles.");
        }
    } catch (error) {
        console.error("DB Init Error:", error);
    }
}

initDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on http://localhost:${PORT}`);
    });
});
