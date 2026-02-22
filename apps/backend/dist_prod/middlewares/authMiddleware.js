"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = exports.authMiddleware = void 0;
const inversify_config_1 = require("../inversify.config");
const types_1 = require("../types");
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    const authService = inversify_config_1.container.get(types_1.TYPES.AuthService);
    const decoded = authService.verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
};
exports.authMiddleware = authMiddleware;
const adminMiddleware = (req, res, next) => {
    (0, exports.authMiddleware)(req, res, () => {
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: "Admin access required" });
        }
        next();
    });
};
exports.adminMiddleware = adminMiddleware;
//# sourceMappingURL=authMiddleware.js.map