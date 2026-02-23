import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
    Rocket,
    Brain,
    Users,
    Globe,
    Trophy,
    Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePageTitle } from "@/hooks/usePageTitle";
import { SEO } from "@/components/common/SEO";
import { getLocalizedPath } from "@/lib/i18nUtils";

export const About = () => {
    const { t } = useTranslation();
    usePageTitle(t('about.title'));

    const stats = [
        { label: t('about.stats.experience'), value: "10+", icon: Trophy },
        { label: t('about.stats.projects'), value: "150+", icon: Rocket },
        { label: t('about.stats.clients'), value: "100+", icon: Users },
        { label: t('about.stats.languages'), value: "4", icon: Globe }
    ];

    const values = [
        {
            title: t('about.values.innovation.title'),
            desc: t('about.values.innovation.desc'),
            icon: Brain,
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            title: t('about.values.quality.title'),
            desc: t('about.values.quality.desc'),
            icon: Target,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10"
        },
        {
            title: t('about.values.collaboration.title'),
            desc: t('about.values.collaboration.desc'),
            icon: Users,
            color: "text-amber-500",
            bg: "bg-amber-500/10"
        }
    ];

    const steps = [
        { title: t('about.steps.s1.title'), desc: t('about.steps.s1.desc') },
        { title: t('about.steps.s2.title'), desc: t('about.steps.s2.desc') },
        { title: t('about.steps.s3.title'), desc: t('about.steps.s3.desc') },
        { title: t('about.steps.s4.title'), desc: t('about.steps.s4.desc') }
    ];

    return (
        <div className="min-h-screen pb-20">
            <SEO
                title={t('about.title')}
                description={t('about.description')}
                keywords={t('about.keywords')}
            />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/20 rounded-full blur-[120px]" />
                </div>

                <div className="container mx-auto px-4 relative">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <Badge variant="outline" className="px-6 py-2 rounded-full border-accent/20 bg-accent/5 text-accent animate-fade-in font-bold">
                            {t('about.hero.badge')}
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-bold font-['Outfit'] tracking-tight leading-[1.1]" dangerouslySetInnerHTML={{ __html: t('about.hero.title') }} />
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                            {t('about.hero.desc')}
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, i) => (
                            <Card key={i} className="border-none shadow-premium bg-card/50 backdrop-blur-xl rounded-[2.5rem] overflow-hidden group hover:-translate-y-2 transition-all duration-500">
                                <CardContent className="p-8 text-center space-y-4">
                                    <div className="mx-auto w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                                        <stat.icon className="h-8 w-8" />
                                    </div>
                                    <div>
                                        <div className="text-4xl font-bold font-['Outfit'] text-primary">{stat.value}</div>
                                        <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{stat.label}</div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-10">
                            <div className="space-y-6">
                                <h2 className="text-4xl font-bold font-['Outfit']">{t('about.mission.title')}</h2>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {t('about.mission.p1')}
                                </p>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {t('about.mission.p2')}
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-3 gap-6">
                                {values.map((value, i) => (
                                    <div key={i} className="space-y-4 p-6 rounded-[2rem] bg-accent/5 border border-accent/10">
                                        <div className={`p-3 rounded-xl w-fit ${value.bg} ${value.color}`}>
                                            <value.icon className="h-6 w-6" />
                                        </div>
                                        <h3 className="font-bold text-lg">{value.title}</h3>
                                        <p className="text-sm text-muted-foreground">{value.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-accent to-blue-500 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-700" />
                            <Card className="relative border-none shadow-2xl rounded-[3rem] overflow-hidden bg-black aspect-video">
                                <img
                                    src="/quote_hero_office.png"
                                    alt="About NettmobInfotech"
                                    className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                                />
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Methodology Section */}
            <section className="py-20 bg-accent/5">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
                        <h2 className="text-4xl font-bold font-['Outfit']">{t('about.methodology.title')}</h2>
                        <p className="text-muted-foreground">
                            {t('about.methodology.desc')}
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, i) => (
                            <div key={i} className="relative group">
                                <div className="p-8 rounded-[2.5rem] bg-background border border-border/50 shadow-sm hover:shadow-premium transition-all duration-500 h-full">
                                    <div className="text-6xl font-black text-accent/10 absolute top-4 right-8 group-hover:text-accent/20 transition-colors">0{i + 1}</div>
                                    <h3 className="text-xl font-bold mb-4 mt-4">{step.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="relative rounded-[4rem] overflow-hidden bg-accent p-12 lg:p-20 text-center text-white">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -mr-48 -mt-48" />
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] -ml-48 -mb-48" />

                        <div className="relative max-w-3xl mx-auto space-y-10">
                            <h2 className="text-4xl md:text-5xl font-bold font-['Outfit'] leading-tight">
                                {t('about.cta.title')}
                            </h2>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to={getLocalizedPath("/contact")}>
                                    <Button size="lg" className="bg-white text-accent hover:bg-white/90 px-10 h-16 rounded-2xl text-lg font-bold shadow-xl transition-all hover:-translate-y-1 w-full sm:w-auto">
                                        {t('about.cta.button')}
                                    </Button>
                                </Link>
                                <Link to={getLocalizedPath("/services")}>
                                    <Button size="lg" variant="outline" className="border-white/20 bg-transparent hover:bg-white text-white hover:text-accent px-10 h-16 rounded-2xl text-lg font-bold w-full sm:w-auto transition-all backdrop-blur-sm">
                                        {t('nav.services')}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

