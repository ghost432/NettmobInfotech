import { useAds } from "@/hooks/useAds";
import type { Ad, AdFormat } from "@/hooks/useAds";
import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";

interface AdBannerProps {
    page: string;
    format?: AdFormat;
    className?: string;
}

const FORMAT_STYLES: Record<AdFormat, { wrapper: string; img: string; label: string }> = {
    rectangle: {
        wrapper: "w-full lg:max-w-[850px] h-[130px] flex-row items-center rounded-2xl overflow-hidden",
        img: "w-1/3 h-full shrink-0",
        label: "rectangle",
    },
    square: {
        wrapper: "w-[360px] h-[360px] flex-col rounded-3xl",
        img: "w-full h-[200px] shrink-0 rounded-2xl",
        label: "square",
    },
    vertical: {
        wrapper: "w-full min-h-[300px] h-full flex-col rounded-3xl",
        img: "w-full h-[200px] shrink-0 rounded-2xl",
        label: "vertical",
    },
    horizontal: {
        wrapper: "w-full max-w-[1000px] h-[110px] flex-row items-center rounded-2xl overflow-hidden",
        img: "w-1/3 h-full shrink-0",
        label: "horizontal",
    },
};

// Helper: Get translated field safely
function getTranslatedField(ad: Ad, field: 'title' | 'description' | 'buttonText', lang: string): string {
    const key = `${field}_${lang}` as keyof Ad;
    if (lang === 'fr') return ad[field] || "";
    return (ad[key] as string) || ad[field] || "";
}

function SingleAd({ ad }: { ad: Ad }) {
    const { i18n } = useTranslation();
    const activeLang = i18n.language || 'fr';
    const style = FORMAT_STYLES[ad.format];

    // Dynamic fields based on current language
    const displayTitle = getTranslatedField(ad, 'title', activeLang);
    const displayDesc = getTranslatedField(ad, 'description', activeLang);
    const displayBtn = getTranslatedField(ad, 'buttonText', activeLang);

    if (ad.format === "rectangle") {
        return (
            <a
                href={ad.buttonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex overflow-hidden cursor-pointer border border-white/10 hover:border-white/20 bg-gradient-to-r from-slate-900/90 to-slate-800/90 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 ${style.wrapper}`}
                title={ad.title}
            >
                {/* Pub badge */}
                <span className="absolute top-1 left-1 z-10 text-[8px] font-bold uppercase tracking-widest bg-white/10 text-white/50 px-1.5 py-0.5 rounded-full">Pub</span>
                {/* Image */}
                {ad.imageUrl && (
                    <div className={`relative overflow-hidden ${style.img}`}>
                        <img src={ad.imageUrl} alt={ad.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/40" />
                    </div>
                )}
                {/* Content */}
                <div className="flex-1 flex flex-col justify-center px-4 min-w-0">
                    <p className="font-black text-sm text-white truncate">{displayTitle}</p>
                    {displayDesc && (
                        <p className="text-[10px] text-white/60 truncate mt-0.5">{displayDesc}</p>
                    )}
                </div>
                {/* CTA */}
                <div className="flex items-center pr-3">
                    <span className="shrink-0 flex items-center gap-1 bg-gradient-to-r from-violet-600 to-blue-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-xl hover:opacity-90 transition-opacity whitespace-nowrap">
                        {displayBtn} <ExternalLink className="h-2.5 w-2.5" />
                    </span>
                </div>
            </a>
        );
    }

    if (ad.format === "horizontal") {
        return (
            <a
                href={ad.buttonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex overflow-hidden cursor-pointer border border-white/10 hover:border-white/20 bg-gradient-to-r from-slate-900/90 to-slate-800/90 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 ${style.wrapper}`}
                title={ad.title}
            >
                <span className="absolute top-0.5 left-1 z-10 text-[7px] font-bold uppercase tracking-widest bg-white/10 text-white/40 px-1 py-0.5 rounded-full">Pub</span>
                {ad.imageUrl && (
                    <div className={`relative overflow-hidden ${style.img}`}>
                        <img src={ad.imageUrl} alt={ad.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/40" />
                    </div>
                )}
                <div className="flex-1 flex items-center px-3 min-w-0">
                    <p className="font-bold text-xs text-white truncate">{displayTitle}</p>
                </div>
                <div className="flex items-center pr-2">
                    <span className="shrink-0 flex items-center gap-1 bg-gradient-to-r from-violet-600 to-blue-600 text-white text-[9px] font-bold px-2 py-1 rounded-lg whitespace-nowrap">
                        {displayBtn} <ExternalLink className="h-2 w-2" />
                    </span>
                </div>
            </a>
        );
    }

    // Square & Vertical (flex-col)
    return (
        <a
            href={ad.buttonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative flex overflow-hidden cursor-pointer border border-white/10 hover:border-white/20 bg-gradient-to-b from-slate-900/95 to-slate-800/95 backdrop-blur-md shadow-2xl hover:shadow-violet-500/20 transition-all duration-500 hover:-translate-y-1 ${style.wrapper}`}
            title={ad.title}
        >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            {/* Pub badge */}
            <span className="absolute top-2 right-2 z-10 text-[8px] font-bold uppercase tracking-widest bg-black/40 text-white/50 px-1.5 py-0.5 rounded-full backdrop-blur-sm">Pub</span>
            {/* Image */}
            {ad.imageUrl && (
                <div className={`relative overflow-hidden ${style.img}`}>
                    <img src={ad.imageUrl} alt={ad.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/80" />
                </div>
            )}
            {/* Content */}
            <div className="flex flex-col flex-1 justify-between p-3">
                <div>
                    <p className="font-black text-sm text-white leading-tight line-clamp-2">{displayTitle}</p>
                    {displayDesc && (
                        <p className="text-[10px] text-white/60 mt-1 leading-relaxed line-clamp-3">{displayDesc}</p>
                    )}
                </div>
                <a
                    href={ad.buttonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="mt-2 flex items-center justify-center gap-1.5 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white text-[10px] font-bold py-2 px-3 rounded-xl transition-all duration-300 shadow-lg shadow-violet-900/30"
                >
                    {displayBtn} <ExternalLink className="h-2.5 w-2.5" />
                </a>
            </div>
        </a>
    );
}

export function AdBanner({ page, format, className = "" }: AdBannerProps) {
    const { ads, loading } = useAds(page);

    if (loading) return null;

    const filtered = format ? ads.filter(a => a.format === format) : ads;
    if (filtered.length === 0) return null;

    // Pick a random ad from the filtered list (or cycle through them)
    const ad = filtered[Math.floor(Math.random() * filtered.length)];

    return (
        <div className={`flex justify-center items-center px-4 ${className}`}>
            <SingleAd ad={ad} />
        </div>
    );
}

// Display multiple ads for a page
export function AdBannerGrid({ page, format, className = "" }: AdBannerProps) {
    const { ads, loading } = useAds(page);

    if (loading) return null;

    const filtered = format ? ads.filter(a => a.format === format) : ads;
    if (filtered.length === 0) return null;

    return (
        <div className={`flex flex-wrap justify-center gap-4 ${className}`}>
            {filtered.map(ad => (
                <SingleAd key={ad.id} ad={ad} />
            ))}
        </div>
    );
}
