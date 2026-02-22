import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.pageYOffset > 300);
        };
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!isVisible) return null;

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-accent hover:bg-accent/90 text-white p-3.5 rounded-full shadow-xl cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 animate-in fade-in slide-in-from-bottom-5"
            aria-label="Remonter en haut"
        >
            <ChevronUp className="h-6 w-6 text-white" />
        </button>
    );
};
