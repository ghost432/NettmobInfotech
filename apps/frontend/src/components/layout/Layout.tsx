import React, { useState, useEffect } from "react";
import { TopBar } from "./TopBar";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const Layout = ({ children }: { children: React.ReactNode }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
            <TopBar isScrolled={isScrolled} />
            <Navbar isScrolled={isScrolled} />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
};
