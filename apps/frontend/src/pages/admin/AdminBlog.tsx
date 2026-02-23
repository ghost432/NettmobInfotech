import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Edit2, Trash2, Eye, List, Image as ImageIcon, ThumbsUp, ThumbsDown, Wand2, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import api from "@/lib/api";
import { toast } from "sonner";
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

// Custom Quill Editor component to avoid react-quill findDOMNode error in React 19
const QuillEditor = ({ value, onChange, modules }: { value: string, onChange: (v: string) => void, modules: any }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<any>(null);

    useEffect(() => {
        if (containerRef.current && !quillRef.current) {
            const quill = new Quill(containerRef.current, {
                theme: 'snow',
                modules: modules
            });
            quillRef.current = quill;

            quill.on('text-change', () => {
                onChange(quill.root.innerHTML);
            });
        }

        if (quillRef.current && quillRef.current.root.innerHTML !== value) {
            // Only update if value is different to avoid cursor jumps
            if (value !== quillRef.current.root.innerHTML) {
                const selection = quillRef.current.getSelection();
                quillRef.current.root.innerHTML = value || '';
                if (selection) quillRef.current.setSelection(selection);
            }
        }
    }, [value]);

    return (
        <div className="rounded-2xl overflow-hidden border border-border/50 bg-muted/20">
            <div ref={containerRef} />
        </div>
    );
};

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    content: string;
    title_en?: string;
    content_en?: string;
    title_es?: string;
    content_es?: string;
    title_de?: string;
    content_de?: string;
    imageUrl: string;
    category: string;
    author: string;
    usefulCount: number;
    notUsefulCount: number;
    createdAt: string;
}

const CATEGORIES = [
    "Marketing Digital",
    "Création de site Web",
    "Développement d'applications mobiles",
    "Référencement (SEO)",
    "Création de contenu",
    "Conception graphique",
    "Solution IA (Applications & Chatbots)"
];

