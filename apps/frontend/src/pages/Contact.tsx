import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";
import { SEO } from "@/components/common/SEO";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";
import { useTranslation } from "react-i18next";


export const Contact = () => {
    const { t } = useTranslation();
    usePageTitle(t('contact.title'));
    const navigate = useNavigate();
    const [phone, setPhone] = useState<string | undefined>();
    const [showSuccess, setShowSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post("/company/contact", { ...formData, phone });
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                navigate("/");
            }, 3000);
        } catch (error) {
            console.error(error);
            alert("Erreur lors de l'envoi du message.");
        } finally {
            setLoading(false);
        }
    };

    const contactSchema = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "mainEntity": {
            "@type": "LocalBusiness",
            "name": "NettmobInfotech",
            "image": "https://nettmobinfotech.fr/Logo.png",
            "telephone": "+33 7 66 39 09 92",
            "email": "contact@nettmobinfotech.fr",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "10 Rue du Colisée",
                "addressLocality": "Paris",
                "postalCode": "75008",
                "addressCountry": "FR"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 48.8720516,
                "longitude": 2.3040149
            },
            "url": "https://nettmobinfotech.fr/contact"
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <SEO
                title={t('contact.title')}
                description={t('contact.description')}
                keywords={t('contact.keywords')}
                schemaData={contactSchema}
            />
            <div className="container mx-auto px-4 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl lg:text-6xl font-bold font-['Outfit'] text-primary mb-6">{t('contact.hero.title')}</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        {t('contact.hero.desc')}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        {[
                            { icon: <MapPin />, title: t('contact.info.address.title'), detail: t('contact.info.address.detail') },
                            { icon: <Phone />, title: t('contact.info.phone.title'), detail: t('contact.info.phone.detail') },
                            { icon: <Mail />, title: t('contact.info.email.title'), detail: t('contact.info.email.detail') }
                        ].map((info, i) => (
                            <Card key={i} className="border-none shadow-premium bg-card rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform">
                                <CardContent className="p-8 flex items-center space-x-6">
                                    <div className="p-4 bg-accent/10 rounded-2xl text-accent">
                                        {React.cloneElement(info.icon as React.ReactElement<any>, { className: "h-6 w-6" })}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">{info.title}</h3>
                                        <p className="text-muted-foreground">{info.detail}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <Card className="border-none shadow-premium rounded-3xl overflow-hidden bg-card h-full">
                            <CardContent className="p-10">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">{t('contact.form.firstName')}</label>
                                            <Input
                                                required
                                                value={formData.firstName}
                                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                placeholder={t('contact.form.firstNamePlaceholder')}
                                                className="rounded-xl h-12 bg-background/50"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">{t('contact.form.lastName')}</label>
                                            <Input
                                                required
                                                value={formData.lastName}
                                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                placeholder={t('contact.form.lastNamePlaceholder')}
                                                className="rounded-xl h-12 bg-background/50"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">{t('contact.form.email')}</label>
                                            <Input
                                                required
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder={t('contact.form.emailPlaceholder')}
                                                className="rounded-xl h-12 bg-background/50"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">{t('contact.form.phone')}</label>
                                            <div className="phone-input-container">
                                                <PhoneInput
                                                    defaultCountry="FR"
                                                    placeholder={t('contact.form.phonePlaceholder')}
                                                    value={phone}
                                                    onChange={setPhone}
                                                    className="flex h-12 w-full rounded-xl border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">{t('contact.form.subject')}</label>
                                        <Input
                                            required
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            placeholder={t('contact.form.subjectPlaceholder')}
                                            className="rounded-xl h-12 bg-background/50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">{t('contact.form.message')}</label>
                                        <textarea
                                            required
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full min-h-[150px] p-4 rounded-xl border border-input bg-background/50 focus:ring-2 focus:ring-accent outline-none transition-all"
                                            placeholder={t('contact.form.messagePlaceholder')}
                                        ></textarea>
                                    </div>
                                    <Button disabled={loading} size="lg" className="w-full rounded-xl h-14 text-lg shadow-premium group">
                                        {loading ? t('contact.form.sending') : t('contact.form.send')}
                                        <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Map Section */}
                <div className="mt-16">
                    <Card className="border-none shadow-premium rounded-[25px] overflow-hidden bg-card">
                        <CardContent className="p-0 h-[450px]">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.221424510052!2d2.3040149768652136!3d48.87205160021644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66f8ec26685a7%3A0xe536d2466085a5e3!2s10%20Rue%20du%20Colis%C3%A9e%2C%2075008%20Paris!5e0!3m2!1sfr!2sfr!4v1710300000000!5m2!1sfr!2sfr"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Localisation NettmobInfotech"
                            ></iframe>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
                <DialogContent className="sm:max-w-md bg-card border-none shadow-premium rounded-3xl">
                    <DialogHeader className="flex flex-col items-center">
                        <div className="h-20 w-20 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle2 className="h-10 w-10 text-accent animate-bounce" />
                        </div>
                        <DialogTitle className="text-2xl font-bold font-['Outfit'] text-center">{t('contact.success.title')}</DialogTitle>
                        <DialogDescription className="text-center text-muted-foreground mt-2">
                            {t('contact.success.desc')}
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};
