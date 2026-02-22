import { usePageTitle } from "@/hooks/usePageTitle";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Zap, Globe, Cpu, Layers, MousePointer2, Code2, Database } from "lucide-react";
import { useState } from "react";
import { SEO } from "@/components/common/SEO";

export const About = () => {
    usePageTitle("À Propos");
    const [activeTab, setActiveTab] = useState(0);

    const specialties = [
        {
            id: "01",
            title: "Langages & CMS",
            subtitle: "Compétences & Expertises",
            description: "Nous maîtrisons les langages de pointe pour des solutions robustes.",
            items: ["Développement C# .NET, PHP, JS...", "WordPress et Prestashop sur-mesure", "Solutions e-commerce évolutives"],
            icon: <Code2 className="h-6 w-6" />,
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1470&auto=format&fit=crop"
        },
        {
            id: "02",
            title: "Accompagnement",
            subtitle: "Digitalisation & Interopérabilité",
            description: "Un suivi permanent tout au long du processus de programmation.",
            items: ["Digitalisation des processus métier", "Interopérabilité des systèmes", "Accompagnement abordable et flexible"],
            icon: <Layers className="h-6 w-6" />,
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1470&auto=format&fit=crop"
        },
        {
            id: "03",
            title: "Spécialités",
            subtitle: "Solutions Flexibles",
            description: "Nous nous engageons sur la transparence et la flexibilité.",
            items: ["Transparence totale des étapes", "Enseignements techniques partagés", "Adaptabilité aux besoins changeants"],
            icon: <Zap className="h-6 w-6" />,
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1470&auto=format&fit=crop"
        },
        {
            id: "04",
            title: "Bases de Données",
            subtitle: "SQL & NoSQL",
            description: "Gestion performante et sécurisée de vos données.",
            items: ["MySQL & PostgreSQL", "MongoDB (NoSQL)", "Optimisation de requêtes"],
            icon: <Database className="h-6 w-6" />,
            image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1470&auto=format&fit=crop"
        }
    ];

    const aboutSchema = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "mainEntity": {
            "@type": "Organization",
            "name": "NettmobInfotech",
            "description": "NettmobInfotech est une agence digitale spécialisée dans l'accompagnement des entreprises pour leur transformation numérique.",
            "foundingDate": "2014",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Paris",
                "addressCountry": "FR"
            }
        }
    };

    return (
        <div className="bg-background text-foreground overflow-hidden">
            <SEO
                title="À Propos de NettmobInfotech - Agence de Développement à Paris"
                description="Découvrez l'histoire de NettmobInfotech. Experts en développement C#, .NET, PHP et solutions d'interopérabilité systèmes avec plus de 10 ans d'expérience."
                keywords="expertise développement informatique, agence web paris, développeur c# .net, wordpress sur mesure, digitalisation entreprise, équipe tech"
                schemaData={aboutSchema}
            />
            {/* Hero Section */}
            <section className="relative pt-8 pb-10 lg:pt-12 lg:pb-16">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="max-w-2xl animate-in fade-in slide-in-from-left-8 duration-700">
                            <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-accent uppercase bg-accent/10 rounded-full">
                                Qui sommes-nous ?
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-bold font-['Outfit'] leading-[1.1] mb-8 text-primary">
                                Experts en Développement <span className="text-accent underline decoration-accent/30 underline-offset-8">Informatique</span>
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-10">
                                Nettmobinfotech est une société de développement informatique située en France et opérant dans toute l'Europe. Nous offrons un rapport qualité-prix exceptionnel et un accompagnement permanent à chaque étape de votre projet.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Button size="lg" className="rounded-2xl px-8 h-14 text-base font-bold shadow-premium" onClick={() => window.location.href = '/contact'}>
                                    Démarrer un projet
                                </Button>
                                <Button size="lg" variant="outline" className="rounded-2xl px-8 h-14 text-base font-bold border-accent/20 hover:bg-accent/5" onClick={() => document.getElementById('expertise')?.scrollIntoView({ behavior: 'smooth' })}>
                                    Voir nos expertises
                                </Button>
                            </div>
                        </div>

                        <div className="relative lg:h-[600px] flex items-center justify-center animate-in fade-in zoom-in-95 duration-1000">
                            <div className="absolute inset-0 bg-accent/5 rounded-full blur-3xl" />
                            <div className="relative w-full aspect-square max-w-lg">
                                <img
                                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1470&auto=format&fit=crop"
                                    alt="Expertise"
                                    className="w-full h-full object-cover rounded-[3rem] shadow-premium-dark border border-white/10"
                                />
                                <div className="absolute -bottom-8 -left-8 bg-card p-6 rounded-3xl shadow-premium border border-border/50 animate-bounce-slow">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-accent/10 rounded-2xl text-accent">
                                            <ShieldCheck className="h-8 w-8" />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold">100%</div>
                                            <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Qualité Garantie</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Metrics Section */}
            <section className="py-20 bg-accent/[0.02]">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { label: "Années d'Expérience", value: "10+" },
                            { label: "Projets Terminés", value: "500+" },
                            { label: "Clients Satfaits", value: "450+" },
                            { label: "Taux de Réussite", value: "99%" }
                        ].map((stat, i) => (
                            <div key={i} className="text-center group">
                                <div className="text-5xl font-bold font-['Outfit'] text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                                    {stat.value}
                                </div>
                                <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-32">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <Card className="border-none shadow-premium bg-card overflow-hidden">
                            <CardContent className="p-12">
                                <div className="p-4 bg-accent/10 rounded-2xl text-accent w-fit mb-8">
                                    <Zap className="h-8 w-8" />
                                </div>
                                <h3 className="text-3xl font-bold mb-6 font-['Outfit']">Notre Mission</h3>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    Fournir des solutions informatiques innovantes et fiables qui répondent aux besoins spécifiques de nos clients, en contribuant à leur croissance et à leur succès dans un monde numérique.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-premium bg-card overflow-hidden">
                            <CardContent className="p-12">
                                <div className="p-4 bg-accent/10 rounded-2xl text-accent w-fit mb-8">
                                    <Globe className="h-8 w-8" />
                                </div>
                                <h3 className="text-3xl font-bold mb-6 font-['Outfit']">Notre Vision</h3>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    Devenir le partenaire informatique privilégié des entreprises en leur offrant des solutions de pointe et un service d'excellence opérant dans toute l'Europe.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Values Grid */}
            <section className="py-32 bg-accent/5">
                <div className="container mx-auto px-4 lg:px-8 text-center">
                    <h2 className="text-4xl lg:text-5xl font-bold font-['Outfit'] mb-16 text-primary">Nos Valeurs Fondamentales</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: "Expertise", desc: "Savoir-faire technique et expérience solide.", icon: <Cpu /> },
                            { title: "Adaptabilité", desc: "Solutions flexibles et sur-mesure.", icon: <Layers /> },
                            { title: "Proximité", desc: "Réactivité et écoute active de vos besoins.", icon: <MousePointer2 /> },
                            { title: "Engagement", desc: "Dévouement total à la satisfaction client.", icon: <ShieldCheck /> }
                        ].map((val, i) => (
                            <div key={i} className="p-10 bg-background rounded-[2.5rem] shadow-premium hover:-translate-y-2 transition-all duration-300 group">
                                <div className="p-5 bg-accent/10 rounded-2xl text-accent inline-block mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
                                    {val.icon}
                                </div>
                                <h4 className="text-xl font-bold mb-4 font-['Outfit']">{val.title}</h4>
                                <p className="text-muted-foreground leading-relaxed">{val.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Expertise Section (Tabs) */}
            <section id="expertise" className="py-32">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-4xl lg:text-5xl font-bold font-['Outfit'] mb-6">Expertises Techniques</h2>
                        <p className="text-muted-foreground text-lg">Nous combinons créativité et rigueur technique pour donner vie à vos idées.</p>
                    </div>

                    <div className="bg-card rounded-[3rem] p-4 lg:p-12 shadow-premium border border-border/50">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                            {/* Tab Buttons */}
                            <div className="lg:col-span-4 flex flex-col gap-4">
                                {specialties.map((spec, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveTab(i)}
                                        className={`p-6 rounded-3xl text-left transition-all flex items-center gap-6 ${activeTab === i ? 'bg-primary text-primary-foreground shadow-premium scale-[1.02]' : 'hover:bg-accent/5'}`}
                                    >
                                        <div className={`p-3 rounded-2xl ${activeTab === i ? 'bg-white/20' : 'bg-accent/10 text-accent'}`}>
                                            {spec.icon}
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold uppercase tracking-wider mb-1 opacity-70">{spec.id}</div>
                                            <div className="text-lg font-bold font-['Outfit']">{spec.title}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Tab Content */}
                            <div className="lg:col-span-8 bg-background relative rounded-[2rem] overflow-hidden group min-h-[500px]">
                                <img
                                    src={specialties[activeTab].image}
                                    alt={specialties[activeTab].title}
                                    className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale brightness-50"
                                />
                                <div className="relative p-12 h-full flex flex-col justify-center">
                                    <div className="mb-8">
                                        <div className="text-accent font-bold mb-4 tracking-widest uppercase text-sm">
                                            {specialties[activeTab].subtitle}
                                        </div>
                                        <h3 className="text-4xl font-bold font-['Outfit'] mb-6">
                                            {specialties[activeTab].description}
                                        </h3>
                                    </div>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {specialties[activeTab].items.map((item, i) => (
                                            <li key={i} className="flex items-center gap-4 text-muted-foreground font-medium bg-card/50 p-4 rounded-2xl border border-border/30">
                                                <div className="h-2 w-2 rounded-full bg-accent" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="bg-primary rounded-[3.5rem] p-12 lg:p-24 text-center text-primary-foreground relative overflow-hidden shadow-premium-dark">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-accent opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-4xl lg:text-6xl font-bold font-['Outfit'] mb-8">Prêt à digitaliser votre entreprise ?</h2>
                            <p className="text-xl opacity-80 mb-12">
                                Recevez un devis gratuit et personnalisé pour votre projet de développement informatique.
                            </p>
                            <Button
                                size="lg"
                                className="bg-primary text-primary-foreground dark:bg-accent dark:text-white hover:opacity-90 px-10 h-16 rounded-2xl text-lg font-bold shadow-xl transition-all"
                                onClick={() => window.location.href = '/demande-de-devis'}
                            >
                                Demander un Devis
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
