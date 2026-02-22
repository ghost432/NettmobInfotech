import { Mail, Phone, MapPin } from "lucide-react";

export const TopBar = ({ isScrolled }: { isScrolled?: boolean }) => {
    return (
        <div className={`w-[95%] max-w-7xl mx-auto mt-2 mb-1 py-1 text-sm md:text-base font-medium text-muted-foreground transition-all duration-500 overflow-hidden ${isScrolled ? 'h-0 mt-0 mb-0 py-0 opacity-0 pointer-events-none' : 'h-auto opacity-100'}`}>
            <div className="container mx-auto px-4 md:px-8">
                {/* Desktop Layout */}
                <div className="hidden md:flex justify-between items-center">
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-accent" />
                            <span>10 Rue du Colisée, 75008 Paris</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-6">
                        <a href="tel:+33766390992" className="flex items-center space-x-2 hover:text-accent transition-colors">
                            <Phone className="h-4 w-4 text-accent" />
                            <span>+33 7 66 39 09 92</span>
                        </a>
                        <a href="mailto:contact@nettmobinfotech.fr" className="flex items-center space-x-2 hover:text-accent transition-colors">
                            <Mail className="h-4 w-4 text-accent" />
                            <span>contact@nettmobinfotech.fr</span>
                        </a>
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden flex flex-col space-y-4">
                    <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center space-x-2 shrink-0">
                            <MapPin className="h-4 w-4 text-accent" />
                            <span className="text-[10px] xs:text-xs">10 Rue du Colisée, 75008 Paris</span>
                        </div>
                        <a href="mailto:contact@nettmobinfotech.fr" className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-accent" />
                            <span>contact@nettmobinfotech.fr</span>
                        </a>
                    </div>
                    <div className="flex justify-center pt-1">
                        <a href="tel:+33766390992" className="flex items-center space-x-2 text-accent font-bold text-sm">
                            <Phone className="h-5 w-5" />
                            <span>+33 7 66 39 09 92</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
