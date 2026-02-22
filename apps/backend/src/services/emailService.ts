import nodemailer from 'nodemailer';

class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '465'),
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });
    }

    async sendContactEmail(data: {
        nom: string;
        email: string;
        telephone?: string;
        message: string;
    }) {
        const recipients = process.env.EMAIL_TO?.split(',') || [];
        
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: recipients,
            subject: `Nouveau message de contact - ${data.nom}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Nouveau message de contact</h2>
                    <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
                        <p><strong>Nom:</strong> ${data.nom}</p>
                        <p><strong>Email:</strong> ${data.email}</p>
                        ${data.telephone ? `<p><strong>Téléphone:</strong> ${data.telephone}</p>` : ''}
                        <p><strong>Message:</strong></p>
                        <p style="white-space: pre-wrap;">${data.message}</p>
                    </div>
                    <p style="color: #666; font-size: 12px; margin-top: 20px;">
                        Ce message a été envoyé depuis le formulaire de contact de NettmobInfotech.
                    </p>
                </div>
            `
        };

        return await this.transporter.sendMail(mailOptions);
    }

    async sendQuoteEmail(data: {
        firstName: string;
        lastName: string;
        email: string;
        phone?: string;
        company?: string;
        services: string[];
        budget?: string;
        timeline?: string;
        details?: string;
    }) {
        const recipients = process.env.EMAIL_TO?.split(',') || [];
        
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: recipients,
            subject: `Nouvelle demande de devis - ${data.firstName} ${data.lastName}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Nouvelle demande de devis</h2>
                    <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
                        <h3 style="color: #666;">Informations du client</h3>
                        <p><strong>Nom:</strong> ${data.firstName} ${data.lastName}</p>
                        <p><strong>Email:</strong> ${data.email}</p>
                        ${data.phone ? `<p><strong>Téléphone:</strong> ${data.phone}</p>` : ''}
                        ${data.company ? `<p><strong>Société:</strong> ${data.company}</p>` : ''}
                        
                        <h3 style="color: #666; margin-top: 20px;">Détails du projet</h3>
                        <p><strong>Services demandés:</strong></p>
                        <ul>
                            ${data.services.map(service => `<li>${service}</li>`).join('')}
                        </ul>
                        ${data.budget ? `<p><strong>Budget estimé:</strong> ${data.budget}</p>` : ''}
                        ${data.timeline ? `<p><strong>Délai souhaité:</strong> ${data.timeline}</p>` : ''}
                        ${data.details ? `
                            <p><strong>Détails complémentaires:</strong></p>
                            <p style="white-space: pre-wrap;">${data.details}</p>
                        ` : ''}
                    </div>
                    <p style="color: #666; font-size: 12px; margin-top: 20px;">
                        Ce message a été envoyé depuis le formulaire de demande de devis de NettmobInfotech.
                    </p>
                </div>
            `
        };

        return await this.transporter.sendMail(mailOptions);
    }

    async sendCahierDesChargesEmail(data: any) {
        const recipients = process.env.EMAIL_TO?.split(',') || [];
        
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: recipients,
            subject: `Nouvelle demande de cahier des charges - ${data.nom || 'Anonyme'}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Nouvelle demande de cahier des charges</h2>
                    <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
                        ${Object.entries(data).map(([key, value]) => `
                            <p><strong>${key}:</strong> ${value}</p>
                        `).join('')}
                    </div>
                    <p style="color: #666; font-size: 12px; margin-top: 20px;">
                        Ce message a été envoyé depuis le formulaire cahier des charges de NettmobInfotech.
                    </p>
                </div>
            `
        };

        return await this.transporter.sendMail(mailOptions);
    }
}

export default new EmailService();
