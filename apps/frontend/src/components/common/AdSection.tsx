import { useAds } from "@/hooks/useAds";
import type { Ad, AdFormat } from "@/hooks/useAds";
import { ExternalLink } from "lucide-react";

// ─── Single Ad Card ──────────────────────────────────────────────────────────

function AdCard({ ad }: { ad: Ad }) {
    return (
        <a
            href={ad.buttonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex overflow-hidden cursor-pointer rounded-2xl border border-white/10 hover:border-accent/40 bg-gradient-to-br from-slate-900/95 to-slate-800/90 backdrop-blur-md shadow-lg hover:shadow-accent/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            title={ad.title}
        >
            {/* Pub badge */}
            <span className="absolute top-1.5 left-2 z-10 text-[7px] font-bold uppercase tracking-widest bg-white/10 text-white/40 px-1.5 py-0.5 rounded-full">
                Pub
            </span>

            {/* Shimmer on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

            {/* Image */}
            {ad.imageUrl && (
                <div className="relative overflow-hidden w-20 h-full shrink-0">
                    <img
                        src={ad.imageUrl}
                        alt={ad.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/60" />
                </div>
            )}

            {/* Content */}
            <div className="flex flex-col justify-center px-4 py-3 flex-1 min-w-0">
                <p className="font-black text-sm text-white truncate leading-tight">{ad.title}</p>
                {ad.description && (
                    <p className="text-[10px] text-white/55 mt-1 line-clamp-1">{ad.description}</p>
                )}
                <span className="mt-2 inline-flex items-center gap-1 w-fit bg-gradient-to-r from-violet-600 to-blue-600 text-white text-[9px] font-bold px-2.5 py-1 rounded-lg whitespace-nowrap">
                    {ad.buttonText} <ExternalLink className="h-2.5 w-2.5" />
                </span>
            </div>
        </a>
    );
}

// ─── Tall/Vertical Ad Card ───────────────────────────────────────────────────

function AdCardTall({ ad }: { ad: Ad }) {
    return (
        <a
            href={ad.buttonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col overflow-hidden cursor-pointer rounded-2xl border border-white/10 hover:border-accent/40 bg-gradient-to-b from-slate-900/95 to-slate-800/90 backdrop-blur-md shadow-lg hover:shadow-accent/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full"
            title={ad.title}
        >
            <span className="absolute top-2 right-2 z-10 text-[7px] font-bold uppercase tracking-widest bg-black/40 text-white/40 px-1.5 py-0.5 rounded-full backdrop-blur-sm">
                Pub
            </span>
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {ad.imageUrl && (
                <div className="relative overflow-hidden h-32 shrink-0">
                    <img src={ad.imageUrl} alt={ad.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/80" />
                </div>
            )}

            <div className="flex flex-col flex-1 justify-between p-3">
                <div>
                    <p className="font-black text-sm text-white leading-tight line-clamp-2">{ad.title}</p>
                    {ad.description && (
                        <p className="text-[10px] text-white/55 mt-1 line-clamp-2">{ad.description}</p>
                    )}
                </div>
                <span className="mt-3 flex items-center justify-center gap-1 bg-gradient-to-r from-violet-600 to-blue-600 text-white text-[9px] font-bold py-1.5 px-3 rounded-xl">
                    {ad.buttonText} <ExternalLink className="h-2.5 w-2.5" />
                </span>
            </div>
        </a>
    );
}

// ─── AdSection ───────────────────────────────────────────────────────────────

interface AdSectionProps {
    page: string;
    className?: string;
}

function pickOne(ads: Ad[], format: AdFormat): Ad | null {
    const pool = ads.filter(a => a.format === format);
    if (pool.length === 0) return null;
    return pool[Math.floor(Math.random() * pool.length)];
}

export function AdSection({ page, className = "" }: AdSectionProps) {
    const { ads, loading } = useAds(page);

    if (loading || ads.length === 0) return null;

    const rect1 = pickOne(ads, "rectangle");
    const rect2 = pickOne(ads, "rectangle");
    const sq1 = pickOne(ads, "square");
    const sq2 = pickOne(ads, "square");
    const vert = pickOne(ads, "vertical");
    const horiz = pickOne(ads, "horizontal");

    return (
        <section className={`py-10 ${className}`}>
            <div className="container mx-auto px-4 lg:px-8 space-y-4">

                {/* Label */}
                <div className="flex items-center gap-2 mb-2">
                    <div className="h-px flex-1 bg-border/30" />
                    <span className="text-[9px] uppercase tracking-widest text-muted-foreground/40 font-bold">Publicités</span>
                    <div className="h-px flex-1 bg-border/30" />
                </div>

                {/* ROW 1 : two rectangles stacked */}
                <div className="grid grid-cols-1 gap-3">
                    {rect1 && <div className="h-[72px]"><AdCard ad={rect1} /></div>}
                    {rect2 && rect2.id !== rect1?.id && <div className="h-[72px]"><AdCard ad={rect2} /></div>}
                </div>

                {/* ROW 2 : vertical (left) + two squares (right) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                    {vert && (
                        <div className="lg:row-span-2 min-h-[220px]">
                            <AdCardTall ad={vert} />
                        </div>
                    )}
                    {sq1 && (
                        <div className="lg:col-span-2 h-[100px]">
                            <AdCard ad={sq1} />
                        </div>
                    )}
                    {sq2 && sq2.id !== sq1?.id && (
                        <div className="lg:col-span-2 h-[100px]">
                            <AdCard ad={sq2} />
                        </div>
                    )}
                </div>

                {/* ROW 3 : horizontal banner */}
                {horiz && <div className="h-[56px]"><AdCard ad={horiz} /></div>}
            </div>
        </section>
    );
}
