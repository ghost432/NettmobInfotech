import { injectable, inject } from "inversify";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TYPES } from "../types";
import { UserRepo, User } from "../repositories/UserRepo";

@injectable()
export class AuthService {
    private readonly JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

    constructor(@inject(TYPES.UserRepo) private userRepo: UserRepo) { }

    public async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    public async comparePassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

    public generateToken(user: User): string {
        return jwt.sign(
            { id: user.id, email: user.email, isAdmin: user.isAdmin },
            this.JWT_SECRET,
            { expiresIn: "7d" }
        );
    }

    public verifyToken(token: string): any {
        try {
            return jwt.verify(token, this.JWT_SECRET);
        } catch (e) {
            return null;
        }
    }
}
