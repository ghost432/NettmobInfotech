import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
    LogOut,
    Shield,
    ChevronDown,
    Megaphone,
    Globe,
    Smartphone,
    Search,
    PenTool,
    Palette,
    Cpu
} from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";
import { useAuth } from "@/store/AuthContext";
import { servicesData } from "@/data/servicesData";
import api from "@/lib/api";

const iconMap: Record<string, any> = {
    Megaphone,
    Globe,
    Smartphone,
    Search,
    PenTool,
    Palette,
    Cpu
};

export const Navbar = ({ isScrolled }: { isScrolled?: boolean }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [unreadCount, setUnreadCount] = useState(0);

    const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setIsMobileServicesOpen(false);
    };

    useEffect(() => {
        if (user?.isAdmin) {
            const fetchUnreadCount = async () => {
                try {
                    const [{ data: msgData }, { data: quoteData }] = await Promise.all([
                        api.get("/company/admin/messages/count"),
                        api.get("/company/admin/quotations/count")
                    ]);
                    setUnreadCount(msgData.unreadCount + quoteData.unreadCount);
                } catch (error) {
                    console.error("Error fetching unread count", error);
                }
            };
            fetchUnreadCount();
            const interval = setInterval(fetchUnreadCount, 30000);
            return () => clearInterval(interval);
        }
    }, [user]);

    const handleLogout = () => {
        logout();
        navigate("/");
    };
    return (
        <header className={`sticky z-40 w-[95%] max-w-7xl mx-auto border shadow-premium rounded-[25px] bg-background/95 transition-all duration-500 ${isScrolled ? 'top-2 py-1 h-16' : 'top-10 py-0 h-20'}`}>
            <div className="container flex h-full items-center justify-between mx-auto px-8 relative">
                <Link to="/" className="flex items-center space-x-2 shrink-0">
                    <img src="/Logo.png" alt="NettmobInfotech" className={`h-10 w-auto object-contain transition-all dark:hidden ${isScrolled ? 'scale-90' : 'scale-100'}`} />
                    <img src="/Logo-white.png" alt="NettmobInfotech" className={`h-10 w-auto object-contain transition-all hidden dark:block ${isScrolled ? 'scale-90' : 'scale-100'}`} />
                </Link>

                <nav className="hidden md:flex flex-1 items-center justify-center space-x-8 text-sm font-medium">
                    <Link to="/" className="transition-colors hover:text-accent">Accueil</Link>

                    <div className="group/dropdown h-full flex items-center">
                        <Link
                            to="/services"
                            className="flex items-center gap-1 transition-colors hover:text-accent group-hover/dropdown:text-accent py-4"
                        >
                            Services
                            <ChevronDown className="h-4 w-4 transition-transform group-hover/dropdown:rotate-180" />
                        </Link>

                        {/* Dropdown Menu - Centered relative to the entire Header Container */}
                        <div className="absolute top-[100%] left-0 right-0 flex justify-center pt-2 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-300 pointer-events-none group-hover/dropdown:pointer-events-auto">
                            <div className="bg-card border border-border/50 shadow-premium-dark rounded-[2.5rem] p-8 w-full max-w-7xl grid grid-cols-2 lg:grid-cols-4 gap-4 pointer-events-auto">
                                {servicesData.map((service) => {
                                    const Icon = iconMap[service.icon] || Globe;
                                    return (
                                        <Link
                                            key={service.slug}
                                            to={`/services/${service.slug}`}
                                            className="flex items-center gap-4 p-5 rounded-[2rem] hover:bg-accent/5 transition-colors group/item border border-transparent hover:border-accent/10"
                                        >
                                            <div className="p-3 bg-accent/10 rounded-2xl text-accent group-hover/item:bg-accent group-hover/item:text-white transition-all shadow-sm">
                                                <Icon className="h-6 w-6" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-base text-primary group-hover/item:text-accent transition-colors leading-tight">
                                                    {service.title}
                                                </span>
                                            </div>
                                        </Link>
                                    );
                                })}
                                <div className="col-span-full mt-4 pt-6 border-t border-border/50 flex justify-center">
                                    <Link to="/services">
                                        <Button variant="ghost" className="text-sm font-bold uppercase tracking-widest text-muted-foreground hover:bg-accent hover:text-white transition-all py-6 px-10 rounded-2xl">
                                            Explorer tous nos services techniques
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Link to="/expertise" className="transition-colors hover:text-accent font-bold">Expertise</Link>
                    <Link to="/actus" className="transition-colors hover:text-accent font-bold">Actus</Link>
                    <Link to="/a-propos" className="transition-colors hover:text-accent">À Propos</Link>
                    <Link to="/contact" className="transition-colors hover:text-accent">Contact</Link>

                    {user?.isAdmin && (
                        <Link to="/admin/stats" className="transition-colors hover:text-accent flex items-center gap-1 text-accent">
                            <Shield className="h-4 w-4" />
                            Admin
                            {unreadCount > 0 && (
                                <span className="flex items-center justify-center bg-accent text-white text-[10px] h-5 min-w-5 px-1.5 rounded-full font-bold ml-1">
                                    {unreadCount}
                                </span>
                            )}
                        </Link>
                    )}
                </nav>

                <div className="hidden md:flex items-center space-x-4">
                    <ThemeToggle />

                    <Link to="/demande-de-devis">
                        <Button variant="outline" className="rounded-xl px-6 border-accent text-accent hover:bg-accent hover:text-white transition-all shadow-sm font-bold">
                            Demander un Devis
                        </Button>
                    </Link>

                    {user ? (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/5"
                            onClick={handleLogout}
                        >
                            <LogOut className="h-4 w-4 mr-2" /> Déconnexion
                        </Button>
                    ) : (
                        // Button hidden when not logged in per user request
                        null
                    )}
                </div>

                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="ghost" size="icon" className="h-14 w-14" onClick={() => setIsMobileMenuOpen(true)}>
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
                                <line x1="4" y1="9" x2="20" y2="9" />
                                <line x1="9" y1="15" x2="20" y2="15" />
                            </svg>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="rounded-l-[40px] border-none shadow-premium-dark w-[85%] max-w-[400px]">
                        <div className="flex flex-col h-full">
                            <div className="flex flex-col space-y-4 mt-12 overflow-y-auto pr-2">
                                <Link to="/" onClick={closeMobileMenu} className="text-2xl font-bold font-['Outfit'] hover:text-accent transition-colors">Accueil</Link>

                                <div className="flex flex-col">
                                    <button
                                        onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                                        className="text-2xl font-bold font-['Outfit'] hover:text-accent transition-colors flex items-center justify-between group"
                                    >
                                        <span>Services</span>
                                        <ChevronDown className={`h-6 w-6 transition-transform duration-300 ${isMobileServicesOpen ? 'rotate-180 text-accent' : ''}`} />
                                    </button>

                                    <div className={`grid transition-all duration-300 overflow-hidden ${isMobileServicesOpen ? 'grid-rows-[1fr] opacity-100 mt-4 mb-2' : 'grid-rows-[0fr] opacity-0'}`}>
                                        <div className="overflow-hidden flex flex-col space-y-3 pl-4 border-l-2 border-accent/20">
                                            {servicesData.map((service) => (
                                                <Link
                                                    key={service.slug}
                                                    to={`/services/${service.slug}`}
                                                    onClick={closeMobileMenu}
                                                    className="text-lg font-medium text-muted-foreground hover:text-accent transition-colors"
                                                >
                                                    {service.title}
                                                </Link>
                                            ))}
                                            <Link to="/services" onClick={closeMobileMenu} className="text-sm font-bold text-accent uppercase tracking-wider pt-2">
                                                Voir tout →
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <Link to="/expertise" onClick={closeMobileMenu} className="text-2xl font-bold font-['Outfit'] hover:text-accent transition-colors">Expertise</Link>
                                <Link to="/actus" onClick={closeMobileMenu} className="text-2xl font-bold font-['Outfit'] hover:text-accent transition-colors">Actus</Link>
                                <Link to="/a-propos" onClick={closeMobileMenu} className="text-2xl font-bold font-['Outfit'] hover:text-accent transition-colors">À Propos</Link>
                                <Link to="/contact" onClick={closeMobileMenu} className="text-2xl font-bold font-['Outfit'] hover:text-accent transition-colors">Contact</Link>

                                {user?.isAdmin && (
                                    <Link to="/admin" onClick={closeMobileMenu} className="text-2xl font-bold font-['Outfit'] text-accent flex items-center gap-2">
                                        <Shield className="h-6 w-6" /> Admin
                                    </Link>
                                )}
                            </div>

                            <div className="mt-auto pb-8 space-y-6">
                                <Link to="/demande-de-devis" onClick={closeMobileMenu}>
                                    <Button className="w-full h-14 rounded-2xl text-lg font-bold shadow-premium hover:bg-accent transition-colors">
                                        Demander un Devis
                                    </Button>
                                </Link>

                                <div className="flex items-center justify-between p-4 bg-accent/5 rounded-2xl">
                                    <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Mode Sombre</span>
                                    <ThemeToggle />
                                </div>

                                {user ? (
                                    <Button
                                        variant="outline"
                                        className="w-full h-14 rounded-2xl border-accent text-accent font-bold"
                                        onClick={handleLogout}
                                    >
                                        <LogOut className="h-5 w-5 mr-3" /> Déconnexion
                                    </Button>
                                ) : (
                                    /* Optional: Login button if you want it back later, but user asked for only logout */
                                    null
                                )}
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
};
