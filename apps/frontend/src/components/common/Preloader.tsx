import { useEffect, useState } from "react";

export const Preloader = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Hide preloader after a short delay or when page is loaded
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    if (!loading) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
            <div className="relative">
                {/* Spinning circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 border-4 border-accent/20 border-t-accent rounded-full animate-spin"></div>
                </div>

                {/* Logo in the center */}
                <div className="relative z-10 w-24 h-24 flex items-center justify-center">
                    <img
                        src="/Logo.png"
                        alt="Loading"
                        className="w-14 h-14 object-contain dark:hidden"
                    />
                    <img
                        src="/Logo-white.png"
                        alt="Loading"
                        className="w-14 h-14 object-contain hidden dark:block"
                    />
                </div>
            </div>
        </div>
    );
};
