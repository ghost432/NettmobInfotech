import React, { useState } from "react";
import { usePageTitle } from "@/hooks/usePageTitle";
import { SEO } from "@/components/common/SEO";
import { AdBanner } from "@/components/common/AdBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { servicesData } from "@/data/servicesData";
import {
    Send,
    User,
    Mail,
    Phone,
    Building2,
    MessageSquare,
    CheckCircle2,
    Loader2
} from "lucide-react";
import { motion } from "framer-motion";
import api from "@/lib/api";

export const QuoteRequest = () => {
    usePageTitle("Demande de Devis");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        services: [] as string[],
        budget: "",
        timeline: "",
        details: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await api.post("/company/quotation", formData);
            setIsSubmitted(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error("Submission error:", error);
            alert("Une erreur est survenue. Veuillez réessayer.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleServiceChange = (slug: string, checked: boolean) => {
        if (checked) {
            setFormData(prev => ({ ...prev, services: [...prev.services, slug] }));
        } else {
            setFormData(prev => ({ ...prev, services: prev.services.filter(s => s !== slug) }));
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center px-4 pt-32 transition-all animate-in fade-in zoom-in duration-500">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-6 max-w-md p-12 bg-card rounded-[3rem] shadow-premium-dark border border-accent/10"
                >
                    <div className="inline-flex items-center justify-center p-6 bg-accent/20 rounded-full text-accent mb-4">
                        <CheckCircle2 className="h-16 w-16" />
                    </div>
                    <h2 className="text-4xl font-bold font-['Outfit']">Merci !</h2>
                    <p className="text-muted-foreground text-lg italic leading-relaxed">
                        Votre demande de devis a été envoyée avec succès. Notre équipe vous contactera sous 24h pour discuter de votre beau projet.
                    </p>
                    <Button
                        onClick={() => window.location.href = '/'}
                        className="rounded-xl px-10 h-14 text-lg shadow-premium"
                    >
                        Retour à l'accueil
                    </Button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            <SEO
                title="Demande de Devis Gratuit - NettmobInfotech | Projet Web & Mobile"
                description="Obtenez un devis gratuit et personnalisé pour votre projet web, mobile ou marketing digital. Réponse sous 24h. Expertise reconnue, prix transparent."
                keywords="devis gratuit, estimation projet web, tarif site internet, prix application mobile, budget développement, Paris"
            />
            {/* Header Section - Split Layout with Image */}
            <section className="relative py-16 lg:py-24 overflow-hidden bg-background text-foreground flex items-center border-b border-border/50">
                <div className="container mx-auto px-4 lg:px-8 relative z-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Image LEFT */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative hidden lg:block h-full"
                        >
                            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border border-border/50 h-[320px]">
                                <img
                                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1470&auto=format&fit=crop"
                                    alt="Expertise Illustration"
                                    className="w-full h-full object-cover object-center"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            </div>
                            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent/10 blur-[60px] rounded-full z-0" />
                        </motion.div>

                        {/* Text RIGHT */}
                        <div className="max-w-xl">
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent font-bold text-sm uppercase tracking-widest mb-6 border border-accent/20"
                            >
                                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                Propulser votre Vision
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-5xl lg:text-6xl font-bold font-['Outfit'] mb-6 leading-[1.1]"
                            >
                                Parlons de votre <span className="text-accent underline decoration-accent/30 decoration-8 underline-offset-8">Projet</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-lg lg:text-xl opacity-90 leading-relaxed font-medium text-muted-foreground/80 italic"
                            >
                                "De l'idée à la réalité technologique. Obtenez une expertise sur-mesure et un chiffrage précis sous 24h."
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section className="py-24 -mt-32 relative z-20">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="max-w-5xl mx-auto">
                        <Card className="border border-border/50 shadow-premium-dark rounded-[3.5rem] overflow-hidden bg-card/80 backdrop-blur-xl">
                            <CardContent className="p-8 lg:p-20">
                                <form onSubmit={handleSubmit} className="space-y-16">
                                    {/* Personal Info */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <Label className="text-base font-bold flex items-center gap-2 pr-2">
                                                <User className="h-4 w-4 text-accent" /> Prénom
                                            </Label>
                                            <Input
                                                required
                                                value={formData.firstName}
                                                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                                                placeholder="Votre prénom"
                                                className="h-14 rounded-2xl bg-accent/5 border-none focus-visible:ring-accent"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="text-base font-bold flex items-center gap-2 pr-2">
                                                <User className="h-4 w-4 text-accent" /> Nom
                                            </Label>
                                            <Input
                                                required
                                                value={formData.lastName}
                                                onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                                                placeholder="Votre nom"
                                                className="h-14 rounded-2xl bg-accent/5 border-none focus-visible:ring-accent"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="text-base font-bold flex items-center gap-2 pr-2">
                                                <Mail className="h-4 w-4 text-accent" /> Email Professionnel
                                            </Label>
                                            <Input
                                                required
                                                type="email"
                                                value={formData.email}
                                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="contact@votreentreprise.fr"
                                                className="h-14 rounded-2xl bg-accent/5 border-none focus-visible:ring-accent"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="text-base font-bold flex items-center gap-2 pr-2">
                                                <Phone className="h-4 w-4 text-accent" /> Téléphone
                                            </Label>
                                            <Input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder="+33 6 ..."
                                                className="h-14 rounded-2xl bg-accent/5 border-none focus-visible:ring-accent"
                                            />
                                        </div>
                                        <div className="md:col-span-2 space-y-3">
                                            <Label className="text-base font-bold flex items-center gap-2 pr-2">
                                                <Building2 className="h-4 w-4 text-accent" /> Nom de la Société (Si applicable)
                                            </Label>
                                            <Input
                                                value={formData.company}
                                                onChange={e => setFormData({ ...formData, company: e.target.value })}
                                                placeholder="Votre entreprise"
                                                className="h-14 rounded-2xl bg-accent/5 border-none focus-visible:ring-accent"
                                            />
                                        </div>
                                    </div>

                                    {/* Services Selection */}
                                    <div className="space-y-6">
                                        <Label className="text-xl font-bold font-['Outfit'] block text-primary border-l-4 border-accent pl-4">
                                            Quels services vous intéressent ?
                                        </Label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-8 bg-accent/5 rounded-[2.5rem]">
                                            {servicesData.map((service) => (
                                                <div key={service.slug} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-background transition-colors group">
                                                    <Checkbox
                                                        id={service.slug}
                                                        checked={formData.services.includes(service.slug)}
                                                        onCheckedChange={(checked) => handleServiceChange(service.slug, checked as boolean)}
                                                        className="w-6 h-6 rounded-lg data-[state=checked]:bg-accent"
                                                    />
                                                    <label
                                                        htmlFor={service.slug}
                                                        className="text-sm font-medium leading-none cursor-pointer group-hover:text-accent transition-colors"
                                                    >
                                                        {service.title}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Project Details */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <Label className="text-base font-bold">Votre Budget Estimé</Label>
                                            <Select value={formData.budget} onValueChange={val => setFormData({ ...formData, budget: val })}>
                                                <SelectTrigger className="h-14 rounded-2xl bg-accent/5 border-none">
                                                    <SelectValue placeholder="Choisir une fourchette" />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-2xl border-none shadow-premium">
                                                    <SelectItem value="500-1500">500€ - 1500€</SelectItem>
                                                    <SelectItem value="1500-3000">1500€ - 3000€</SelectItem>
                                                    <SelectItem value="3000-5000">3000€ - 5000€</SelectItem>
                                                    <SelectItem value="5000-10000">5000€ - 10000€</SelectItem>
                                                    <SelectItem value="10000+">Plus de 10 000€</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="text-base font-bold">Délai Souhaité</Label>
                                            <Select value={formData.timeline} onValueChange={val => setFormData({ ...formData, timeline: val })}>
                                                <SelectTrigger className="h-14 rounded-2xl bg-accent/5 border-none">
                                                    <SelectValue placeholder="Quel est votre timing ?" />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-2xl border-none shadow-premium">
                                                    <SelectItem value="urgent">Urgent (Moins d'un mois)</SelectItem>
                                                    <SelectItem value="1-3">1 à 3 mois</SelectItem>
                                                    <SelectItem value="3-6">3 à 6 mois</SelectItem>
                                                    <SelectItem value="exploration">Juste une estimation</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div className="space-y-3">
                                        <Label className="text-base font-bold flex items-center gap-2 pr-2">
                                            <MessageSquare className="h-4 w-4 text-accent" /> Notes complémentaire (Optionnel)
                                        </Label>
                                        <Textarea
                                            value={formData.details}
                                            onChange={e => setFormData({ ...formData, details: e.target.value })}
                                            placeholder="Dites-nous en plus sur votre projet, vos objectifs..."
                                            className="min-h-[200px] rounded-[2rem] bg-accent/5 border-none p-6 focus-visible:ring-accent text-lg"
                                        />
                                    </div>

                                    <div className="pt-6">
                                        <Button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full lg:w-auto px-12 h-16 rounded-2xl text-xl font-bold bg-primary text-primary-foreground hover:bg-accent transition-all shadow-premium group disabled:opacity-70"
                                        >
                                            {isLoading ? (
                                                <Loader2 className="h-6 w-6 animate-spin" />
                                            ) : (
                                                <>
                                                    Obtenir mon Devis Gratuit <Send className="ml-3 h-6 w-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                </>
                                            )}
                                        </Button>
                                        <p className="text-muted-foreground text-sm mt-6 flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-accent" /> Nous travaillons au forfait : engagement sur résultat et prix ferme.
                                        </p>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Ad — Horizontal (entre Form et Trust) */}
            <AdBanner page="devis" format="horizontal" className="py-4 bg-background" />

            {/* Trust Section */}
            <section className="py-24 bg-accent/5">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-muted-foreground italic max-w-2xl mx-auto mb-8 font-medium">
                        "Nous prendrons contact avec vous pour comprendre votre besoin et affiner cette estimation sous forme d'un devis détaillé."
                    </p>
                    <div className="h-1 w-24 bg-accent mx-auto rounded-full" />
                </div>
            </section>

            {/* Ad Banner */}
            <AdBanner page="devis" format="square" className="py-6 bg-accent/5" />
        </div>
    );
};
