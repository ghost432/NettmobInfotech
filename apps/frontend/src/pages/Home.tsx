import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Smartphone, Search, Monitor, PenTool, CheckCircle2, Cog, Star, ShieldCheck, Zap, FileText, Users, Clock, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "@/lib/api";
import { usePageTitle } from "@/hooks/usePageTitle";
import { WelcomePopup } from "@/components/common/WelcomePopup";
import { SEO } from "@/components/common/SEO";
import { AdBanner } from "@/components/common/AdBanner";

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    content: string;
    imageUrl: string;
    category: string;
    author: string;
    createdAt: string;
}

const services = [
    { title: "Marketing digital", description: "Nettmobinfotech offre une gamme complète de services marketing digital pour aider les entreprises à atteindre leurs objectifs commerciaux.", icon: <Search className="h-8 w-8 text-accent" /> },
    { title: "Création de site Web", description: "Nous proposons un service de création de sites Web pour répondre aux besoins de toutes les entreprises, des petites startups aux grandes organisations.", icon: <Monitor className="h-8 w-8 text-accent" /> },
    { title: "Développement mobile", description: "Création d'applications mobiles sur mesure pour les entreprises et les particuliers.", icon: <Smartphone className="h-8 w-8 text-accent" /> },
    { title: "Design Graphique", description: "Identités visuelles modernes et percutantes pour votre marque.", icon: <PenTool className="h-8 w-8 text-accent" /> },
];

const testimonials = [
    { author: "Thomas Martin", role: "Directeur Marketing", text: "Le suivi tout au long de la création de mon application a été exemplaire. L'équipe s'est impliquée à 100% pour un résultat parfait." },
    { author: "Jacques Dupont", role: "Entrepreneur", text: "Travailler avec Nettmobinfotech pour ma boutique en ligne a été un pur plaisir. Gestion de stock impeccable et design au top." },
    { author: "Stéphane Moreau", role: "CEO TechStart", text: "Ils ont non seulement réalisé notre app, mais ont aussi proposé des améliorations stratégiques cruciales. Une vraie valeur ajoutée." },
    { author: "Sophie Bernard", role: "Gérante", text: "Une refonte de site web qui a doublé notre taux de conversion en 3 mois. Le design est magnifique et ultra rapide." },
    { author: "Marc Dubois", role: "Restaurateur", text: "Mon système de commande en ligne fonctionne à merveille. Merci à toute l'équipe pour leur patience et leur professionnalisme." },
    { author: "Élise Laurent", role: "Journaliste", text: "Leur expertise en SEO m'a permis d'atteindre la première page de Google en quelques semaines. Impressionnant !" },
];

const processSteps = [
    { title: "Analyse", icon: <Search className="h-6 w-6" /> },
    { title: "Graphie", icon: <PenTool className="h-6 w-6" /> },
    { title: "Développement", icon: <Monitor className="h-6 w-6" /> },
    { title: "Hébergement", icon: <ShieldCheck className="h-6 w-6" /> },
    { title: "Maintenance", icon: <Cog className="h-6 w-6" /> },
];

