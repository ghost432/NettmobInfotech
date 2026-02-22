import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";

export const WelcomePopup = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Check if user has seen the popup before
        const hasSeenPopup = localStorage.getItem("hasSeenWelcomePopup");

        if (!hasSeenPopup) {
            // Show popup after a short delay
            setTimeout(() => {
                setIsOpen(true);
            }, 500);

            // Auto-close after 30 seconds
            setTimeout(() => {
                handleClose();
            }, 30500);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        localStorage.setItem("hasSeenWelcomePopup", "true");
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
            <Card className="relative w-[90%] max-w-2xl border-none shadow-2xl rounded-[2rem] overflow-hidden animate-in zoom-in-95 duration-500">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors shadow-lg"
                    aria-label="Fermer"
                >
                    <X className="h-5 w-5" />
                </button>

                <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Image Section */}
                        <div className="relative h-64 md:h-auto">
                            <img
                                src="https://images.unsplash.com/photo-1556656793-08538906a9f8?q=80&w=2070&auto=format&fit=crop"
                                alt="NettmobInfotech"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>

                        {/* Content Section */}
                        <div className="p-8 md:p-12 flex flex-col justify-center bg-card">
                            <div className="mb-6">
                                <div className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-accent uppercase bg-accent/10 rounded-full">
                                    Bienvenue
                                </div>
                                <h2 className="text-3xl font-bold font-['Outfit'] text-primary mb-4">
                                    Bienvenue chez <span className="text-accent">NettmobInfotech</span>
                                </h2>
                                <p className="text-muted-foreground leading-relaxed mb-6">
                                    Votre partenaire de confiance en développement web, mobile et solutions digitales innovantes. Nous transformons vos idées en réalité avec expertise et passion.
                                </p>
                                <div className="space-y-2 text-sm text-muted-foreground mb-8">
                                    <p>✨ Solutions sur mesure</p>
                                    <p>🚀 Technologies de pointe</p>
                                    <p>💼 Accompagnement personnalisé</p>
                                </div>
                            </div>
                            <Button
                                onClick={handleClose}
                                size="lg"
                                className="w-full rounded-xl px-8 h-14 text-lg shadow-premium hover:scale-105 transition-transform"
                            >
                                Découvrir nos services
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
