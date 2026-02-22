"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailingController = void 0;
require("reflect-metadata");
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
const types_1 = require("../types");
const MailingContactRepo_1 = require("../repositories/MailingContactRepo");
const nodemailer_1 = __importDefault(require("nodemailer"));
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage(), limits: { fileSize: 20 * 1024 * 1024 } });
// Middleware adapter for inversify-express-utils
const uploadMiddleware = (req, res, next) => {
    upload.single("file")(req, res, next);
};
// Email regex extractor
const extractEmails = (text) => {
    const regex = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g;
    const found = text.match(regex) || [];
    return [...new Set(found.map(e => e.toLowerCase()))];
};
// SMTP transporter
const getTransporter = () => nodemailer_1.default.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});
let MailingController = class MailingController extends inversify_express_utils_1.BaseHttpController {
    constructor(mailingContactRepo) {
        super();
        this.mailingContactRepo = mailingContactRepo;
    }
    // GET /api/mailing/contacts
    async getContacts(req, res) {
        try {
            const contacts = await this.mailingContactRepo.findAll();
            return res.json(contacts);
        }
        catch (err) {
            return res.status(500).json({ error: "Erreur lors du chargement des contacts" });
        }
    }
    // POST /api/mailing/contacts — body: { emails: string[], name?: string }
    async addContacts(req, res) {
        try {
            const { emails, name } = req.body;
            if (!emails || !Array.isArray(emails)) {
                return res.status(400).json({ error: "emails (array) requis" });
            }
            const inserted = await this.mailingContactRepo.upsertMany(emails, name || "");
            return res.json({ inserted, message: `${inserted} nouveau(x) contact(s) ajouté(s)` });
        }
        catch (err) {
            return res.status(500).json({ error: "Erreur lors de l'ajout des contacts" });
        }
    }
    // DELETE /api/mailing/contacts/:id
    async deleteContact(req, res) {
        try {
            await this.mailingContactRepo.deleteById(Number(req.params.id));
            return res.json({ success: true });
        }
        catch (err) {
            return res.status(500).json({ error: "Erreur lors de la suppression" });
        }
    }
    // POST /api/mailing/import — multipart/form-data: file (.docx or .pdf)
    async importFile(req, res) {
        try {
            const file = req.file;
            if (!file)
                return res.status(400).json({ error: "Fichier requis" });
            let text = "";
            const mime = file.mimetype;
            const name = file.originalname.toLowerCase();
            if (name.endsWith(".docx") || mime.includes("word") || mime.includes("openxmlformats")) {
                const mammoth = await Promise.resolve().then(() => __importStar(require("mammoth")));
                const result = await mammoth.extractRawText({ buffer: file.buffer });
                text = result.value;
            }
            else if (name.endsWith(".pdf") || mime === "application/pdf") {
                const pdfParse = require("pdf-parse");
                const data = await pdfParse(file.buffer);
                text = data.text;
            }
            else {
                // Try as plain text
                text = file.buffer.toString("utf-8");
            }
            const emails = extractEmails(text);
            // Auto-save to contacts
            const { save } = req.query;
            let inserted = 0;
            if (save === "true" && emails.length > 0) {
                inserted = await this.mailingContactRepo.upsertMany(emails);
            }
            return res.json({ emails, count: emails.length, inserted });
        }
        catch (err) {
            console.error("Import error:", err);
            return res.status(500).json({ error: "Erreur lors de l'analyse du fichier", detail: err?.message });
        }
    }
    // POST /api/mailing/send — { subject, html, recipients: string[] }
    async sendMail(req, res) {
        try {
            const { subject, html, recipients } = req.body;
            if (!subject || !html || !Array.isArray(recipients) || recipients.length === 0) {
                return res.status(400).json({ error: "subject, html et recipients (array) requis" });
            }
            const transporter = getTransporter();
            await transporter.verify();
            // Send to each recipient individually (BCC-style via multiple sends or BCC)
            const info = await transporter.sendMail({
                from: `"NettmobInfotech" <${process.env.EMAIL_FROM}>`,
                bcc: recipients.join(","),
                subject,
                html,
            });
            return res.json({
                success: true,
                messageId: info.messageId,
                sent: recipients.length,
            });
        }
        catch (err) {
            console.error("Send mail error:", err);
            return res.status(500).json({ error: "Erreur lors de l'envoi", detail: err?.message });
        }
    }
};
exports.MailingController = MailingController;
__decorate([
    (0, inversify_express_utils_1.httpGet)("/contacts"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MailingController.prototype, "getContacts", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)("/contacts"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MailingController.prototype, "addContacts", null);
__decorate([
    (0, inversify_express_utils_1.httpDelete)("/contacts/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MailingController.prototype, "deleteContact", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)("/import", uploadMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MailingController.prototype, "importFile", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)("/send"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MailingController.prototype, "sendMail", null);
exports.MailingController = MailingController = __decorate([
    (0, inversify_express_utils_1.controller)("/api/mailing"),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.MailingContactRepo)),
    __metadata("design:paramtypes", [MailingContactRepo_1.MailingContactRepo])
], MailingController);
//# sourceMappingURL=MailingController.js.map