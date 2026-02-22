import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Code2, Globe, Smartphone, BarChart3, ShieldCheck, Database, Cloud, Zap, Layers, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageTitle } from "@/hooks/usePageTitle";
import { SEO } from "@/components/common/SEO";
import { AdBanner } from "@/components/common/AdBanner";

const expertises = [
    {
        title: "Développement Web",
        description: "Sites vitrines, e-commerce et applications web complexes. Nous créons des expériences en ligne performantes et responsives.",
        icon: <Globe className="h-8 w-8 text-accent" />,
        features: ["Sites Vitrines & Institutionnels", "E-commerce (WooCommerce, Shopify)", "Applications Web (React, Vue)", "Intégration API & Tiers"]
    },
    {
        title: "Applications Mobiles",
        description: "Transformez vos idées en applications iOS et Android natives ou hybrides, conçues pour une expérience utilisateur fluide.",
        icon: <Smartphone className="h-8 w-8 text-accent" />,
        features: ["iOS & Android (React Native, Flutter)", "UX/UI Mobile First", "Performance & Fluidité", "Publication Stores"]
    },
    {
        title: "Marketing Digital & SEO",
        description: "Maximisez votre visibilité en ligne et attirez plus de clients grâce à nos stratégies marketing basées sur les données.",
        icon: <BarChart3 className="h-8 w-8 text-accent" />,
        features: ["Audit & Stratégie SEO", "Publicité en ligne (Ads)", "Gestion Réseaux Sociaux", "Marketing de Contenu"]
    },
    {
        title: "Infrastructure & Sécurité",
        description: "Assurez la disponibilité et la sécurité de vos données avec nos solutions d'hébergement et de maintenance robustes.",
        icon: <ShieldCheck className="h-8 w-8 text-accent" />,
        features: ["Hébergement Cloud Sécurisé", "Maintenance Préventive", "Sauvegardes Automatiques", "Conformité RGPD"]
    }
];

const technologies = [
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
    { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" }
];

export const Expertise = () => {
    usePageTitle();

    return (
        <div className="flex flex-col">
            <SEO
                title="Notre Expertise - Technologies & Compétences | NettmobInfotech"
                description="Découvrez nos expertises en développement web, mobile et IA. Maîtrise de React, Node.js, TypeScript, Flutter et technologies de pointe. Solutions performantes et sécurisées."
                keywords="React, Node.js, TypeScript, Flutter, technologies web, expertise technique, développement fullstack, MySQL, Docker, Next.js"
            />
            {/* Hero Section */}
            <section className="relative py-20 lg:py-32 bg-background overflow-hidden">
                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent/10 text-accent mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <Layers className="h-4 w-4" />
                            <span className="text-xs font-bold uppercase tracking-widest">Savoir-Faire & Innovation</span>
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-bold font-['Outfit'] tracking-tight text-primary mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                            Une Expertise Technique au Service de votre <span className="text-accent">Croissance</span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                            Nous combinons créativité, stratégie et excellence technique pour développer des solutions digitales sur mesure qui propulsent votre entreprise.
                        </p>
                    </div>
                </div>
                {/* Background Decoration */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
            </section>

            {/* Core Competencies */}
            <section className="py-24 bg-card">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {expertises.map((item, index) => (
                            <Card key={index} className="border-none shadow-premium bg-background hover:shadow-2xl transition-all duration-300 group overflow-hidden">
                                <CardContent className="p-8 lg:p-10 flex flex-col h-full">
                                    <div className="mb-6 p-4 bg-accent/10 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold font-['Outfit'] text-primary mb-4">{item.title}</h3>
                                    <p className="text-muted-foreground mb-8 leading-relaxed">
                                        {item.description}
                                    </p>
                                    <ul className="mt-auto space-y-3">
                                        {item.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center text-sm font-medium text-foreground/80">
                                                <CheckCircle2 className="h-4 w-4 text-accent mr-3 flex-shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-4 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold font-['Outfit'] mb-16 text-primary">Technologies Maîtrisées</h2>
                    <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
                        {technologies.map((tech, index) => (
                            <div key={index} className="flex flex-col items-center gap-3 group">
                                <div className="h-20 w-20 flex items-center justify-center p-4 bg-card rounded-2xl shadow-sm border border-border/50 group-hover:border-accent/50 group-hover:shadow-lg transition-all duration-300">
                                    <img src={tech.icon} alt={tech.name} className="h-10 w-10 grayscale group-hover:grayscale-0 transition-all duration-300" />
                                </div>
                                <span className="text-sm font-bold text-muted-foreground group-hover:text-primary transition-colors">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Ad — Rectangle (entre Tech Stack et Methodology) */}
            <AdBanner page="expertise" format="rectangle" className="py-4 bg-background" />

            {/* Methodology / Approche */}
            <section className="py-24 bg-accent/5 relative overflow-hidden">
                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <h2 className="text-3xl lg:text-4xl font-bold font-['Outfit'] text-primary mb-6">Notre Approche "Guichet Unique"</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                Chez NettmobInfotech, nous croyons en une approche holistique. Nous ne livrons pas seulement du code, mais une solution complète qui intègre stratégie, design, développement et maintenance.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                Notre philosophie est simple : comprendre votre métier pour construire l'outil numérique qui vous correspond parfaitement, sans superflu technique.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-background rounded-lg shadow-sm text-accent"><Zap className="h-5 w-5" /></div>
                                    <div>
                                        <h4 className="font-bold text-primary">Performance</h4>
                                        <p className="text-sm text-muted-foreground">Solutions optimisées et rapides.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-background rounded-lg shadow-sm text-accent"><ShieldCheck className="h-5 w-5" /></div>
                                    <div>
                                        <h4 className="font-bold text-primary">Sécurité</h4>
                                        <p className="text-sm text-muted-foreground">Protection des données par design.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <div className="relative">
                                <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full transform rotate-12"></div>
                                <img
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                                    alt="Notre Approche Guichet Unique"
                                    className="relative rounded-3xl shadow-2xl w-full h-[400px] object-cover transform hover:scale-[1.02] transition-transform duration-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ad — Horizontal (avant CTA) */}
            <AdBanner page="expertise" format="horizontal" className="py-4 bg-accent/5" />

            {/* CTA */}
            <section className="py-20 bg-background text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl lg:text-4xl font-bold font-['Outfit'] text-primary mb-6">Prêt à concrétiser votre projet ?</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-10 text-lg">
                        Discutons de vos besoins et voyons comment notre expertise peut vous aider à atteindre vos objectifs.
                    </p>
                    <Link to="/cahier-des-charges">
                        <Button size="lg" className="rounded-xl px-10 h-14 text-lg shadow-premium hover:scale-105 transition-transform">
                            Parlons de votre projet <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};
