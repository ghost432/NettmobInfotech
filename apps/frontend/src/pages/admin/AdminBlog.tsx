import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Edit2, Trash2, Eye, LayoutGrid, List, CheckCircle, XCircle, Image as ImageIcon, ThumbsUp, ThumbsDown } from "lucide-react";
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
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
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
                category: post.category,
                imageUrl: post.imageUrl || "",
                author: post.author
            });
        } else {
            setEditingPost(null);
            setFormData({
                title: "",
                content: "",
                category: CATEGORIES[0],
                imageUrl: "",
                author: "L'équipe NettmobInfotech"
            });
        }
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
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] border-border/50 bg-background/95 backdrop-blur-xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black">
                            {editingPost ? "Modifier l'article" : "Nouvel Article"}
                        </DialogTitle>
                        <DialogDescription>
                            Remplissez les informations ci-dessous pour {editingPost ? "mettre à jour" : "créer"} votre article de blog.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 py-4 px-2">
                        <div className="space-y-2">
                            <label className="text-sm font-bold">Titre de l'article</label>
                            <Input
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="rounded-2xl h-12 bg-muted/50 border-border/50"
                                placeholder="Titre accrocheur..."
                            />
                        </div>
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
                        <div className="space-y-2 min-h-[400px]">
                            <label className="text-sm font-bold">Contenu de l'article</label>
                            <QuillEditor
                                value={formData.content}
                                onChange={(v) => setFormData({ ...formData, content: v })}
                                modules={modules}
                            />
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
