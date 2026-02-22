import "reflect-metadata";
import { injectable, inject } from "inversify";
import { controller, httpGet, httpPost, httpDelete, BaseHttpController } from "inversify-express-utils";
import { Request, Response } from "express";
import { TYPES } from "../types";
import { MailingContactRepo } from "../repositories/MailingContactRepo";
import nodemailer from "nodemailer";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 20 * 1024 * 1024 } });

// Middleware adapter for inversify-express-utils
const uploadMiddleware = (req: Request, res: Response, next: () => void) => {
    upload.single("file")(req as any, res as any, next as any);
};

// Email regex extractor
const extractEmails = (text: string): string[] => {
    const regex = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g;
    const found = text.match(regex) || [];
    return [...new Set(found.map(e => e.toLowerCase()))];
};

// SMTP transporter
const getTransporter = () =>
    nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 465,
        secure: process.env.SMTP_SECURE === "true",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

@controller("/api/mailing")
export class MailingController extends BaseHttpController {
    constructor(
        @inject(TYPES.MailingContactRepo) private mailingContactRepo: MailingContactRepo
    ) {
        super();
    }

    // GET /api/mailing/contacts
    @httpGet("/contacts")
    async getContacts(req: Request, res: Response) {
        try {
            const contacts = await this.mailingContactRepo.findAll();
            return res.json(contacts);
        } catch (err) {
            return res.status(500).json({ error: "Erreur lors du chargement des contacts" });
        }
    }

    // POST /api/mailing/contacts — body: { emails: string[], name?: string }
    @httpPost("/contacts")
    async addContacts(req: Request, res: Response) {
        try {
            const { emails, name } = req.body;
            if (!emails || !Array.isArray(emails)) {
                return res.status(400).json({ error: "emails (array) requis" });
            }
            const inserted = await this.mailingContactRepo.upsertMany(emails, name || "");
            return res.json({ inserted, message: `${inserted} nouveau(x) contact(s) ajouté(s)` });
        } catch (err) {
            return res.status(500).json({ error: "Erreur lors de l'ajout des contacts" });
        }
    }

    // DELETE /api/mailing/contacts/:id
    @httpDelete("/contacts/:id")
    async deleteContact(req: Request, res: Response) {
        try {
            await this.mailingContactRepo.deleteById(Number(req.params.id));
            return res.json({ success: true });
        } catch (err) {
            return res.status(500).json({ error: "Erreur lors de la suppression" });
        }
    }

    // POST /api/mailing/import — multipart/form-data: file (.docx or .pdf)
    @httpPost("/import", uploadMiddleware)
    async importFile(req: Request, res: Response) {
        try {
            const file = (req as any).file;
            if (!file) return res.status(400).json({ error: "Fichier requis" });

            let text = "";
            const mime = file.mimetype;
            const name = file.originalname.toLowerCase();

            if (name.endsWith(".docx") || mime.includes("word") || mime.includes("openxmlformats")) {
                const mammoth = await import("mammoth");
                const result = await mammoth.extractRawText({ buffer: file.buffer });
                text = result.value;
            } else if (name.endsWith(".pdf") || mime === "application/pdf") {
                const pdfParse = require("pdf-parse");
                const data = await pdfParse(file.buffer);
                text = data.text;
            } else {
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
        } catch (err: any) {
            console.error("Import error:", err);
            return res.status(500).json({ error: "Erreur lors de l'analyse du fichier", detail: err?.message });
        }
    }

    // POST /api/mailing/send — { subject, html, recipients: string[] }
    @httpPost("/send")
    async sendMail(req: Request, res: Response) {
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
        } catch (err: any) {
            console.error("Send mail error:", err);
            return res.status(500).json({ error: "Erreur lors de l'envoi", detail: err?.message });
        }
    }
}
