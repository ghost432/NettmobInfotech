import { useParams, Link, Navigate } from "react-router-dom";
import {
    Megaphone,
    Globe,
    Smartphone,
    Search,
    PenTool,
    Palette,
    Cpu,
    CheckCircle2,
    ArrowLeft
} from "lucide-react";
import { servicesData } from "@/data/servicesData";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";
import { AdBanner } from "@/components/common/AdBanner";

const iconMap: Record<string, any> = {
    Megaphone,
    Globe,
    Smartphone,
    Search,
    PenTool,
    Palette,
    Cpu
};

export const ServiceDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const service = servicesData.find(s => s.slug === slug);

    usePageTitle(service ? service.title : "Service");

    if (!service) {
        return <Navigate to="/services" replace />;
    }

    const IconComponent = iconMap[service.icon] || Globe;

    return (
        <div className="bg-background text-foreground pb-24">
            {/* Hero Section */}
            <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 bg-accent/[0.02] border-b border-border/50">
                <div className="container mx-auto px-4 lg:px-8">
                    <Link to="/services" className="inline-flex items-center gap-2 text-accent font-bold mb-8 hover:translate-x-[-4px] transition-transform">
                        <ArrowLeft className="h-5 w-5" />
                        Retour aux services
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="animate-in fade-in slide-in-from-left-8 duration-700">
                            <div className="p-4 bg-accent/10 rounded-2xl text-accent w-fit mb-6">
                                <IconComponent className="h-10 w-10" />
                            </div>
                            <h1 className="text-4xl lg:text-6xl font-bold font-['Outfit'] mb-6 text-primary">
                                {service.details.title}
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                {service.details.description}
                            </p>
                            <div className="mt-10">
                                <Link to="/demande-de-devis">
                                    <Button size="lg" className="rounded-2xl px-10 h-16 text-lg font-bold shadow-premium">
                                        Demander un Devis
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="relative group animate-in fade-in zoom-in-95 duration-1000">
                            <div className="absolute inset-0 bg-accent/5 rounded-[3rem] blur-3xl opacity-50" />
                            <img
                                src={service.details.image}
                                alt={service.title}
                                className="relative z-10 w-full h-[400px] object-cover rounded-[3rem] shadow-premium-dark border border-white/10"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Ad — Horizontal (après Hero) */}
            <AdBanner page="service-detail" format="horizontal" className="py-3 bg-background" />

            {/* Content Section */}
            <section className="py-24">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold font-['Outfit'] mb-12 flex items-center gap-4">
                            <span className="h-1 w-12 bg-accent rounded-full" />
                            Ce que nous proposons
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {service.details.features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="p-8 bg-card rounded-[2rem] border border-border/50 shadow-sm hover:shadow-premium transition-all duration-300 flex items-start gap-4 group"
                                >
                                    <div className="mt-1 p-2 bg-accent/10 rounded-xl text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                                        <CheckCircle2 className="h-5 w-5" />
                                    </div>
                                    <span className="text-lg font-medium text-primary">
                                        {feature}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Ad Banner */}
                        <AdBanner page="service-detail" format="rectangle" className="my-8" />

                        {/* Bottom Banner */}
                        <div className="mt-20 p-12 bg-primary rounded-[3rem] text-primary-foreground relative overflow-hidden shadow-premium-dark border border-white/10">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="text-center md:text-left">
                                    <h3 className="text-2xl lg:text-3xl font-bold font-['Outfit'] mb-2">Un besoin urgent ?</h3>
                                    <p className="text-lg opacity-80">Nos experts sont disponibles pour discuter de vos besoins techniques.</p>
                                </div>
                                <a href="https://wa.me/33766390992" target="_blank" rel="noopener noreferrer">
                                    <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-10 h-16 rounded-2xl text-lg font-bold shadow-xl transition-all dark:bg-white dark:text-gray-900 dark:hover:bg-white/90">
                                        Nous Appeler
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
