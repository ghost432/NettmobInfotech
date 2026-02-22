import { controller, httpGet, httpPost, httpPatch, request, response, requestParam } from "inversify-express-utils";
import { Request, Response } from "express";
import { inject } from "inversify";
import { TYPES } from "../types";
import { ContactRepo } from "../repositories/ContactRepo";
import { QuotationRepo } from "../repositories/QuotationRepo";
import { SpecificationsRepo } from "../repositories/SpecificationsRepo";
import { UserRepo } from "../repositories/UserRepo";
import { AnalyticsRepo } from "../repositories/AnalyticsRepo";
import { adminMiddleware } from "../middlewares/authMiddleware";
import emailService from "../services/emailService";

@controller("/api/company")
export class CompanyController {
    constructor(
        @inject(TYPES.ContactRepo) private contactRepo: ContactRepo,
        @inject(TYPES.QuotationRepo) private quotationRepo: QuotationRepo,
        @inject(TYPES.SpecificationsRepo) private specificationsRepo: SpecificationsRepo,
        @inject(TYPES.UserRepo) private userRepo: UserRepo,
        @inject(TYPES.AnalyticsRepo) private analyticsRepo: AnalyticsRepo
    ) { }

    @httpGet("/admin/stats", adminMiddleware)
    public async getStats(req: Request, res: Response) {
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
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    @httpGet("/info")
    public async getInfo(req: Request, res: Response) {
        return res.json({
            name: "NettmobInfotech",
            address: "10 Rue du Colisée, 75008 Paris, France",
            email: "contact@nettmobinfotech.fr",
            phone: "+33 7 66 39 09 92",
            mission: "Offrir des solutions informatiques innovantes et fiables.",
        });
    }

    @httpGet("/services")
    public async getServices(req: Request, res: Response) {
        return res.json([
            { id: 1, title: "Design Graphique", description: "Création d'identités visuelles percutantes." },
            { id: 2, title: "Création de Contenu", description: "Rédaction et production de contenus engageants." },
            { id: 3, title: "Création de Site Web", description: "Développement de sites vitrines et e-commerce." },
            { id: 4, title: "Développement Mobile", description: "Applications iOS et Android sur mesure." },
            { id: 5, title: "Marketing Digital", description: "Stratégies de croissance en ligne." },
            { id: 6, title: "SEO", description: "Optimisation pour les moteurs de recherche." },
        ]);
    }

    @httpPost("/contact")
    public async submitContact(@request() req: Request, @response() res: Response) {
        try {
            await this.contactRepo.create(req.body);
            // Send email notification
            try {
                await emailService.sendContactEmail(req.body);
            } catch (emailError) {
                console.error("Failed to send contact email:", emailError);
            }
            return res.status(201).json({ message: "votre message a ete recu notre equipe vous contact sous peut" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    @httpGet("/admin/messages", adminMiddleware)
    public async getMessages(req: Request, res: Response) {
        try {
            const type = req.query.type as string; // 'recent' or 'archive'
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || (type === 'archive' ? 20 : 10);
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
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    @httpGet("/admin/messages/count", adminMiddleware)
    public async getCount(req: Request, res: Response) {
        try {
            const count = await this.contactRepo.getUnreadCount();
            return res.json({ unreadCount: count });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    @httpPatch("/admin/messages/:id/read", adminMiddleware)
    public async markAsRead(@requestParam("id") id: string, res: Response) {
        try {
            await this.contactRepo.markAsRead(parseInt(id));
            return res.json({ success: true });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    // Quotation Endpoints
    @httpPost("/quotation")
    public async submitQuotation(@request() req: Request, @response() res: Response) {
        try {
            await this.quotationRepo.create(req.body);
            // Send email notification
            try {
                await emailService.sendQuoteEmail(req.body);
            } catch (emailError) {
                console.error("Failed to send quote email:", emailError);
            }
            return res.status(201).json({ message: "Votre demande de devis a été reçue avec succès." });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    @httpGet("/admin/quotations", adminMiddleware)
    public async getQuotations(req: Request, res: Response) {
        try {
            const type = req.query.type as string; // 'recent' or 'archive'
            const page = parseInt(req.query.page as string) || 1;
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
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    @httpGet("/admin/quotations/count", adminMiddleware)
    public async getQuoteCount(req: Request, res: Response) {
        try {
            const count = await this.quotationRepo.getUnreadCount();
            return res.json({ unreadCount: count });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    @httpPatch("/admin/quotations/:id/read", adminMiddleware)
    public async markQuoteAsRead(@requestParam("id") id: string, res: Response) {
        try {
            await this.quotationRepo.markAsRead(parseInt(id));
            return res.json({ success: true });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    // Specifications Endpoints
    @httpPost("/specifications")
    public async submitSpecification(@request() req: Request, @response() res: Response) {
        try {
            await this.specificationsRepo.create(req.body);
            // Send email notification
            try {
                await emailService.sendCahierDesChargesEmail(req.body);
            } catch (emailError) {
                console.error("Failed to send specifications email:", emailError);
            }
            return res.status(201).json({ message: "Votre cahier des charges a été reçu avec succès. Vous serez contacté sous peu." });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    @httpGet("/admin/specifications", adminMiddleware)
    public async getSpecifications(req: Request, res: Response) {
        try {
            const type = req.query.type as string; // 'recent' or 'archive'
            const page = parseInt(req.query.page as string) || 1;
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
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    @httpGet("/admin/specifications/count", adminMiddleware)
    public async getSpecCount(req: Request, res: Response) {
        try {
            const count = await this.specificationsRepo.getUnreadCount();
            return res.json({ unreadCount: count });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    @httpPatch("/admin/specifications/:id/status", adminMiddleware)
    public async updateSpecStatus(@requestParam("id") id: string, @request() req: Request, @response() res: Response) {
        try {
            const { status } = req.body;
            if (!['read', 'archived'].includes(status)) {
                return res.status(400).json({ message: "Invalid status" });
            }
            await this.specificationsRepo.updateStatus(parseInt(id), status);
            return res.json({ success: true });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    // Analytics Endpoints
    @httpPost("/analytics")
    public async trackPageView(@request() req: Request, @response() res: Response) {
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
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    @httpGet("/admin/analytics/stats", adminMiddleware)
    public async getAnalyticsStats(@request() req: Request, @response() res: Response) {
        try {
            const stats = await this.analyticsRepo.getStats();
            return res.json(stats);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    @httpGet("/admin/analytics/pages", adminMiddleware)
    public async getPageViews(@request() req: Request, @response() res: Response) {
        try {
            const { startDate, endDate } = req.query;
            const pageViews = await this.analyticsRepo.getPageViews(
                startDate as string,
                endDate as string
            );
            return res.json(pageViews);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    @httpGet("/admin/analytics/geography", adminMiddleware)
    public async getGeography(@request() req: Request, @response() res: Response) {
        try {
            const data = await this.analyticsRepo.getGeographicData();
            return res.json(data);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    @httpGet("/admin/analytics/views-over-time", adminMiddleware)
    public async getViewsOverTime(@request() req: Request, @response() res: Response) {
        try {
            const days = parseInt(req.query.days as string) || 30;
            const data = await this.analyticsRepo.getViewsOverTime(days);
            return res.json(data);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    @httpGet("/admin/analytics/browsers", adminMiddleware)
    public async getBrowserStats(@request() req: Request, @response() res: Response) {
        try {
            const data = await this.analyticsRepo.getBrowserStats();
            return res.json(data);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    @httpGet("/admin/analytics/devices", adminMiddleware)
    public async getDeviceStats(@request() req: Request, @response() res: Response) {
        try {
            const data = await this.analyticsRepo.getDeviceStats();
            return res.json(data);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
