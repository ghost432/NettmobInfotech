import { Card, CardContent } from "@/components/ui/card";
import {
    Megaphone,
    Globe,
    Smartphone,
    Search,
    PenTool,
    Palette,
    Cpu,
    ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { usePageTitle } from "@/hooks/usePageTitle";
import { Button } from "@/components/ui/button";
import { servicesData } from "@/data/servicesData";
import { SEO } from "@/components/common/SEO";
import { AdBanner } from "@/components/common/AdBanner";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/lib/i18nUtils";

const iconMap: Record<string, any> = {
    Megaphone,
    Globe,
    Smartphone,
    Search,
    PenTool,
    Palette,
    Cpu
};

export const Services = () => {
    const { t } = useTranslation();
    usePageTitle(t('services.title'));

    const servicesSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Développement Web et Mobile, Marketing Digital, IA",
        "provider": {
            "@type": "Organization",
            "name": "NettmobInfotech",
            "url": "https://nettmobinfotech.fr"
        },
        "areaServed": {
            "@type": "Country",
            "name": "France"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Nos Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Développement de sites Web sur-mesure"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Développement d'applications mobiles iOS & Android"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Solutions d'Intelligence Artificielle"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Marketing Digital & SEO"
                    }
                }
            ]
        }
    };

    return (
        <div className="bg-background text-foreground overflow-hidden">
            <SEO
                title={t('services.title')}
                description={t('services.description')}
                keywords={t('services.keywords')}
                schemaData={servicesSchema}
            />
            {/* Hero Section */}
            <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 bg-accent/[0.02]">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-accent uppercase bg-accent/10 rounded-full">
                            {t('services.hero.badge')}
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-bold font-['Outfit'] leading-[1.1] mb-8 text-primary">
                            {t('services.hero.title').split('v')[0]}<span className="text-accent underline decoration-accent/30 underline-offset-8">v</span>{t('services.hero.title').split('v')[1]}
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            {t('services.hero.desc')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Ad — Rectangle (après Hero) */}
            <AdBanner page="services" format="rectangle" className="py-4 bg-background" />

            {/* Services Grid */}
            <section className="py-24">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                        {servicesData.map((service, index) => {
                            const IconComponent = iconMap[service.icon] || Globe;
                            return (
                                <Card
                                    key={index}
                                    className="group relative border-none shadow-premium rounded-[2.5rem] bg-card overflow-hidden transition-all duration-500 hover:-translate-y-3"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <CardContent className="p-10 lg:p-12 relative z-10 flex flex-col h-full">
                                        <div className="mb-8 p-6 bg-accent/10 rounded-3xl text-accent w-fit group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-sm">
                                            <IconComponent className="h-8 w-8" />
                                        </div>
                                        <h3 className="text-2xl lg:text-3xl font-bold mb-6 font-['Outfit'] text-primary group-hover:text-accent transition-colors">
                                            {t(service.title)}
                                        </h3>
                                        <p className="text-lg text-muted-foreground leading-relaxed mb-10 flex-grow">
                                            {t(service.shortDescription)}
                                        </p>
                                        <Link to={getLocalizedPath(`/services/${service.slug}`)} className="mt-auto">
                                            <Button
                                                variant="ghost"
                                                className="p-0 text-accent font-bold text-lg hover:bg-transparent hover:text-accent/80 group/btn flex items-center gap-3 transition-all"
                                            >
                                                {t('services.grid.readMore')}
                                                <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-2" />
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Ad — Horizontal (après Services Grid) */}
            <AdBanner page="services" format="horizontal" className="py-4" />

            {/* Bottom CTA */}
            <section className="py-24 bg-accent/5">
                <div className="container mx-auto px-4 lg:px-8 text-center max-w-4xl">
                    <h2 className="text-3xl lg:text-5xl font-bold font-['Outfit'] mb-8">{t('services.cta.title')}</h2>
                    <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                        {t('services.cta.desc')}
                    </p>
                    <Link to={getLocalizedPath("/demande-de-devis")}>
                        <Button size="lg" className="rounded-2xl px-12 h-16 text-lg font-bold shadow-premium-dark">
                            {t('services.cta.button')}
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};
