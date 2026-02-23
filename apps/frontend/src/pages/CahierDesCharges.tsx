import { Button } from "@/components/ui/button";
import { FileText, CheckCircle2, Send } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";
import { AdBanner } from "@/components/common/AdBanner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import api from "@/lib/api";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";

interface SpecificationForm {
    companyName: string;
    contactName: string;
    email: string;
    phone: string;
    projectType: string;
    otherProjectType?: string;
    description: string;
    budget?: string;
    deadline?: string;
    startDate?: string;
}

export const CahierDesCharges = () => {
    const { t } = useTranslation();
    usePageTitle(t('cahier.title'));
    const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm<SpecificationForm>();
    const projectType = watch("projectType");
    const [showSuccess, setShowSuccess] = useState(false);

    const onSubmit = async (data: SpecificationForm) => {
        try {
            await api.post('/company/specifications', data);
            setShowSuccess(true);
            reset();
        } catch (error) {
            console.error(error);
            toast.error(t('contact.form.error'));
        }
    };

    return (
        <div className="flex flex-col">
            {/* Hero */}
            <section className="relative py-20 bg-background overflow-hidden">
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent/10 text-accent mb-6">
                        <FileText className="h-4 w-4" />
                        <span className="text-xs font-bold uppercase tracking-widest">{t('cahier.hero.badge')}</span>
                    </div>
                    <h1 className="text-4xl lg:text-6xl font-bold font-['Outfit'] text-primary mb-6">
                        {t('cahier.hero.title')}
                    </h1>
                    <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                        {t('cahier.hero.desc')}
                    </p>
                </div>
            </section>

            {/* Ad — Horizontal (après Hero) */}
            <AdBanner page="cahier" format="horizontal" className="py-4 bg-background" />

            {/* Form Section */}
            <section className="py-16 bg-card" id="form-section">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Information Guide */}
                        <div className="prose prose-lg dark:prose-invert">
                            <h2 className="text-primary font-bold font-['Outfit']">Pourquoi est-il indispensable ?</h2>
                            <p>
                                Un cahier des charges est un document contractuel qui décrit précisément vos besoins, vos contraintes et vos objectifs. Il sert de feuille de route tout au long du développement.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-6 my-8 not-prose">
                                <div className="p-4 bg-background rounded-2xl shadow-sm border border-border/50">
                                    <h3 className="flex items-center gap-2 font-bold text-primary mb-2 text-base">
                                        <CheckCircle2 className="text-accent h-4 w-4" /> Clarté
                                    </h3>
                                    <p className="text-xs text-muted-foreground">Alignement de la vision de toutes les parties.</p>
                                </div>
                                <div className="p-4 bg-background rounded-2xl shadow-sm border border-border/50">
                                    <h3 className="flex items-center gap-2 font-bold text-primary mb-2 text-base">
                                        <CheckCircle2 className="text-accent h-4 w-4" /> Budget Maîtrisé
                                    </h3>
                                    <p className="text-xs text-muted-foreground">Évite les surcoûts imprévus.</p>
                                </div>
                                <div className="p-4 bg-background rounded-2xl shadow-sm border border-border/50">
                                    <h3 className="flex items-center gap-2 font-bold text-primary mb-2 text-base">
                                        <CheckCircle2 className="text-accent h-4 w-4" /> Délais Respectés
                                    </h3>
                                    <p className="text-xs text-muted-foreground">Planning réaliste et maîtrisé.</p>
                                </div>
                                <div className="p-4 bg-background rounded-2xl shadow-sm border border-border/50">
                                    <h3 className="flex items-center gap-2 font-bold text-primary mb-2 text-base">
                                        <CheckCircle2 className="text-accent h-4 w-4" /> Qualité
                                    </h3>
                                    <p className="text-xs text-muted-foreground">Référence pour la validation finale.</p>
                                </div>
                            </div>
                        </div>

                        {/* Submission Form */}
                        <div className="bg-background p-8 rounded-[2rem] shadow-premium border border-border/50 relative">
                            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                                <FileText className="h-32 w-32" />
                            </div>
                            <h3 className="text-2xl font-bold font-['Outfit'] text-primary mb-6">{t('cahier.form.title')}</h3>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative z-10">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">{t('cahier.form.company')}</label>
                                        <input
                                            {...register("companyName", { required: "Requis" })}
                                            className="w-full p-3 rounded-xl bg-accent/5 border border-transparent focus:border-accent focus:bg-background transition-all outline-none"
                                            placeholder={t('cahier.form.company')}
                                        />
                                        {errors.companyName && <span className="text-xs text-red-500">{errors.companyName.message}</span>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">{t('cahier.form.contact')}</label>
                                        <input
                                            {...register("contactName", { required: "Requis" })}
                                            className="w-full p-3 rounded-xl bg-accent/5 border border-transparent focus:border-accent focus:bg-background transition-all outline-none"
                                            placeholder={t('cahier.form.contact')}
                                        />
                                        {errors.contactName && <span className="text-xs text-red-500">{errors.contactName.message}</span>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">{t('cahier.form.email')}</label>
                                        <input
                                            type="email"
                                            {...register("email", { required: "Requis" })}
                                            className="w-full p-3 rounded-xl bg-accent/5 border border-transparent focus:border-accent focus:bg-background transition-all outline-none"
                                            placeholder={t('contact.form.emailPlaceholder')}
                                        />
                                        {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">{t('cahier.form.phone')}</label>
                                        <input
                                            {...register("phone", { required: "Requis" })}
                                            className="w-full p-3 rounded-xl bg-accent/5 border border-transparent focus:border-accent focus:bg-background transition-all outline-none"
                                            placeholder={t('contact.form.phonePlaceholder')}
                                        />
                                        {errors.phone && <span className="text-xs text-red-500">{errors.phone.message}</span>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">{t('cahier.form.type')}</label>
                                    <select
                                        {...register("projectType", { required: "Requis" })}
                                        className="w-full p-3 rounded-xl bg-accent/5 border border-transparent focus:border-accent focus:bg-background transition-all outline-none"
                                    >
                                        <option value="">Sélectionnez un type...</option>
                                        <option value="Site Vitrine">Site Vitrine</option>
                                        <option value="E-commerce">E-commerce</option>
                                        <option value="Application Mobile">Application Mobile</option>
                                        <option value="Logiciel Sur Mesure">Logiciel Sur Mesure</option>
                                        <option value="Chatbot">Chatbot</option>
                                        <option value="Services Plateforme">Services Plateforme</option>
                                        <option value="Autre">Autre</option>
                                    </select>
                                    {errors.projectType && <span className="text-xs text-red-500">{errors.projectType.message}</span>}
                                </div>

                                {projectType === "Autre" && (
                                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <label className="text-sm font-medium">{t('cahier.form.typeOther')}</label>
                                        <input
                                            {...register("otherProjectType", { required: "Veuillez préciser le type" })}
                                            className="w-full p-3 rounded-xl bg-accent/5 border border-transparent focus:border-accent focus:bg-background transition-all outline-none"
                                            placeholder={t('cahier.form.typeOther')}
                                        />
                                        {errors.otherProjectType && <span className="text-xs text-red-500">{errors.otherProjectType.message}</span>}
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">{t('cahier.form.desc')}</label>
                                    <textarea
                                        {...register("description", { required: "Requis" })}
                                        rows={4}
                                        className="w-full p-3 rounded-xl bg-accent/5 border border-transparent focus:border-accent focus:bg-background transition-all outline-none resize-none"
                                        placeholder={t('cahier.form.desc')}
                                    />
                                    {errors.description && <span className="text-xs text-red-500">{errors.description.message}</span>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">{t('cahier.form.budget')}</label>
                                        <select
                                            {...register("budget")}
                                            className="w-full p-3 rounded-xl bg-accent/5 border border-transparent focus:border-accent focus:bg-background transition-all outline-none"
                                        >
                                            <option value="">Non défini</option>
                                            <option value="< 1k€">&lt; 1 000 €</option>
                                            <option value="1k€-5k€">1 000 € - 5 000 €</option>
                                            <option value="5k€-10k€">5 000 € - 10 000 €</option>
                                            <option value="> 10k€">&gt; 10 000 €</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">{t('cahier.form.startDate')}</label>
                                        <input
                                            type="date"
                                            {...register("startDate")}
                                            className="w-full p-3 rounded-xl bg-accent/5 border border-transparent focus:border-accent focus:bg-background transition-all outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">{t('cahier.form.deadline')}</label>
                                        <input
                                            type="date"
                                            {...register("deadline")}
                                            className="w-full p-3 rounded-xl bg-accent/5 border border-transparent focus:border-accent focus:bg-background transition-all outline-none"
                                        />
                                    </div>
                                </div>

                                <Button type="submit" disabled={isSubmitting} className="w-full rounded-xl py-6 text-lg font-bold shadow-lg mt-4">
                                    {isSubmitting ? t('cahier.form.sending') : (
                                        <>{t('cahier.form.submit')} <Send className="ml-2 h-4 w-4" /></>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ad Banner */}
            <AdBanner page="cahier" format="rectangle" className="py-6 bg-card" />

            {/* Success Dialog */}
            <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
                <DialogContent className="sm:max-w-md rounded-[2rem] border-none p-0 overflow-hidden">
                    <div className="bg-accent/10 p-8 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="bg-background rounded-full p-4 shadow-lg animate-bounce">
                            <CheckCircle2 className="h-12 w-12 text-accent" />
                        </div>
                        <DialogTitle className="text-2xl font-bold font-['Outfit'] text-primary">{t('cahier.form.success.title')}</DialogTitle>
                        <DialogDescription className="text-lg">
                            {t('cahier.form.success.desc')}
                        </DialogDescription>
                        <p className="text-muted-foreground">
                            {t('cahier.form.success.sub')}
                        </p>
                        <Button onClick={() => setShowSuccess(false)} className="rounded-xl px-8 w-full mt-4">
                            {t('cahier.form.success.button')}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

        </div>
    );
};

export default CahierDesCharges;
