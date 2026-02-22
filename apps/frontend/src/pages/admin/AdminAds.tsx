import { useEffect, useState } from "react";
import { Plus, Search, Edit2, Trash2, ToggleLeft, ToggleRight, Image as ImageIcon, Monitor } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import api from "@/lib/api";
import { toast } from "sonner";

type AdFormat = "square" | "rectangle" | "vertical" | "horizontal";
type AdPage = "home" | "expertise" | "service-detail" | "services" | "actus" | "devis" | "cahier";

interface Ad {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    buttonText: string;
    buttonUrl: string;
    format: AdFormat;
    pages: AdPage[];
    isActive: boolean;
    createdAt: string;
}

const FORMATS: { value: AdFormat; label: string; size: string }[] = [
    { value: "rectangle", label: "Rectangulaire", size: "Pleine largeur × 110px — image 50%" },
    { value: "square", label: "Carré", size: "360×360" },
    { value: "vertical", label: "Vertical", size: "160×650" },
    { value: "horizontal", label: "Horizontal", size: "max 672px × 80px — image 50%" },
];

const PAGES: { value: AdPage; label: string }[] = [
    { value: "home", label: "Accueil" },
    { value: "expertise", label: "Expertise" },
    { value: "service-detail", label: "Détail des Services" },
    { value: "services", label: "Services" },
    { value: "actus", label: "Actualités" },
    { value: "devis", label: "Demande de Devis" },
    { value: "cahier", label: "Cahier des Charges" },
];

const FORMAT_BADGES: Record<AdFormat, { label: string; color: string }> = {
    rectangle: { label: "Rectangle · 110px", color: "bg-blue-500/10 text-blue-500" },
    square: { label: "Carré · 360×360", color: "bg-violet-500/10 text-violet-500" },
    vertical: { label: "Vertical · 160×650", color: "bg-emerald-500/10 text-emerald-500" },
    horizontal: { label: "Horizontal · 80px", color: "bg-amber-500/10 text-amber-500" },
};

const emptyForm = {
    title: "",
    description: "",
    imageUrl: "",
    buttonText: "En savoir plus",
    buttonUrl: "",
    format: "rectangle" as AdFormat,
    pages: [] as AdPage[],
    isActive: true,
};

