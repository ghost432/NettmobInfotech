import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Linkedin, Instagram, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { servicesData } from "@/data/servicesData";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/lib/i18nUtils";

export const Footer = () => {
    const { t } = useTranslation();
    return (
        <footer className="py-20 bg-background text-foreground transition-all duration-300">
            <div className="container mx-auto px-4 lg:px-8">
                <Card className="border-none shadow-premium rounded-[3rem] overflow-hidden bg-card mb-12">
                    <CardContent className="p-12 lg:p-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                            {/* Column 1: Identity */}
                            <div className="space-y-6">
                                <Link to={getLocalizedPath("/")} className="flex items-center space-x-2">
                                    <img src="/Logo.png" alt="NettmobInfotech" className="h-10 w-auto object-contain dark:hidden" />
                                    <img src="/Logo-white.png" alt="NettmobInfotech" className="h-10 w-auto object-contain hidden dark:block" />
                                </Link>
                                <p className="text-muted-foreground leading-relaxed italic">
                                    {t('footer.slogan')}
                                </p>
                                <p className="text-muted-foreground text-sm">
                                    {t('footer.description')}
                                </p>
                                <div className="flex items-center space-x-4">
                                    {[
                                        { icon: <Facebook />, href: "https://www.facebook.com/NettmobInfoTech/" },
                                        { icon: <Linkedin />, href: "https://www.linkedin.com/company/nettmob-infotech" },
                                        { icon: <Instagram />, href: "https://www.instagram.com/nettmobinfotech/" }
                                    ].map((social, i) => (
                                        <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="p-2 bg-accent/10 rounded-xl text-accent hover:bg-accent hover:text-white transition-all">
                                            {React.cloneElement(social.icon as React.ReactElement<any>, { className: "h-5 w-5" })}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Column 2: Services */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold font-['Outfit']">{t('footer.prestations')}</h3>
                                <ul className="space-y-3">
                                    {servicesData.map((service) => (
                                        <li key={service.slug}>
                                            <Link to={getLocalizedPath(`/services/${service.slug}`)} className="text-muted-foreground hover:text-accent flex items-center group transition-all">
                                                <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all font-bold" />
                                                {t(service.title)}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Column 3: Useful Links */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold font-['Outfit']">{t('footer.usefulLinks')}</h3>
                                <ul className="space-y-3">
                                    {[
                                        { label: t('footer.about'), href: "/a-propos" },
                                        { label: t('footer.contactUs'), href: "/contact" },
                                        { label: t('footer.specifications'), href: "/cahier-des-charges" },
                                        { label: t('footer.privacy'), href: "/politique-confidentialite" },
                                        { label: t('footer.rgpd'), href: "/rgpd" }
                                    ].map((link, i) => (
                                        <li key={i}>
                                            <Link to={getLocalizedPath(link.href)} className="text-muted-foreground hover:text-accent flex items-center group transition-all">
                                                <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all font-bold" />
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Column 4: Contact */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold font-['Outfit']">{t('footer.contact')}</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-4">
                                        <div className="p-3 bg-accent/10 rounded-xl text-accent">
                                            <MapPin className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">{t('footer.address')}</p>
                                            <p className="text-muted-foreground text-sm">10 Rue du Colisée, 75008 Paris</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <div className="p-3 bg-accent/10 rounded-xl text-accent">
                                            <Phone className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">{t('footer.phone')}</p>
                                            <p className="text-muted-foreground text-sm">+33 7 66 39 09 92</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <div className="p-3 bg-accent/10 rounded-xl text-accent">
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">{t('footer.email')}</p>
                                            <p className="text-muted-foreground text-sm">contact@nettmobinfotech.fr</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex flex-col md:flex-row justify-between items-center px-12 text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} NettmobInfotech. {t('footer.rights')}</p>
                    <p className="mt-2 md:mt-0 opacity-70">
                        {t('footer.poweredBy')} <span className="text-primary font-bold">Nettmob Infotech</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};
