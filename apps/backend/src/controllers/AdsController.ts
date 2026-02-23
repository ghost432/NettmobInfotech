import { controller, httpGet, httpPost, httpPatch, httpDelete, request, response, requestParam } from "inversify-express-utils";
import { Request, Response } from "express";
import { inject } from "inversify";
import { TYPES } from "../types";
import { AdsRepo } from "../repositories/AdsRepo";
import { adminMiddleware } from "../middlewares/authMiddleware";

@controller("/api/ads")
export class AdsController {
    constructor(
        @inject(TYPES.AdsRepo) private adsRepo: AdsRepo
    ) { }

    // Public: get ads for a specific page
    @httpGet("/")
    public async getAdsByPage(@request() req: Request, @response() res: Response) {
        try {
            const page = req.query.page as string;
            if (!page) {
                const all = await this.adsRepo.findAll();
                return res.json(all.filter(a => a.isActive));
            }
            const ads = await this.adsRepo.findByPage(page);
            return res.json(ads);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    // Admin: get all ads
    @httpGet("/admin", adminMiddleware)
    public async getAllAds(@request() req: Request, @response() res: Response) {
        try {
            const ads = await this.adsRepo.findAll();
            return res.json(ads);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    // Admin: create ad
    @httpPost("/admin", adminMiddleware)
    public async createAd(@request() req: Request, @response() res: Response) {
        try {
            const {
                title, description, imageUrl, buttonText, buttonUrl, format, pages, isActive,
                title_en, description_en, buttonText_en,
                title_es, description_es, buttonText_es,
                title_de, description_de, buttonText_de
            } = req.body;
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
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    // Admin: update ad
    @httpPatch("/admin/:id", adminMiddleware)
    public async updateAd(@requestParam("id") id: string, @request() req: Request, @response() res: Response) {
        try {
            await this.adsRepo.update(parseInt(id), req.body);
            const ad = await this.adsRepo.findById(parseInt(id));
            return res.json(ad);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    // Admin: delete ad
    @httpDelete("/admin/:id", adminMiddleware)
    public async deleteAd(@requestParam("id") id: string, @response() res: Response) {
        try {
            await this.adsRepo.delete(parseInt(id));
            return res.json({ success: true });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
