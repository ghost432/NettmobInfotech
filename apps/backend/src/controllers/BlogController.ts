import { controller, httpGet, httpPost, httpPatch, httpDelete, request, response, requestParam, queryParam } from "inversify-express-utils";
import { Request, Response } from "express";
import { inject } from "inversify";
import { TYPES } from "../types";
import { BlogRepo, BlogPost } from "../repositories/BlogRepo";
import { adminMiddleware } from "../middlewares/authMiddleware";

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