export const Home = () => {
    usePageTitle();
    const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        const fetchLatestPosts = async () => {
            try {
                const response = await api.get("/blog?page=1&limit=3");
                setLatestPosts(response.data.posts);
            } catch (error) {
                console.error("Error fetching latest posts:", error);
            }
        };
        fetchLatestPosts();
    }, []);

    const homeSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "NettmobInfotech",
        "url": "https://nettmobinfotech.fr",
        "logo": "https://nettmobinfotech.fr/Logo.png",
        "sameAs": [
            "https://www.linkedin.com/company/nettmobinfotech",
            "https://twitter.com/nettmobinfotech"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+33 7 66 39 09 92",
            "contactType": "customer service",
            "email": "contact@nettmobinfotech.fr",
            "areaServed": "FR",
            "availableLanguage": "French"
        },
        "description": "NettmobInfotech est une agence digitale spécialisée dans le développement web, mobile, l'IA et le marketing digital à Paris.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "10 Rue du Colisée",
            "addressLocality": "Paris",
            "postalCode": "75008",
            "addressCountry": "FR"
        }
    };

    return (
        <div className="flex flex-col overflow-hidden">
            <SEO
                title="Agence Digitale à Paris - Développement Web, Mobile & IA"
                description="Expert en création de sites web sur-mesure, applications mobiles iOS/Android et solutions d'intelligence artificielle. NettmobInfotech booste votre croissance digitale."
                keywords="agence digitale paris, développement web, création site internet, application mobile ios android, intelligence artificielle entreprise, marketing digital, seo paris, transformation digitale"
                schemaData={homeSchema}
            />
            <WelcomePopup />
            {/* Hero Section */}
            <section className="relative bg-background overflow-hidden min-h-[90vh] flex items-center">
                <div className="container mx-auto px-4 lg:px-8 relative z-10 h-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch h-full">
                        {/* Text Column */}
                        <div className="flex flex-col justify-center py-20 animate-in slide-in-from-left-10 duration-700">
                            <h1 className="text-5xl lg:text-7xl font-bold font-['Outfit'] tracking-tight text-primary mb-6">
                                Solutions Informatiques <span className="text-accent underline decoration-4 underline-offset-8">Innovantes</span> pour votre Succès.
                            </h1>
                            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                                NettmobInfotech vous accompagne dans votre transformation digitale avec des services de pointe en développement web, mobile et marketing numérique.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link to="/demande-de-devis">
                                    <Button size="lg" className="rounded-xl px-8 h-14 text-lg shadow-premium hover:scale-105 transition-transform">
                                        Commencer un Projet <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                                <Link to="/cahier-des-charges">
                                    <Button size="lg" variant="outline" className="rounded-xl px-8 h-14 text-lg border-2 hover:bg-accent/5 hover:text-accent dark:hover:text-accent">
                                        Cahier des Charges
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Image Column - Stretched height */}
                        <div className="relative hidden lg:block h-full animate-in slide-in-from-right-10 duration-1000 py-10 lg:py-0">
                            {/* Decorative Blob */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-3xl opacity-50 animate-pulse -z-10"></div>

                            {/* Main Image Container */}
                            <div className="relative h-full w-full flex items-center">
                                <div className="relative w-full h-[90%] rounded-[3rem] overflow-hidden shadow-2xl bg-card border-[6px] border-card animate-float">
                                    <img
                                        src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop"
                                        alt="NettmobInfotech Solutions"
                                        className="w-full h-full object-cover object-center scale-105 hover:scale-110 transition-transform duration-700"
                                        style={{ objectPosition: '60% center' }}
                                    />
                                    {/* Glassmorphism Overlay Card */}
                                    <div className="absolute bottom-10 left-10 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-lg max-w-xs">
                                        <div className="flex items-center gap-4">
                                            <div className="h-14 w-14 rounded-full bg-accent flex items-center justify-center text-white shadow-lg">
                                                <Zap className="h-7 w-7" />
                                            </div>
                                            <div>
                                                <p className="text-white font-bold text-xl">Innovation</p>
                                                <p className="text-white/80 text-sm">Solutions sur mesure</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section (New) */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold font-['Outfit'] text-primary mb-4">Pourquoi Nous Choisir ?</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Des atouts majeurs qui font la différence pour votre entreprise.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="p-8 bg-card rounded-3xl shadow-premium hover:-translate-y-2 transition-transform duration-300 border border-border/50 text-center">
                            <div className="h-16 w-16 mx-auto bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6">
                                <Trophy className="h-8 w-8" />
                            </div>
                            <h3 className="font-bold text-xl mb-3">Expertise</h3>
                            <p className="text-muted-foreground text-sm">Une équipe qualifiée maîtrisant les dernières technologies.</p>
                        </div>
                        <div className="p-8 bg-card rounded-3xl shadow-premium hover:-translate-y-2 transition-transform duration-300 border border-border/50 text-center">
                            <div className="h-16 w-16 mx-auto bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6">
                                <Clock className="h-8 w-8" />
                            </div>
                            <h3 className="font-bold text-xl mb-3">Rapidité</h3>
                            <p className="text-muted-foreground text-sm">Des projets livrés dans les temps, sans compromis sur la qualité.</p>
                        </div>
                        <div className="p-8 bg-card rounded-3xl shadow-premium hover:-translate-y-2 transition-transform duration-300 border border-border/50 text-center">
                            <div className="h-16 w-16 mx-auto bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6">
                                <Users className="h-8 w-8" />
                            </div>
                            <h3 className="font-bold text-xl mb-3">Écoute</h3>
                            <p className="text-muted-foreground text-sm">Une relation client privilégiée pour comprendre vos besoins.</p>
                        </div>
                        <div className="p-8 bg-card rounded-3xl shadow-premium hover:-translate-y-2 transition-transform duration-300 border border-border/50 text-center">
                            <div className="h-16 w-16 mx-auto bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6">
                                <ShieldCheck className="h-8 w-8" />
                            </div>
                            <h3 className="font-bold text-xl mb-3">Fiabilité</h3>
                            <p className="text-muted-foreground text-sm">Des solutions robustes, sécurisées et maintenables.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partners Section */}
            <section className="py-16 bg-accent/5">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl lg:text-3xl font-bold font-['Outfit'] text-primary mb-2">Ils nous font confiance</h2>
                        <div className="h-1 w-20 bg-accent mx-auto rounded-full"></div>
                    </div>

                    <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
                        {[
                            "Design_sans_titre__1___1_-removebg-preview-e1746308979772.png",
                            "WhatsApp Image 2026-02-02 at 10.44.26.jpeg",
                            "ihi logo.png",
                            "logo NSA 2.png",
                            "logo RIG.png",
                            "logo qia 2.png",
                            "oryx logo.jpeg"
                        ].map((logo, index) => (
                            <div key={index} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 w-32 h-32 flex items-center justify-center">
                                <img
                                    src={`/partner/${logo}`}
                                    alt="Partenaire"
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Ad — Rectangle (après Partners) */}
            <AdBanner page="home" format="rectangle" className="py-4 bg-background" />

            {/* About Section - Updated */}
            <section className="py-24 bg-accent/5">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent/10 text-accent mb-6">
                                <span className="text-[10px] font-bold uppercase tracking-widest">Qui Sommes Nous</span>
                            </div>
                            <h2 className="text-3xl lg:text-5xl font-bold font-['Outfit'] text-primary mb-6">
                                Nettmobinfotech votre partenaire idéale
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                Chez Nettmobinfotech, nous nous engageons à offrir une garantie sur notre travail afin de vous assurer une satisfaction totale. Nous développons des solutions sur mesure qui propulsent votre activité.
                            </p>
                            <Link to="/contact">
                                <Button className="rounded-xl px-8 h-12 shadow-premium bg-accent hover:bg-accent/90 text-white dark:text-white">
                                    Nous Contacter <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                        <div className="order-1 lg:order-2">
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                                alt="Notre Équipe"
                                className="rounded-[2.5rem] shadow-2xl w-full h-[400px] object-cover hover:scale-[1.02] transition-transform duration-500"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold font-['Outfit'] text-primary mb-4">Nos Services d'Excellence</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Une expertise complète pour tous vos besoins technologiques.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service, index) => (
                            <Card key={index} className="border-none shadow-premium bg-card hover:-translate-y-2 transition-all duration-300 rounded-3xl overflow-hidden group">
                                <CardContent className="p-8 h-full flex flex-col">
                                    <div className="mb-6 p-4 bg-accent/5 rounded-2xl inline-block group-hover:bg-accent/10 transition-colors w-fit">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 font-['Outfit']">{service.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed flex-grow">
                                        {service.description}
                                    </p>
                                    <div className="mt-6 pt-6 border-t border-border/50 flex items-center text-accent text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                        Découvrir <ArrowRight className="ml-2 h-4 w-4" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Ad — Square (après Services) */}
            <AdBanner page="home" format="square" className="py-6 bg-accent/5" />

            {/* Cahier des Charges Section (New) */}
            <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/10 skew-x-12 transform translate-x-20"></div>
                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-white mb-4 border border-white/20">
                                <FileText className="h-4 w-4" />
                                <span className="text-xs font-bold uppercase tracking-widest">Documentation</span>
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold font-['Outfit'] mb-4">Besoin d'aide pour votre Cahier des Charges ?</h2>
                            <p className="text-lg text-primary-foreground/80 mb-0">
                                Un cahier des charges bien défini est la clé d'un projet réussi. Découvrez pourquoi et comment nous pouvons vous aider à le structurer.
                            </p>
                        </div>
                        <Link to="/cahier-des-charges">
                            <Button size="lg" className="rounded-xl px-8 h-14 bg-white text-primary hover:bg-white/90 font-bold shadow-lg dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90">
                                En Savoir Plus <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-24 bg-background relative overflow-hidden">
                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold font-['Outfit'] mb-4 text-primary">Processus de Travail</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Une méthode éprouvée pour garantir le succès de votre projet.
                        </p>
                    </div>

                    <div className="grid grid-cols-6 md:flex md:justify-between items-center gap-y-12 gap-x-4 md:gap-8 relative">
                        {/* Connecting Line for Desktop */}
                        <div className="hidden md:block absolute top-[2.5rem] left-0 w-full h-1 bg-accent/20 -z-10"></div>

                        {processSteps.map((step, index) => (
                            <div key={index} className={`flex flex-col items-center text-center group w-full md:w-1/5 ${index < 3 ? 'col-span-2' : 'col-span-3'}`}>
                                <div className="h-20 w-20 rounded-full bg-card text-accent flex items-center justify-center shadow-premium mb-6 group-hover:scale-110 transition-transform duration-300 border-4 border-background z-10">
                                    {step.getIcon ? step.getIcon() : step.icon}
                                </div>
                                <h3 className="text-xl font-bold font-['Outfit'] mb-2">{step.title}</h3>
                                <div className="text-sm font-bold opacity-50">Étape {index + 1}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Ad — Horizontal (après Process) */}
            <AdBanner page="home" format="horizontal" className="py-4 bg-background" />

            {/* AI Solutions Section */}
            <section className="py-24 bg-gradient-to-br from-accent/5 via-background to-accent/5 relative overflow-hidden">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-accent uppercase bg-accent/10 rounded-full">
                                Intelligence Artificielle
                            </div>
                            <h2 className="text-3xl lg:text-5xl font-bold font-['Outfit'] text-primary mb-6">
                                Propulsez votre Business avec <span className="text-accent">l'IA</span>
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                Exploitez la puissance de l'Intelligence Artificielle pour automatiser vos processus, améliorer votre relation client et créer des expériences innovantes avec nos chatbots et applications IA sur mesure.
                            </p>
                            <ul className="space-y-4 mb-10">
                                {[
                                    "Chatbots IA personnalisés 24/7",
                                    "Automatisation intelligente",
                                    "Agents conversationnels avancés",
                                    "Intégration de modèles LLM"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-foreground">
                                        <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                                            <CheckCircle2 className="h-4 w-4 text-accent" />
                                        </div>
                                        <span className="font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link to="/services/solution-ia">
                                <Button size="lg" className="rounded-xl px-10 h-14 text-lg shadow-premium hover:scale-105 transition-transform">
                                    Découvrir nos Solutions IA <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                        <div className="order-1 lg:order-2 relative">
                            <div className="absolute inset-0 bg-accent/10 rounded-full blur-3xl opacity-50" />
                            <img
                                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop"
                                alt="Intelligence Artificielle"
                                className="relative rounded-[2.5rem] shadow-2xl w-full h-[500px] object-cover hover:scale-[1.02] transition-transform duration-500 border border-border/20"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Carousel (Marquee) */}
            <section className="py-24 bg-accent/5 overflow-hidden">
                <div className="container mx-auto px-4 lg:px-8 mb-12 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold font-['Outfit'] text-primary mb-4">Ce que disent nos clients</h2>
                    <p className="text-muted-foreground">La satisfaction client est notre priorité absolue.</p>
                </div>

                {/* Marquee Container */}
                <div className="relative w-full overflow-hidden">
                    <div className="flex animate-marquee gap-8 w-max hover:[animation-play-state:paused] py-4">
                        {[...testimonials, ...testimonials].map((testimonial, index) => (
                            <Card key={index} className="border-none shadow-premium bg-card rounded-[2rem] p-6 w-[350px] md:w-[400px] flex-shrink-0 cursor-default">
                                <CardContent className="p-0 flex flex-col h-full">
                                    <div className="flex gap-1 text-yellow-500 mb-4">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-4 w-4 fill-current" />)}
                                    </div>
                                    <p className="text-muted-foreground italic mb-6 leading-relaxed text-sm flex-grow">
                                        "{testimonial.text}"
                                    </p>
                                    <div className="flex items-center gap-4 mt-auto">
                                        <div className="h-10 w-10 rounded-full bg-accent text-white flex items-center justify-center font-bold text-sm">
                                            {testimonial.author.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-primary text-sm">{testimonial.author}</h4>
                                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Latest News Section */}
            {latestPosts.length > 0 && (
                <section className="py-24 bg-background">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                            <div>
                                <h2 className="text-3xl lg:text-4xl font-bold font-['Outfit'] text-primary mb-2">Dernières du <span className="text-accent">Blog</span></h2>
                                <p className="text-muted-foreground">Restez informés des dernières tendances.</p>
                            </div>
                            <Link to="/actus">
                                <Button variant="link" className="text-accent font-bold h-auto p-0 group">
                                    Voir tous les articles <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                        </div>

                        {/* Articles + Vertical Ad sidebar */}
                        <div className="flex flex-col lg:flex-row gap-8 items-stretch w-full">
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {latestPosts.map((post) => (
                                    <Link key={post.id} to={`/actus/${post.slug}`} className="group h-full">
                                        <Card className="border-none shadow-premium bg-card rounded-3xl overflow-hidden h-full transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                                            <div className="relative aspect-[16/10] overflow-hidden">
                                                <img
                                                    src={post.imageUrl || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute top-4 left-4">
                                                    <span className="bg-background/90 backdrop-blur-sm text-accent text-[10px] px-3 py-1 rounded-full font-bold uppercase shadow-sm">
                                                        {post.category}
                                                    </span>
                                                </div>
                                            </div>
                                            <CardContent className="p-6">
                                                <div className="flex items-center gap-4 text-[10px] text-muted-foreground mb-3 font-medium uppercase tracking-wider">
                                                    <span>{new Date(post.createdAt).toLocaleDateString('fr-FR')}</span>
                                                </div>
                                                <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-accent transition-colors leading-tight">{post.title}</h3>
                                                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                                                    {post.content.replace(/<[^>]*>/g, '').substring(0, 200)}...
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                            {/* Vertical Ad — sidebar beside articles (now visible on all devices) */}
                            <div className="shrink-0 w-full lg:w-[350px] flex items-center justify-center bg-accent/5 rounded-3xl p-4 lg:p-0">
                                <AdBanner page="home" format="vertical" className="w-full h-full min-h-[400px]" />
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};
