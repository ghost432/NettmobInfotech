import { controller, httpGet, httpPost, httpPatch, httpDelete, request, response, requestParam, queryParam } from "inversify-express-utils";
import { Request, Response } from "express";
import { inject } from "inversify";
import { TYPES } from "../types";
import { BlogRepo, BlogPost } from "../repositories/BlogRepo";
import { adminMiddleware } from "../middlewares/authMiddleware";
import * as https from "https";

@controller("/api/blog")
export class BlogController {
    constructor(
        @inject(TYPES.BlogRepo) private blogRepo: BlogRepo
    ) { }

    @httpGet("/")
    public async getPosts(
        @queryParam("page") pageStr: string,
        @queryParam("limit") limitStr: string,
        @response() res: Response
    ) {
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
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    @httpGet("/:id")
    public async getPost(@requestParam("id") id: string, @response() res: Response) {
        try {
            const post = await this.blogRepo.findById(parseInt(id));
            if (!post) return res.status(404).json({ message: "Article non trouvé" });
            return res.json(post);
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    @httpGet("/slug/:slug")
    public async getPostBySlug(@requestParam("slug") slug: string, @response() res: Response) {
        try {
            const post = await this.blogRepo.findBySlug(slug);
            if (!post) return res.status(404).json({ message: "Article non trouvé" });
            return res.json(post);
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    @httpPost("/:id/feedback")
    public async addFeedback(
        @requestParam("id") id: string,
        @request() req: Request,
        @response() res: Response
    ) {
        try {
            const { isUseful } = req.body;
            await this.blogRepo.addFeedback(parseInt(id), !!isUseful);
            return res.json({ success: true });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    // Admin Endpoints
    @httpPost("/translate", adminMiddleware)
    public async translateText(@request() req: Request, @response() res: Response) {
        console.log("Entering translateText with body:", req.body);
        try {
            const { text, targetLang } = req.body;
            if (!text || !targetLang) return res.status(400).json({ message: "text and targetLang are required" });

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

            const data = await new Promise<any>((resolve, reject) => {
                const request = https.request(reqOptions, (resObj) => {
                    let responseData = "";
                    resObj.on("data", chunk => responseData += chunk);
                    resObj.on("end", () => {
                        if (resObj.statusCode && resObj.statusCode >= 400) {
                            reject(new Error(`DeepL API Error (${resObj.statusCode}): ${responseData}`));
                        } else {
                            try {
                                resolve(JSON.parse(responseData));
                            } catch (e) {
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
        } catch (error) {
            console.error("Translation error Caught:", error);
            return res.status(500).json({ message: "Internal server error during translation" });
        }
    }

    @httpPost("/", adminMiddleware)
    public async createPost(@request() req: Request, @response() res: Response) {
        try {
            const id = await this.blogRepo.create(req.body);
            return res.status(201).json({ id, message: "Article créé avec succès" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    @httpPatch("/:id", adminMiddleware)
    public async updatePost(
        @requestParam("id") id: string,
        @request() req: Request,
        @response() res: Response
    ) {
        try {
            await this.blogRepo.update(parseInt(id), req.body);
            return res.json({ message: "Article mis à jour avec succès" });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    @httpDelete("/:id", adminMiddleware)
    public async deletePost(@requestParam("id") id: string, @response() res: Response) {
        try {
            await this.blogRepo.delete(parseInt(id));
            return res.json({ message: "Article supprimé avec succès" });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
