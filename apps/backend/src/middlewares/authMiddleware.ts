import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/AuthService";
import { container } from "../inversify.config";
import { TYPES } from "../types";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const authService = container.get<AuthService>(TYPES.AuthService);
    const decoded = authService.verifyToken(token);

    if (!decoded) {
        return res.status(401).json({ message: "Invalid token" });
    }

    (req as any).user = decoded;
    next();
};

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    authMiddleware(req, res, () => {
        if (!(req as any).user.isAdmin) {
            return res.status(403).json({ message: "Admin access required" });
        }
        next();
    });
};
