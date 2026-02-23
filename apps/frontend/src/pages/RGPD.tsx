import { Link } from "react-router-dom";
import { Lock, Shield, Eye, FileText, UserCheck, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { usePageTitle } from "@/hooks/usePageTitle";
import { SEO } from "@/components/common/SEO";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/lib/i18nUtils";

export const RGPD = () => {
    const { t } = useTranslation();
    usePageTitle(t('rgpd.title'));

    return (
        <div className="min-h-screen bg-background py-20 px-4">
            <SEO
                title={t('rgpd.title')}
                description={t('rgpd.description')}
                keywords={t('rgpd.keywords')}
            />
            {/* Hero Section */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="flex items-center justify-center mb-6">
                        <Lock className="h-16 w-16" />
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-center mb-4 font-['Outfit'] text-foreground">
                        {t('rgpd.hero.title')}
                    </h1>
                    <p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto">
                        {t('rgpd.hero.subtitle')}
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16">
                <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
                    <Card className="border-none shadow-premium rounded-[2rem] mb-8">
                        <CardContent className="p-8 lg:p-12 space-y-8">
                            {/* Introduction RGPD */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-primary font-['Outfit']">{t('rgpd.what.title')}</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    {t('rgpd.what.p1')}
                                </p>
                                <p className="text-muted-foreground leading-relaxed mt-4">
                                    {t('rgpd.what.p2')}
                                </p>
                            </div>

                            {/* Responsable du Traitement */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-primary font-['Outfit']">{t('rgpd.responsible.title')}</h2>
                                <div className="bg-primary/5 p-6 rounded-xl space-y-2">
                                    <p className="font-bold text-primary">NettmobInfotech</p>
                                    <p className="text-muted-foreground">10 Rue du Colisée, 75008 Paris, France</p>
                                    <p className="text-muted-foreground">{t('rgpd.responsible.email')} : contact@nettmobinfotech.fr</p>
                                    <p className="text-muted-foreground">{t('rgpd.responsible.phone')} : +33 7 66 39 09 92</p>
                                </div>
                            </div>

                            {/* Vos Droits en Détail */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-primary font-['Outfit']">{t('rgpd.rights_detail.title')}</h2>
                                <p className="text-muted-foreground leading-relaxed mb-6">
                                    {t('rgpd.rights_detail.desc')}
                                </p>

                                <div className="space-y-4">
                                    <Card className="border border-accent/20">
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4">
                                                <Eye className="h-6 w-6 text-accent mt-1" />
                                                <div>
                                                    <h3 className="font-bold text-primary mb-2">{t('rgpd.rights.access.title')}</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {t('rgpd.rights.access.desc')}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="border border-accent/20">
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4">
                                                <FileText className="h-6 w-6 text-accent mt-1" />
                                                <div>
                                                    <h3 className="font-bold text-primary mb-2">{t('rgpd.rights.rectification.title')}</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {t('rgpd.rights.rectification.desc')}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="border border-accent/20">
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4">
                                                <Shield className="h-6 w-6 text-accent mt-1" />
                                                <div>
                                                    <h3 className="font-bold text-primary mb-2">{t('rgpd.rights.erasure.title')}</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {t('rgpd.rights.erasure.desc')}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="border border-accent/20">
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4">
                                                <Lock className="h-6 w-6 text-accent mt-1" />
                                                <div>
                                                    <h3 className="font-bold text-primary mb-2">{t('rgpd.rights.limitation.title')}</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {t('rgpd.rights.limitation.desc')}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="border border-accent/20">
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4">
                                                <UserCheck className="h-6 w-6 text-accent mt-1" />
                                                <div>
                                                    <h3 className="font-bold text-primary mb-2">{t('rgpd.rights.portability.title')}</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {t('rgpd.rights.portability.desc')}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="border border-accent/20">
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4">
                                                <Shield className="h-6 w-6 text-accent mt-1" />
                                                <div>
                                                    <h3 className="font-bold text-primary mb-2">{t('rgpd.rights.opposition.title')}</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {t('rgpd.rights.opposition.desc')}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>

                            {/* Base Légale */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-primary font-['Outfit']">{t('rgpd.legal_basis.title')}</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    {t('rgpd.legal_basis.desc')}
                                </p>
                                <div className="space-y-3">
                                    <div className="bg-accent/5 p-4 rounded-xl">
                                        <h3 className="font-bold text-primary mb-2">{t('rgpd.basis.consent.title')}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {t('rgpd.basis.consent.desc')}
                                        </p>
                                    </div>
                                    <div className="bg-accent/5 p-4 rounded-xl">
                                        <h3 className="font-bold text-primary mb-2">{t('rgpd.basis.contract.title')}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {t('rgpd.basis.contract.desc')}
                                        </p>
                                    </div>
                                    <div className="bg-accent/5 p-4 rounded-xl">
                                        <h3 className="font-bold text-primary mb-2">{t('rgpd.basis.interest.title')}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {t('rgpd.basis.interest.desc')}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Durée de Conservation */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-primary font-['Outfit']">{t('rgpd.retention.title')}</h2>
                                <div className="bg-primary/5 p-6 rounded-xl">
                                    <p className="text-muted-foreground leading-relaxed mb-4">
                                        {t('rgpd.retention.desc')}
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                        <li><strong>{t('rgpd.retention.prospects.label')}</strong> : {t('rgpd.retention.prospects.value')}</li>
                                        <li><strong>{t('rgpd.retention.clients.label')}</strong> : {t('rgpd.retention.clients.value')}</li>
                                        <li><strong>{t('rgpd.retention.connection.label')}</strong> : {t('rgpd.retention.connection.value')}</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Sécurité */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-primary font-['Outfit']">{t('rgpd.security.title')}</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    {t('rgpd.security.desc')}
                                </p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-accent/5 p-4 rounded-xl">
                                        <h3 className="font-bold text-primary mb-2 text-sm">{t('rgpd.security.encryption.title')}</h3>
                                        <p className="text-xs text-muted-foreground">
                                            {t('rgpd.security.encryption.desc')}
                                        </p>
                                    </div>
                                    <div className="bg-accent/5 p-4 rounded-xl">
                                        <h3 className="font-bold text-primary mb-2 text-sm">{t('rgpd.security.access.title')}</h3>
                                        <p className="text-xs text-muted-foreground">
                                            {t('rgpd.security.access.desc')}
                                        </p>
                                    </div>
                                    <div className="bg-accent/5 p-4 rounded-xl">
                                        <h3 className="font-bold text-primary mb-2 text-sm">{t('rgpd.security.backup.title')}</h3>
                                        <p className="text-xs text-muted-foreground">
                                            {t('rgpd.security.backup.desc')}
                                        </p>
                                    </div>
                                    <div className="bg-accent/5 p-4 rounded-xl">
                                        <h3 className="font-bold text-primary mb-2 text-sm">{t('rgpd.security.monitoring.title')}</h3>
                                        <p className="text-xs text-muted-foreground">
                                            {t('rgpd.security.monitoring.desc')}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Transferts de Données */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-primary font-['Outfit']">{t('rgpd.transfer.title')}</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    {t('rgpd.transfer.desc')}
                                </p>
                            </div>

                            {/* Violation de Données */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-primary font-['Outfit']">{t('rgpd.breach.title')}</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    {t('rgpd.breach.desc')}
                                </p>
                            </div>

                            {/* Exercer Vos Droits */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-primary font-['Outfit']">{t('rgpd.exercise.title')}</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    {t('rgpd.exercise.desc')}
                                </p>
                                <div className="bg-accent/5 p-6 rounded-xl space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Mail className="h-5 w-5 text-accent mt-1" />
                                        <div>
                                            <p className="font-bold text-primary">{t('rgpd.exercise.email.label')}</p>
                                            <a href="mailto:contact@nettmobinfotech.fr" className="text-accent hover:underline">
                                                contact@nettmobinfotech.fr
                                            </a>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {t('rgpd.exercise.email.subject')}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <FileText className="h-5 w-5 text-accent mt-1" />
                                        <div>
                                            <p className="font-bold text-primary">{t('rgpd.exercise.post.label')}</p>
                                            <p className="text-sm text-muted-foreground whitespace-pre-line">
                                                {t('rgpd.exercise.post.address')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground mt-4">
                                    {t('rgpd.exercise.delay')}
                                </p>
                                <p className="text-sm text-muted-foreground mt-4">
                                    {t('rgpd.exercise.id')}
                                </p>
                            </div>

                            {/* Réclamation */}
                            <div className="bg-primary/5 p-6 rounded-xl">
                                <h2 className="text-xl font-bold mb-3 text-primary font-['Outfit']">{t('rgpd.complaint.title')}</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    {t('rgpd.complaint.desc')}
                                </p>
                                <div className="mt-4 space-y-2">
                                    <p className="text-sm font-bold text-primary">CNIL</p>
                                    <p className="text-sm text-muted-foreground">3 Place de Fontenoy - TSA 80715</p>
                                    <p className="text-sm text-muted-foreground">75334 PARIS CEDEX 07</p>
                                    <p className="text-sm text-muted-foreground">
                                        {t('rgpd.complaint.phone')} : 01 53 73 22 22
                                    </p>
                                    <p className="text-sm">
                                        <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                                            www.cnil.fr
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* CTA Section */}
                    <div className="text-center space-y-4">
                        <Link
                            to={getLocalizedPath("/politique-confidentialite")}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl font-bold mr-4"
                        >
                            {t('privacy.hero.title')}
                        </Link>
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
