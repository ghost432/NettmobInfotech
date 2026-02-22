import { controller, httpGet, httpPost, request, response } from "inversify-express-utils";
import { Request, Response } from "express";
import { inject } from "inversify";
import { TYPES } from "../types";
import { AuthService } from "../services/AuthService";
import { UserRepo } from "../repositories/UserRepo";
import { adminMiddleware } from "../middlewares/authMiddleware";

@controller("/api/auth")
export class AuthController {
    constructor(
        @inject(TYPES.AuthService) private authService: AuthService,
        @inject(TYPES.UserRepo) private userRepo: UserRepo
    ) { }

    @httpPost("/register")
    public async register(@request() req: Request, @response() res: Response) {
        try {
            const { email, password, firstName, lastName } = req.body;

            const existingUser = await this.userRepo.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }

            const hashedPassword = await this.authService.hashPassword(password);
            const userId = await this.userRepo.create({
                email,
                password: hashedPassword,
                firstName,
                lastName,
                isAdmin: false
            });

            return res.status(201).json({ id: userId, message: "User created" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    @httpPost("/login")
    public async login(@request() req: Request, @response() res: Response) {
        try {
            const { email, password } = req.body;

            const user = await this.userRepo.findByEmail(email);
            if (!user || !user.password) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const isMatch = await this.authService.comparePassword(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const token = this.authService.generateToken(user);
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    isAdmin: !!user.isAdmin
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    @httpGet("/admin/users", adminMiddleware)
    public async getUsers(@request() req: Request, @response() res: Response) {
        try {
            const users = await this.userRepo.findAll();
            return res.json(users);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    @httpPost("/admin/users", adminMiddleware)
    public async createUser(@request() req: Request, @response() res: Response) {
        try {
            const { email, password, firstName, lastName, isAdmin } = req.body;

            const existingUser = await this.userRepo.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }

            const hashedPassword = await this.authService.hashPassword(password);
            await this.userRepo.create({
                email,
                password: hashedPassword,
                firstName,
                lastName,
                isAdmin: !!isAdmin
            });

            return res.status(201).json({ message: "User created successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
