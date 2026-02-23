import { Link } from "react-router-dom";
import { Shield, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { usePageTitle } from "@/hooks/usePageTitle";
import { SEO } from "@/components/common/SEO";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/lib/i18nUtils";

export const PrivacyPolicy = () => {
    const { t } = useTranslation();
    usePageTitle(t('privacy.title'));

    return (
        <div className="min-h-screen bg-background py-20 px-4">
            <SEO
                title={t('privacy.title')}
                description={t('privacy.description')}
                keywords={t('privacy.keywords')}
            />
            {/* Hero Section */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="flex items-center justify-center mb-6">
                        <Shield className="h-16 w-16" />
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-center mb-4 font-['Outfit'] text-foreground">
                        {t('privacy.hero.title')}
                    </h1>
                    <p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto">
                        {t('privacy.hero.subtitle')}
                    </p>
                    <p className="text-sm text-center text-muted-foreground mt-4">
                        {t('privacy.hero.lastUpdate', { date: new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }) })}
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16">
                <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
                    <Card className="border-none shadow-premium rounded-[2rem] mb-8">
                        <CardContent className="p-8 lg:p-12 space-y-8">
                            {/* Introduction */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-primary font-['Outfit']">{t('privacy.intro.title')}</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    {t('privacy.intro.p1')}
                                </p>
                                <p className="text-muted-foreground leading-relaxed mt-4">
                                    {t('privacy.intro.p2')}
                                </p>
                            </div>

                            {/* Données Collectées */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-primary font-['Outfit']">{t('privacy.collected.title')}</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    {t('privacy.collected.desc')}
                                </p>
                                <div className="bg-accent/5 p-6 rounded-xl space-y-3">
                                    <h3 className="font-bold text-primary">{t('privacy.collected.quote.title')} :</h3>
                                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                        <li>{t('privacy.collected.quote.item1')}</li>
                                        <li>{t('privacy.collected.quote.item2')}</li>
                                        <li>{t('privacy.collected.quote.item3')}</li>
                                        <li>{t('privacy.collected.quote.item4')}</li>
                                        <li>{t('privacy.collected.quote.item5')}</li>
                                    </ul>
                                </div>
                                <div className="bg-accent/5 p-6 rounded-xl space-y-3 mt-4">
                                    <h3 className="font-bold text-primary">{t('privacy.collected.cahier.title')} :</h3>
                                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                        <li>{t('privacy.collected.cahier.item1')}</li>
                                        <li>{t('privacy.collected.cahier.item2')}</li>
                                        <li>{t('privacy.collected.cahier.item3')}</li>
                                        <li>{t('privacy.collected.cahier.item4')}</li>
                                        <li>{t('privacy.collected.cahier.item5')}</li>
                                        <li>{t('privacy.collected.cahier.item6')}</li>
                                        <li>{t('privacy.collected.cahier.item7')}</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Finalité du Traitement */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-primary font-['Outfit']">{t('privacy.purpose.title')}</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    {t('privacy.purpose.desc')}
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                    <li>{t('privacy.purpose.item1')}</li>
                                    <li>{t('privacy.purpose.item2')}</li>
                                    <li>{t('privacy.purpose.item3')}</li>
                                    <li>{t('privacy.purpose.item4')}</li>
                                    <li>{t('privacy.purpose.item5')}</li>
                                </ul>
                            </div>

                            {/* Base Légale */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-primary font-['Outfit']">{t('privacy.legal.title')}</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    {t('privacy.legal.desc')}
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mt-4">
                                    <li><strong>{t('privacy.legal.item1.label')}</strong> : {t('privacy.legal.item1.value')}</li>
                                    <li><strong>{t('privacy.legal.item2.label')}</strong> : {t('privacy.legal.item2.value')}</li>
                                    <li><strong>{t('privacy.legal.item3.label')}</strong> : {t('privacy.legal.item3.value')}</li>
                                </ul>
                            </div>

                            {/* Conservation des Données */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-primary font-['Outfit']">{t('privacy.retention.title')}</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    {t('privacy.retention.p1')}
                                </p>
                                <p className="text-muted-foreground leading-relaxed mt-4">
                                    {t('privacy.retention.p2')}
                                </p>
                            </div>

                            {/* Sécurité */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-primary font-['Outfit']">{t('privacy.security.title')}</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    {t('privacy.security.desc')}
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mt-4">
                                    <li>{t('privacy.security.item1')}</li>
                                    <li>{t('privacy.security.item2')}</li>
                                    <li>{t('privacy.security.item3')}</li>
                                    <li>{t('privacy.security.item4')}</li>
                                </ul>
                            </div>

                            {/* Vos Droits */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-primary font-['Outfit']">{t('privacy.rights_top.title')}</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    {t('privacy.rights_top.desc')}
                                </p>
                                <div className="space-y-3">
                                    <div className="bg-accent/5 p-4 rounded-xl">
                                        <h3 className="font-bold text-primary mb-2">{t('privacy.rights_top.access.title')}</h3>
                                        <p className="text-sm text-muted-foreground">{t('privacy.rights_top.access.desc')}</p>
                                    </div>
                                    <div className="bg-accent/5 p-4 rounded-xl">
                                        <h3 className="font-bold text-primary mb-2">{t('privacy.rights_top.rectification.title')}</h3>
                                        <p className="text-sm text-muted-foreground">{t('privacy.rights_top.rectification.desc')}</p>
                                    </div>
                                    <div className="bg-accent/5 p-4 rounded-xl">
                                        <h3 className="font-bold text-primary mb-2">{t('privacy.rights_top.erasure.title')}</h3>
                                        <p className="text-sm text-muted-foreground">{t('privacy.rights_top.erasure.desc')}</p>
                                    </div>
                                    <div className="bg-accent/5 p-4 rounded-xl">
                                        <h3 className="font-bold text-primary mb-2">{t('privacy.rights_top.opposition.title')}</h3>
                                        <p className="text-sm text-muted-foreground">{t('privacy.rights_top.opposition.desc')}</p>
                                    </div>
                                    <div className="bg-accent/5 p-4 rounded-xl">
                                        <h3 className="font-bold text-primary mb-2">{t('privacy.rights_top.portability.title')}</h3>
                                        <p className="text-sm text-muted-foreground">{t('privacy.rights_top.portability.desc')}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Contact */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-primary font-['Outfit']">{t('privacy.contact.title')}</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    {t('privacy.contact.p1')}
                                </p>
                                <div className="bg-primary/5 p-6 rounded-xl space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Mail className="h-5 w-5 text-primary" />
                                        <div>
                                            <p className="font-bold text-primary">{t('privacy.contact.email')}</p>
                                            <a href="mailto:contact@nettmobinfotech.fr" className="text-accent hover:underline">
                                                contact@nettmobinfotech.fr
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Shield className="h-5 w-5 text-primary" />
                                        <div>
                                            <p className="font-bold text-primary">{t('privacy.contact.mail')}</p>
                                            <p className="text-sm text-muted-foreground whitespace-pre-line">
                                                {t('privacy.contact.address')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground mt-4">
                                    {t('privacy.contact.complaint')}
                                    <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">www.cnil.fr</a>
                                </p>
                            </div>

                            {/* Cookies */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-primary font-['Outfit']">{t('privacy.cookies.title')}</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    {t('privacy.cookies.desc')}
                                </p>
                            </div>

                            {/* Modification */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-primary font-['Outfit']">{t('privacy.modification.title')}</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    {t('privacy.modification.desc')}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* CTA Section */}
                    <div className="text-center">
                        <Link
                            to={getLocalizedPath("/contact")}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-full hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl font-bold"
                        >
                            {t('privacy.cta')}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};