export const AdminAds = () => {
    const [ads, setAds] = useState<Ad[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingAd, setEditingAd] = useState<Ad | null>(null);
    const [formData, setFormData] = useState({ ...emptyForm });

    useEffect(() => { fetchAds(); }, []);

    const fetchAds = async () => {
        try {
            setLoading(true);
            const res = await api.get("/ads/admin");
            setAds(res.data);
        } catch {
            toast.error("Erreur lors du chargement des publicités");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDialog = (ad: Ad | null = null) => {
        if (ad) {
            setEditingAd(ad);
            setFormData({
                title: ad.title,
                description: ad.description || "",
                imageUrl: ad.imageUrl || "",
                buttonText: ad.buttonText || "En savoir plus",
                buttonUrl: ad.buttonUrl || "",
                format: ad.format,
                pages: ad.pages || [],
                isActive: ad.isActive,
            });
        } else {
            setEditingAd(null);
            setFormData({ ...emptyForm });
        }
        setIsDialogOpen(true);
    };

    const handleSave = async () => {
        if (!formData.title || !formData.format) {
            toast.error("Titre et format sont requis");
            return;
        }
        try {
            if (editingAd) {
                await api.patch(`/ads/admin/${editingAd.id}`, formData);
                toast.success("Publicité mise à jour");
            } else {
                await api.post("/ads/admin", formData);
                toast.success("Publicité créée");
            }
            setIsDialogOpen(false);
            fetchAds();
        } catch {
            toast.error("Erreur lors de l'enregistrement");
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Supprimer cette publicité ?")) return;
        try {
            await api.delete(`/ads/admin/${id}`);
            toast.success("Publicité supprimée");
            fetchAds();
        } catch {
            toast.error("Erreur lors de la suppression");
        }
    };

    const handleToggle = async (ad: Ad) => {
        try {
            await api.patch(`/ads/admin/${ad.id}`, { isActive: !ad.isActive });
            toast.success(ad.isActive ? "Publicité désactivée" : "Publicité activée");
            fetchAds();
        } catch {
            toast.error("Erreur");
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setFormData({ ...formData, imageUrl: reader.result as string });
            reader.readAsDataURL(file);
        }
    };

    const togglePage = (page: AdPage) => {
        const pages = formData.pages.includes(page)
            ? formData.pages.filter(p => p !== page)
            : [...formData.pages, page];
        setFormData({ ...formData, pages });
    };

    const filtered = ads.filter(a =>
        a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.format.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black">Gestion des <span className="text-accent underline decoration-accent/30 underline-offset-8">Publicités</span></h2>
                    <p className="text-muted-foreground mt-2">Créez et gérez vos bannières publicitaires sur le site.</p>
                </div>
                <Button
                    onClick={() => handleOpenDialog()}
                    className="rounded-xl bg-accent hover:bg-accent/90 text-white font-bold px-6 shadow-lg shadow-accent/20 h-12"
                >
                    <Plus className="h-5 w-5 mr-2" />
                    Ajouter une Publicité
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {FORMATS.map(f => {
                    const count = ads.filter(a => a.format === f.value).length;
                    const badge = FORMAT_BADGES[f.value];
                    return (
                        <Card key={f.value} className="rounded-[2rem] border-border/50 bg-card/30 backdrop-blur-md">
                            <CardContent className="p-6">
                                <div className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-black mb-2 ${badge.color}`}>{badge.label}</div>
                                <div className="text-3xl font-black">{count}</div>
                                <div className="text-muted-foreground text-sm font-medium">{f.label}</div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Search */}
            <Card className="rounded-[2rem] border-border/50 bg-card/30 backdrop-blur-sm">
                <CardContent className="p-6">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Rechercher par titre ou format..."
                            className="pl-12 rounded-2xl bg-background/50 border-border/50 h-12 focus-visible:ring-accent"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* List */}
            <div className="grid grid-cols-1 gap-4">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-accent" />
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-20 bg-muted/20 rounded-[2rem] border-2 border-dashed border-border/50">
                        <Monitor className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                        <p className="text-muted-foreground">Aucune publicité trouvée.</p>
                    </div>
                ) : (
                    filtered.map(ad => {
                        const badge = FORMAT_BADGES[ad.format];
                        return (
                            <Card key={ad.id} className={`rounded-3xl border-border/50 bg-card/40 hover:bg-card/60 transition-all duration-300 group overflow-hidden ${!ad.isActive ? 'opacity-60' : ''}`}>
                                <CardContent className="p-4 flex flex-col md:flex-row items-center gap-6">
                                    {/* Image */}
                                    <div className="w-full md:w-32 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-muted border border-border/50">
                                        {ad.imageUrl ? (
                                            <img src={ad.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <ImageIcon className="h-8 w-8 text-muted-foreground/30" />
                                            </div>
                                        )}
                                    </div>
                                    {/* Info */}
                                    <div className="flex-1 min-w-0 text-center md:text-left">
                                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${badge.color}`}>
                                                {FORMATS.find(f => f.value === ad.format)?.label} · {badge.label}
                                            </span>
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${ad.isActive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                                {ad.isActive ? "Actif" : "Inactif"}
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-lg truncate group-hover:text-accent transition-colors">{ad.title}</h3>
                                        {ad.description && (
                                            <p className="text-sm text-muted-foreground truncate mt-0.5">{ad.description}</p>
                                        )}
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {(ad.pages || []).map(p => (
                                                <span key={p} className="px-2 py-0.5 bg-accent/10 text-accent text-[9px] font-bold uppercase rounded-full">
                                                    {PAGES.find(pg => pg.value === p)?.label || p}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    {/* Actions */}
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => handleToggle(ad)} className={`rounded-xl ${ad.isActive ? 'hover:bg-red-500/10 hover:text-red-500' : 'hover:bg-green-500/10 hover:text-green-500'}`}>
                                            {ad.isActive ? <ToggleRight className="h-5 w-5 text-green-500" /> : <ToggleLeft className="h-5 w-5 text-muted-foreground" />}
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(ad)} className="rounded-xl hover:bg-blue-500/10 hover:text-blue-500">
                                            <Edit2 className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(ad.id)} className="rounded-xl hover:bg-red-500/10 hover:text-red-500">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })
                )}
            </div>

            {/* Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] border-border/50 bg-background/95 backdrop-blur-xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black">
                            {editingAd ? "Modifier la Publicité" : "Nouvelle Publicité"}
                        </DialogTitle>
                        <DialogDescription>
                            {editingAd ? "Modifiez" : "Remplissez"} les informations de votre bannière publicitaire.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-5 py-4 px-2">
                        {/* Title */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold">Titre *</label>
                            <Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="rounded-2xl h-12 bg-muted/50 border-border/50" placeholder="Titre accrocheur..." />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                className="w-full rounded-2xl p-3 bg-muted/50 border border-border/50 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent"
                                rows={3}
                                placeholder="Description courte et percutante..."
                            />
                        </div>

                        {/* Image */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold">Image</label>
                            <div className="flex items-center gap-4">
                                <div className="w-24 h-16 rounded-xl overflow-hidden bg-muted border border-border/50 flex-shrink-0">
                                    {formData.imageUrl ? (
                                        <img src={formData.imageUrl} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center"><ImageIcon className="h-6 w-6 text-muted-foreground/30" /></div>
                                    )}
                                </div>
                                <Input type="file" accept="image/*" onChange={handleImageUpload} className="rounded-2xl h-12 bg-muted/50 border-border/50 cursor-pointer pt-3" />
                            </div>
                        </div>

                        {/* Button */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold">Texte du bouton</label>
                                <Input value={formData.buttonText} onChange={e => setFormData({ ...formData, buttonText: e.target.value })} className="rounded-2xl h-12 bg-muted/50 border-border/50" placeholder="En savoir plus" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold">URL du bouton</label>
                                <Input value={formData.buttonUrl} onChange={e => setFormData({ ...formData, buttonUrl: e.target.value })} className="rounded-2xl h-12 bg-muted/50 border-border/50" placeholder="https://..." />
                            </div>
                        </div>

                        {/* Format */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold">Format de la publicité *</label>
                            <Select value={formData.format} onValueChange={v => setFormData({ ...formData, format: v as AdFormat })}>
                                <SelectTrigger className="rounded-2xl h-12 bg-muted/50 border-border/50">
                                    <SelectValue placeholder="Choisir un format" />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl border-border/50 backdrop-blur-lg">
                                    {FORMATS.map(f => (
                                        <SelectItem key={f.value} value={f.value} className="rounded-xl">
                                            <span className="font-bold">{f.label}</span> <span className="text-muted-foreground text-xs">({f.size})</span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Pages */}
                        <div className="space-y-3">
                            <label className="text-sm font-bold">Pages d'affichage</label>
                            <div className="flex flex-wrap gap-2">
                                {PAGES.map(page => (
                                    <button
                                        key={page.value}
                                        type="button"
                                        onClick={() => togglePage(page.value)}
                                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${formData.pages.includes(page.value) ? 'bg-accent text-white border-accent' : 'border-border/50 hover:border-accent/50 hover:text-accent'}`}
                                    >
                                        {page.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Active toggle */}
                        <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-2xl">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.isActive ? 'bg-accent' : 'bg-muted'}`}
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.isActive ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                            <span className="text-sm font-bold">{formData.isActive ? "Publicité active" : "Publicité inactive"}</span>
                        </div>
                    </div>

                    <DialogFooter className="sticky bottom-0 bg-background/95 pt-4 border-t border-border/50 pb-2">
                        <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl h-12 px-6 font-bold">Annuler</Button>
                        <Button onClick={handleSave} className="rounded-xl bg-accent hover:bg-accent/90 text-white font-bold h-12 px-8">
                            {editingAd ? "Mettre à jour" : "Créer la Publicité"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};