export const AdminBlog = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [isTranslating, setIsTranslating] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        title_en: "",
        content_en: "",
        title_es: "",
        content_es: "",
        title_de: "",
        content_de: "",
        category: CATEGORIES[0],
        imageUrl: "",
        author: "L'équipe NettmobInfotech"
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({ totalPosts: 0, totalPages: 1 });

    useEffect(() => {
        fetchPosts();
    }, [currentPage]);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/blog?page=${currentPage}&limit=15`);
            setPosts(response.data.posts);
            setPagination({
                totalPosts: response.data.pagination.total,
                totalPages: response.data.pagination.totalPages
            });
        } catch (error) {
            toast.error("Erreur lors du chargement des articles");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDialog = (post: BlogPost | null = null) => {
        if (post) {
            setEditingPost(post);
            setFormData({
                title: post.title,
                content: post.content,
                title_en: post.title_en || "",
                content_en: post.content_en || "",
                title_es: post.title_es || "",
                content_es: post.content_es || "",
                title_de: post.title_de || "",
                content_de: post.content_de || "",
                category: post.category,
                imageUrl: post.imageUrl || "",
                author: post.author
            });
        } else {
            setEditingPost(null);
            setFormData({
                title: "",
                content: "",
                title_en: "",
                content_en: "",
                title_es: "",
                content_es: "",
                title_de: "",
                content_de: "",
                category: CATEGORIES[0],
                imageUrl: "",
                author: "L'équipe NettmobInfotech"
            });
        }
        setActiveLang("fr");
        setIsDialogOpen(true);
    };

    const handleSave = async () => {
        if (!formData.title || !formData.content) {
            toast.error("Veuillez remplir le titre et le contenu");
            return;
        }

        try {
            if (editingPost) {
                await api.patch(`/blog/${editingPost.id}`, formData);
                toast.success("Article mis à jour");
            } else {
                await api.post("/blog", formData);
                toast.success("Article créé");
            }
            setIsDialogOpen(false);
            fetchPosts();
        } catch (error) {
            toast.error("Erreur lors de l'enregistrement");
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) return;
        try {
            await api.delete(`/blog/${id}`);
            toast.success("Article supprimé");
            fetchPosts();
        } catch (error) {
            toast.error("Erreur lors de la suppression");
        }
    };

    const handleAutoTranslate = async () => {
        if (!formData.title || !formData.content) {
            toast.error("Veuillez remplir le titre et le contenu en français d'abord");
            return;
        }

        setIsTranslating(true);
        const toastId = toast.loading("Traduction automatique en cours...");

        try {
            const langs = ['en', 'es', 'de'];
            const newFormData = { ...formData };

            for (const lang of langs) {
                const titleRes = await api.post("/blog/translate", { text: formData.title, targetLang: lang });
                if (lang === 'en') newFormData.title_en = titleRes.data.translatedText;
                if (lang === 'es') newFormData.title_es = titleRes.data.translatedText;
                if (lang === 'de') newFormData.title_de = titleRes.data.translatedText;

                const contentRes = await api.post("/blog/translate", { text: formData.content, targetLang: lang });
                if (lang === 'en') newFormData.content_en = contentRes.data.translatedText;
                if (lang === 'es') newFormData.content_es = contentRes.data.translatedText;
                if (lang === 'de') newFormData.content_de = contentRes.data.translatedText;
            }

            setFormData(newFormData);
            toast.success("Traduction terminée !", { id: toastId });
            // Switch to English to show results
            setActiveLang('en');
        } catch (error) {
            console.error("Erreur de traduction:", error);
            toast.error("Erreur lors de la traduction auto.", { id: toastId });
        } finally {
            setIsTranslating(false);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, imageUrl: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const filteredPosts = posts.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [activeLang, setActiveLang] = useState("fr");
    const languages = [
        { code: "fr", name: "Français (Défaut)" },
        { code: "en", name: "English" },
        { code: "es", name: "Español" },
        { code: "de", name: "Deutsch" }
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black">Gestion du Blog <span className="text-accent underline decoration-accent/30 underline-offset-8">Actus</span></h2>
                    <p className="text-muted-foreground mt-2">Gérez vos articles, catégories et retours lecteurs.</p>
                </div>
                <Button
                    onClick={() => handleOpenDialog()}
                    className="rounded-xl bg-accent hover:bg-accent/90 text-white font-bold px-6 shadow-lg shadow-accent/20 h-12"
                >
                    <Plus className="h-5 w-5 mr-2" />
                    Nouvel Article
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="rounded-[2rem] border-border/50 bg-card/30 backdrop-blur-md overflow-hidden">
                    <CardContent className="p-8">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 rounded-2xl bg-accent/10">
                                <List className="h-6 w-6 text-accent" />
                            </div>
                        </div>
                        <div className="text-3xl font-black mb-1">{pagination.totalPosts}</div>
                        <div className="text-muted-foreground text-sm font-medium">Articles au total</div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters & Search */}
            <Card className="rounded-[2rem] border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-6">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Rechercher par titre ou catégorie..."
                            className="pl-12 rounded-2xl bg-background/50 border-border/50 h-12 focus-visible:ring-accent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Post List */}
            <div className="grid grid-cols-1 gap-4">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-accent"></div>
                    </div>
                ) : filteredPosts.length === 0 ? (
                    <div className="text-center py-20 bg-muted/20 rounded-[2rem] border-2 border-dashed border-border/50">
                        <p className="text-muted-foreground">Aucun article trouvé.</p>
                    </div>
                ) : (
                    filteredPosts.map((post) => (
                        <Card key={post.id} className="rounded-3xl border-border/50 bg-card/40 hover:bg-card/60 transition-all duration-300 group overflow-hidden">
                            <CardContent className="p-4 flex flex-col md:flex-row items-center gap-6">
                                <div className="w-full md:w-32 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-muted border border-border/50">
                                    <img
                                        src={post.imageUrl || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"}
                                        alt=""
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="flex-1 min-w-0 text-center md:text-left">
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                                        <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-black uppercase tracking-wider">
                                            {post.category}
                                        </span>
                                        <span className="text-[10px] text-muted-foreground font-medium">
                                            {new Date(post.createdAt).toLocaleDateString('fr-FR')}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-lg truncate group-hover:text-accent transition-colors">
                                        {post.title}
                                    </h3>
                                    <div className="flex items-center justify-center md:justify-start gap-4 mt-2 text-xs text-muted-foreground">
                                        <div className="flex items-center text-green-500">
                                            <ThumbsUp className="h-3 w-3 mr-1" /> {post.usefulCount}
                                        </div>
                                        <div className="flex items-center text-red-400">
                                            <ThumbsDown className="h-3 w-3 mr-1" /> {post.notUsefulCount}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link to={`/actus/${post.slug}`} target="_blank">
                                        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-accent/10 hover:text-accent">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleOpenDialog(post)}
                                        className="rounded-xl hover:bg-blue-500/10 hover:text-blue-500"
                                    >
                                        <Edit2 className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDelete(post.id)}
                                        className="rounded-xl hover:bg-red-500/10 hover:text-red-500"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            {/* Pagination */}
            {!loading && pagination.totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                    <Button
                        variant="ghost"
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="rounded-xl"
                    >
                        Précédent
                    </Button>
                    <span className="text-sm font-bold">Page {currentPage} / {pagination.totalPages}</span>
                    <Button
                        variant="ghost"
                        onClick={() => setCurrentPage(p => Math.min(pagination.totalPages, p + 1))}
                        disabled={currentPage === pagination.totalPages}
                        className="rounded-xl"
                    >
                        Suivant
                    </Button>
                </div>
            )}

            {/* Edit/Create Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto rounded-[2rem] border-border/50 bg-background/95 backdrop-blur-xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black">
                            {editingPost ? "Modifier l'article" : "Nouvel Article"}
                        </DialogTitle>
                        <DialogDescription>
                            Remplissez les informations ci-dessous pour {editingPost ? "mettre à jour" : "créer"} votre article de blog.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 py-4 px-2">
                        {/* Meta Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold">Catégorie</label>
                                <Select
                                    value={formData.category}
                                    onValueChange={(v) => setFormData({ ...formData, category: v })}
                                >
                                    <SelectTrigger className="rounded-2xl h-12 bg-muted/50 border-border/50">
                                        <SelectValue placeholder="Choisir une catégorie" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl border-border/50 backdrop-blur-lg">
                                        {CATEGORIES.map(cat => (
                                            <SelectItem key={cat} value={cat} className="rounded-xl">{cat}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold">Auteur</label>
                                <Input
                                    value={formData.author}
                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                    className="rounded-2xl h-12 bg-muted/50 border-border/50"
                                />
                            </div>
                        </div>
                        <div className="space-y-2 text-center md:text-left">
                            <label className="text-sm font-bold">Image mise en avant</label>
                            <div className="flex flex-col md:flex-row items-center gap-4">
                                <div className="w-full md:w-32 h-24 rounded-2xl overflow-hidden bg-muted border border-border/50 relative">
                                    {formData.imageUrl ? (
                                        <img src={formData.imageUrl} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <ImageIcon className="h-8 w-8 text-muted-foreground/30" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 w-full">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="rounded-2xl h-12 bg-muted/50 border-border/50 cursor-pointer pt-3"
                                    />
                                    <p className="text-[10px] text-muted-foreground mt-1">Format recommandé : 1600x900px, max 5Mo.</p>
                                </div>
                            </div>
                        </div>

                        {/* Translation Tabs */}
                        <div className="border border-border/50 rounded-2xl p-4 bg-card/50">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                                <div className="flex flex-wrap gap-2">
                                    {languages.map(lang => (
                                        <Button
                                            key={lang.code}
                                            type="button"
                                            variant={activeLang === lang.code ? "default" : "outline"}
                                            onClick={() => setActiveLang(lang.code)}
                                            className={`rounded-xl ${activeLang === lang.code ? 'bg-accent text-white shadow-premium' : 'hover:bg-accent/10 border-border/50'}`}
                                        >
                                            {lang.name}
                                        </Button>
                                    ))}
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={handleAutoTranslate}
                                    disabled={isTranslating || !formData.title}
                                    className="rounded-xl border-accent/50 text-accent hover:bg-accent hover:text-white shrink-0 font-bold"
                                >
                                    {isTranslating ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Wand2 className="h-4 w-4 mr-2" />}
                                    Auto-Traduire (FR → EN, ES, DE)
                                </Button>
                            </div>

                            {/* Dynamic Inputs Based on Language */}
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold flex items-center justify-between">
                                        Titre de l'article ({activeLang.toUpperCase()})
                                        {activeLang === 'fr' && <span className="text-xs text-red-500">*Requis</span>}
                                    </label>
                                    <Input
                                        value={activeLang === 'fr' ? formData.title : activeLang === 'en' ? formData.title_en : activeLang === 'es' ? formData.title_es : formData.title_de}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            if (activeLang === 'fr') setFormData({ ...formData, title: val });
                                            if (activeLang === 'en') setFormData({ ...formData, title_en: val });
                                            if (activeLang === 'es') setFormData({ ...formData, title_es: val });
                                            if (activeLang === 'de') setFormData({ ...formData, title_de: val });
                                        }}
                                        className="rounded-2xl h-12 border-border/50 focus-visible:ring-accent"
                                        placeholder={`Titre en ${activeLang.toUpperCase()}...`}
                                    />
                                </div>
                                <div className="space-y-2 min-h-[400px]">
                                    <label className="text-sm font-bold flex items-center justify-between">
                                        Contenu de l'article ({activeLang.toUpperCase()})
                                        {activeLang === 'fr' && <span className="text-xs text-red-500">*Requis</span>}
                                    </label>
                                    <QuillEditor
                                        key={`quill-${activeLang}`} // Force re-render to avoid state collision
                                        value={activeLang === 'fr' ? formData.content : activeLang === 'en' ? formData.content_en : activeLang === 'es' ? formData.content_es : formData.content_de}
                                        onChange={(v) => {
                                            if (activeLang === 'fr') setFormData({ ...formData, content: v });
                                            if (activeLang === 'en') setFormData({ ...formData, content_en: v });
                                            if (activeLang === 'es') setFormData({ ...formData, content_es: v });
                                            if (activeLang === 'de') setFormData({ ...formData, content_de: v });
                                        }}
                                        modules={modules}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="sticky bottom-0 bg-background/95 pt-4 border-t border-border/50 pb-2">
                        <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl h-12 px-6 font-bold">Annuler</Button>
                        <Button onClick={handleSave} className="rounded-xl bg-accent hover:bg-accent/90 text-white font-bold h-12 px-8">
                            {editingPost ? "Mettre à jour" : "Publier l'article"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <style>{`
                .ql-container { border-bottom-left-radius: 1.5rem; border-bottom-right-radius: 1.5rem; border: none !important; font-family: inherit; font-size: 1rem; }
                .ql-toolbar { border-top-left-radius: 1.5rem; border-top-right-radius: 1.5rem; border-color: rgba(0,0,0,0.1) !important; background: rgba(0,0,0,0.02); }
                .dark .ql-toolbar { border-color: rgba(255,255,255,0.1) !important; background: rgba(255,255,255,0.02); }
                .ql-snow.ql-toolbar button:hover, .ql-snow .ql-toolbar button:hover { color: #3b82f6 !important; }
                .ql-snow.ql-toolbar button:hover .ql-stroke, .ql-snow .ql-toolbar button:hover .ql-stroke { stroke: #3b82f6 !important; }
                .ql-editor { min-height: 250px; padding: 1.5rem; }
                .ql-editor.ql-blank::before { color: rgba(156, 163, 175, 0.5); font-style: normal; }
            `}</style>
        </div>
    );
};
