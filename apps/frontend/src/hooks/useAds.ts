import { useState, useEffect } from "react";
import api from "@/lib/api";

export type AdFormat = "square" | "rectangle" | "vertical" | "horizontal";

export interface Ad {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    buttonText: string;
    buttonUrl: string;
    format: AdFormat;
    pages: string[];
    isActive: boolean;
    createdAt: string;
}

export function useAds(page: string) {
    const [ads, setAds] = useState<Ad[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        api.get(`/ads?page=${page}`)
            .then(res => { if (!cancelled) setAds(res.data); })
            .catch(() => { if (!cancelled) setAds([]); })
            .finally(() => { if (!cancelled) setLoading(false); });
        return () => { cancelled = true; };
    }, [page]);

    return { ads, loading };
}
