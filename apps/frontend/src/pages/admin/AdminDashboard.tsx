import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MessageSquare, Users, Mail, Phone, Calendar, User as UserIcon, CheckCircle, ChevronLeft, ChevronRight, Plus, ShieldCheck, FileText, Building2, Clock, Euro, BarChart3, Monitor } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePageTitle } from "@/hooks/usePageTitle";
import api from "@/lib/api";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AdminBlog } from "./AdminBlog";
import { AdminAnalytics } from "./AdminAnalytics";
import { AdminAds } from "./AdminAds";
import { AdminMailing } from "./AdminMailing";

interface ContactMessage {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

interface Quotation {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    services: string[];
    budget: string;
    timeline: string;
    details: string;
    isRead: boolean;
    createdAt: string;
}

interface ProjectSpecification {
    id: number;
    companyName: string;
    contactName: string;
    email: string;
    phone: string;
    projectType: string;
    description: string;
    budget: string;
    deadline: string;
    status: 'unread' | 'read' | 'archived';
    createdAt: string;
}

interface UserData {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    createdAt: string;
}

interface PaginationData {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export const AdminDashboard = () => {
    usePageTitle("Administration");
    const location = useLocation();
    const navigate = useNavigate();

    // Determine active tab from URL: /admin/stats -> stats, etc. Default to stats.
    const getActiveTab = () => {
        const path = location.pathname.split("/").pop();
        if (["stats", "messages", "users", "quotations", "specifications", "blog", "analytics", "ads", "mailing"].includes(path || "")) {
            return path as "stats" | "messages" | "users" | "quotations" | "specifications" | "blog" | "analytics" | "ads" | "mailing";
        }
        return "stats";
    };

    const activeMainTab = getActiveTab();

    const setActiveMainTab = (tab: string) => {
        navigate(`/admin/${tab}`);
    };

    // Stats State
    const [stats, setStats] = useState({
        totalMessages: 0,
        unreadMessages: 0,
        unreadQuotes: 0,
        unreadSpecs: 0,
        totalUsers: 0,
        adminCount: 0
    });
    const [statsLoading, setStatsLoading] = useState(true);

    // Messages State
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [pagination, setPagination] = useState<PaginationData | null>(null);
    const [msgLoading, setMsgLoading] = useState(true);
    const [activeMsgTab, setActiveMsgTab] = useState<"recent" | "archive">("recent");
    const [msgPage, setMsgPage] = useState(1);

    // Quotations State
    const [quotations, setQuotations] = useState<Quotation[]>([]);
    const [quotePagination, setQuotePagination] = useState<PaginationData | null>(null);
    const [quoteLoading, setQuoteLoading] = useState(true);
    const [activeQuoteTab, setActiveQuoteTab] = useState<"recent" | "archive">("recent");
    const [quotePage, setQuotePage] = useState(1);

    // Specifications State
    const [specifications, setSpecifications] = useState<ProjectSpecification[]>([]);
    const [specPagination, setSpecPagination] = useState<PaginationData | null>(null);
    const [specLoading, setSpecLoading] = useState(true);
    const [activeSpecTab, setActiveSpecTab] = useState<"recent" | "archive">("recent");
    const [specPage, setSpecPage] = useState(1);

    // Users State
    const [users, setUsers] = useState<UserData[]>([]);
    const [userLoading, setUserLoading] = useState(true);
    const [isAddUserOpen, setIsAddUserOpen] = useState(false);
    const [newUser, setNewUser] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        isAdmin: false
    });

    const fetchStats = async () => {
        setStatsLoading(true);
        try {
            const res = await api.get("/company/admin/stats");
            setStats(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setStatsLoading(false);
        }
    };

    const fetchMessages = async () => {
        setMsgLoading(true);
        try {
            const limit = activeMsgTab === "archive" ? 20 : 10;
            const res = await api.get("/company/admin/messages", {
                params: { type: activeMsgTab, page: msgPage, limit }
            });
            setMessages(res.data.messages);
            setPagination(res.data.pagination);
        } catch (error) {
            console.error(error);
        } finally {
            setMsgLoading(false);
        }
    };

    const fetchQuotations = async () => {
        setQuoteLoading(true);
        try {
            const res = await api.get("/company/admin/quotations", {
                params: { type: activeQuoteTab, page: quotePage }
            });
            setQuotations(res.data.quotations);
            setQuotePagination(res.data.pagination);
        } catch (error) {
            console.error(error);
        } finally {
            setQuoteLoading(false);
        }
    };

    const fetchSpecifications = async () => {
        setSpecLoading(true);
        try {
            const res = await api.get("/company/admin/specifications", {
                params: { type: activeSpecTab, page: specPage }
            });
            setSpecifications(res.data.specifications);
            setSpecPagination(res.data.pagination);
        } catch (error) {
            console.error(error);
        } finally {
            setSpecLoading(false);
        }
    };

    const fetchUsers = async () => {
        setUserLoading(true);
        try {
            const res = await api.get("/auth/admin/users");
            setUsers(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setUserLoading(false);
        }
    };

    useEffect(() => {
        if (activeMainTab === "stats") {
            fetchStats();
        } else if (activeMainTab === "messages") {
            fetchMessages();
        } else if (activeMainTab === "quotations") {
            fetchQuotations();
        } else if (activeMainTab === "specifications") {
            fetchSpecifications();
        } else {
            fetchUsers();
        }
    }, [activeMainTab, activeMsgTab, msgPage, activeQuoteTab, quotePage, activeSpecTab, specPage]);

    const markAsRead = async (id: number) => {
        try {
            await api.patch(`/company/admin/messages/${id}/read`);
            fetchMessages();
            fetchStats(); // Update unread count
        } catch (error) {
            console.error(error);
        }
    };

    const markQuoteAsRead = async (id: number) => {
        try {
            await api.patch(`/company/admin/quotations/${id}/read`);
            fetchQuotations();
            fetchStats(); // Update unread count
        } catch (error) {
            console.error(error);
        }
    };

    const markSpecAsRead = async (id: number) => {
        try {
            await api.patch(`/company/admin/specifications/${id}/status`, { status: 'archived' });
            fetchSpecifications();
            fetchStats(); // Update unread count
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post("/auth/admin/users", newUser);
            setIsAddUserOpen(false);
            setNewUser({ email: "", password: "", firstName: "", lastName: "", isAdmin: false });
            fetchUsers();
            fetchStats(); // Update user count
        } catch (error) {
            console.error(error);
            alert("Erreur lors de la création de l'utilisateur");
        }
    };

    return (
        <div className="py-20 bg-background min-h-screen">
            <div className="container mx-auto px-4 lg:px-8">
                {/* Header Section */}
                <div className="space-y-8 mb-12">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-bold font-['Outfit'] text-primary flex items-center gap-4">
                            Tableau de bord
                        </h1>
                        <p className="text-muted-foreground">Gestion du site NettmobInfotech</p>
                    </div>

                    <div className="bg-card p-1.5 rounded-2xl shadow-sm border border-border/50 overflow-x-auto no-scrollbar">
                        <div className="flex items-center min-w-max">
                            <button
                                onClick={() => setActiveMainTab("stats")}
                                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeMainTab === "stats" ? 'bg-primary text-primary-foreground shadow-premium' : 'hover:bg-accent/5'}`}
                            >
                                <Calendar className="h-4 w-4" /> Statistiques
                            </button>
                            <button
                                onClick={() => setActiveMainTab("messages")}
                                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 relative ${activeMainTab === "messages" ? 'bg-primary text-primary-foreground shadow-premium' : 'hover:bg-accent/5'}`}
                            >
                                <MessageSquare className="h-4 w-4" /> Messages
                                {stats.unreadMessages > 0 && <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] text-white animate-pulse">{stats.unreadMessages}</span>}
                            </button>
                            <button
                                onClick={() => setActiveMainTab("quotations")}
                                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 relative ${activeMainTab === "quotations" ? 'bg-primary text-primary-foreground shadow-premium' : 'hover:bg-accent/5'}`}
                            >
                                <FileText className="h-4 w-4" /> Devis
                                {stats.unreadQuotes > 0 && <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] text-white animate-pulse">{stats.unreadQuotes}</span>}
                            </button>
                            <button
                                onClick={() => setActiveMainTab("specifications")}
                                className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 relative ${activeMainTab === "specifications" ? 'bg-primary text-primary-foreground shadow-premium' : 'hover:bg-accent/5'}`}
                            >
                                <FileText className="h-4 w-4" /> Cahier des Charges
                                {stats.unreadSpecs > 0 && <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] text-white animate-pulse">{stats.unreadSpecs}</span>}
                            </button>
                            <button
                                onClick={() => setActiveMainTab("users")}
                                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeMainTab === "users" ? 'bg-primary text-primary-foreground shadow-premium' : 'hover:bg-accent/5'}`}
                            >
                                <Users className="h-4 w-4" /> Utilisateurs
                            </button>
                            <button
                                onClick={() => setActiveMainTab("blog")}
                                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeMainTab === "blog" ? 'bg-primary text-primary-foreground shadow-premium' : 'hover:bg-accent/5'}`}
                            >
                                <FileText className="h-4 w-4" /> Blog
                            </button>
                            <button
                                onClick={() => setActiveMainTab("analytics")}
                                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeMainTab === "analytics" ? 'bg-primary text-primary-foreground shadow-premium' : 'hover:bg-accent/5'}`}
                            >
                                <BarChart3 className="h-4 w-4" /> Analytics
                            </button>
                            <button
                                onClick={() => setActiveMainTab("ads")}
                                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeMainTab === "ads" ? 'bg-primary text-primary-foreground shadow-premium' : 'hover:bg-accent/5'}`}
                            >
                                <Monitor className="h-4 w-4" /> Publicités
                            </button>
                            <button
                                onClick={() => setActiveMainTab("mailing")}
                                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeMainTab === "mailing" ? 'bg-primary text-primary-foreground shadow-premium' : 'hover:bg-accent/5'}`}
                            >
                                <Mail className="h-4 w-4" /> Mailing
                            </button>
                        </div>
                    </div>
                </div>

                {activeMainTab === "stats" ? (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-2xl font-bold font-['Outfit'] mb-8">Vue d'ensemble</h2>
                        {statsLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[1, 2, 3, 4].map(i => (
                                    <Card key={i} className="border-none shadow-premium bg-card h-32 animate-pulse" />
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <Card className="border-none shadow-premium bg-card overflow-hidden group">
                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground mb-1">Total Messages</p>
                                                <h3 className="text-3xl font-bold">{stats.totalMessages}</h3>
                                            </div>
                                            <div className="p-3 bg-accent/10 rounded-2xl text-accent group-hover:scale-110 transition-transform">
                                                <MessageSquare className="h-6 w-6" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-none shadow-premium bg-card overflow-hidden group border-l-4 border-l-accent">
                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground mb-1">Messages Non Lus</p>
                                                <h3 className="text-3xl font-bold text-accent">{stats.unreadMessages}</h3>
                                            </div>
                                            <div className="p-3 bg-accent/10 rounded-2xl text-accent group-hover:scale-110 transition-transform">
                                                <Mail className="h-6 w-6" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-none shadow-premium bg-card overflow-hidden group border-l-4 border-l-primary">
                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground mb-1">Devis Non Lus</p>
                                                <h3 className="text-3xl font-bold text-primary">{stats.unreadQuotes}</h3>
                                            </div>
                                            <div className="p-3 bg-primary/10 rounded-2xl text-primary group-hover:scale-110 transition-transform">
                                                <FileText className="h-6 w-6" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-none shadow-premium bg-card overflow-hidden group border-l-4 border-l-purple-500">
                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground mb-1">Cahiers des Charges</p>
                                                <h3 className="text-3xl font-bold text-purple-600">{stats.unreadSpecs}</h3>
                                            </div>
                                            <div className="p-3 bg-purple-100 rounded-2xl text-purple-600 group-hover:scale-110 transition-transform">
                                                <FileText className="h-6 w-6" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-none shadow-premium bg-card overflow-hidden group">
                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground mb-1">Utilisateurs</p>
                                                <h3 className="text-3xl font-bold">{stats.totalUsers}</h3>
                                            </div>
                                            <div className="p-3 bg-accent/10 rounded-2xl text-accent group-hover:scale-110 transition-transform">
                                                <Users className="h-6 w-6" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-none shadow-premium bg-card overflow-hidden group">
                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground mb-1">Administrateurs</p>
                                                <h3 className="text-3xl font-bold">{stats.adminCount}</h3>
                                            </div>
                                            <div className="p-3 bg-accent/10 rounded-2xl text-accent group-hover:scale-110 transition-transform">
                                                <ShieldCheck className="h-6 w-6" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
                            <Card className="border-none shadow-premium bg-card p-8">
                                <h3 className="text-xl font-bold mb-4">Actions Rapides</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <Button variant="outline" className="h-20 rounded-2xl flex flex-col gap-2 border-accent/20 hover:bg-accent/5" onClick={() => setActiveMainTab("messages")}>
                                        <MessageSquare className="h-5 w-5 text-accent" />
                                        <span>Voir Messages</span>
                                    </Button>
                                    <Button variant="outline" className="h-20 rounded-2xl flex flex-col gap-2 border-accent/20 hover:bg-accent/5" onClick={() => setActiveMainTab("users")}>
                                        <Users className="h-5 w-5 text-accent" />
                                        <span>Gérer Utilisateurs</span>
                                    </Button>
                                </div>
                            </Card>
                            <Card className="border-none shadow-premium bg-card p-8 flex flex-col items-center justify-center text-center">
                                <div className="p-4 bg-accent/10 rounded-full text-accent mb-4">
                                    <ShieldCheck className="h-10 w-10" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Sécurité Admin</h3>
                                <p className="text-sm text-muted-foreground">Vous êtes connecté en tant qu'administrateur. Tous les changements sont enregistrés.</p>
                            </Card>
                        </div>
                    </div>
                ) : activeMainTab === "specifications" ? (
                    <div className="space-y-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold font-['Outfit']">Cahiers des Charges</h2>
                            <div className="flex bg-card p-1 rounded-2xl shadow-sm border border-border/50">
                                <button
                                    onClick={() => { setActiveSpecTab("recent"); setSpecPage(1); }}
                                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${activeSpecTab === "recent" ? 'bg-accent text-white shadow-premium' : 'hover:bg-accent/5'}`}
                                >
                                    Récent
                                </button>
                                <button
                                    onClick={() => { setActiveSpecTab("archive"); setSpecPage(1); }}
                                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${activeSpecTab === "archive" ? 'bg-accent text-white shadow-premium' : 'hover:bg-accent/5'}`}
                                >
                                    Archive
                                </button>
                            </div>
                        </div>

                        {specLoading ? (
                            <div className="p-20 text-center">Chargement...</div>
                        ) : (
                            <div className="grid grid-cols-1 gap-6">
                                {specifications.length === 0 ? (
                                    <Card className="p-20 text-center border-dashed bg-card/50">
                                        <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-20" />
                                        <p className="text-muted-foreground">Aucun cahier des charges.</p>
                                    </Card>
                                ) : (
                                    <>
                                        {specifications.map((spec) => (
                                            <Card key={spec.id} className={`border-none shadow-premium bg-card overflow-hidden transition-all ${spec.status === 'unread' ? 'ring-2 ring-purple-500/50' : ''}`}>
                                                <CardContent className="p-8">
                                                    <div className="flex flex-col lg:flex-row gap-8">
                                                        <div className="flex-1 space-y-6">
                                                            <div className="flex justify-between items-start">
                                                                <div>
                                                                    <h3 className="text-2xl font-bold flex items-center gap-2">
                                                                        {spec.companyName}
                                                                        {spec.status === 'unread' && <span className="text-[10px] bg-purple-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">Nouveau</span>}
                                                                    </h3>
                                                                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground font-medium">
                                                                        <span className="flex items-center gap-1"><UserIcon className="h-4 w-4" /> {spec.contactName}</span>
                                                                        <span className="flex items-center gap-1"><Mail className="h-4 w-4" /> {spec.email}</span>
                                                                        <span className="flex items-center gap-1"><Phone className="h-4 w-4" /> {spec.phone}</span>
                                                                        <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {format(new Date(spec.createdAt), 'PPp', { locale: fr })}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex gap-2">
                                                                    {spec.status !== 'archived' && (
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                            className="rounded-xl border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
                                                                            onClick={() => markSpecAsRead(spec.id)}
                                                                        >
                                                                            <CheckCircle className="h-4 w-4 mr-2" /> Archiver
                                                                        </Button>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                                <div className="bg-background/50 p-4 rounded-2xl border border-border/30">
                                                                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-1">Type de Projet</p>
                                                                    <span className="font-bold text-primary">{spec.projectType}</span>
                                                                </div>
                                                                <div className="bg-background/50 p-4 rounded-2xl border border-border/30">
                                                                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-1">Budget</p>
                                                                    <span className="flex items-center gap-2 font-bold text-primary"><Euro className="h-4 w-4" /> {spec.budget || "Non défini"}</span>
                                                                </div>
                                                                <div className="bg-background/50 p-4 rounded-2xl border border-border/30">
                                                                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-1">Deadline</p>
                                                                    <span className="flex items-center gap-2 font-bold"><Clock className="h-4 w-4" /> {spec.deadline ? format(new Date(spec.deadline), 'PP', { locale: fr }) : "Non définie"}</span>
                                                                </div>
                                                            </div>

                                                            <div className="bg-accent/5 p-6 rounded-2xl border border-accent/10 whitespace-pre-wrap">
                                                                {spec.description}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                        {specPagination && specPagination.totalPages > 1 && (
                                            <div className="flex justify-center items-center gap-4 mt-8">
                                                <Button variant="outline" size="sm" disabled={specPage === 1} onClick={() => setSpecPage(p => p - 1)} className="rounded-xl">
                                                    <ChevronLeft className="h-4 w-4 mr-2" /> Précédent
                                                </Button>
                                                <span className="text-sm font-medium">Page {specPage} sur {specPagination.totalPages}</span>
                                                <Button variant="outline" size="sm" disabled={specPage === specPagination.totalPages} onClick={() => setSpecPage(p => p + 1)} className="rounded-xl">
                                                    Suivant <ChevronRight className="h-4 w-4 ml-2" />
                                                </Button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                ) : activeMainTab === "quotations" ? (
                    <div className="space-y-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold font-['Outfit']">Demandes de Devis</h2>
                            <div className="flex bg-card p-1 rounded-2xl shadow-sm border border-border/50">
                                <button
                                    onClick={() => { setActiveQuoteTab("recent"); setQuotePage(1); }}
                                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${activeQuoteTab === "recent" ? 'bg-accent text-white shadow-premium' : 'hover:bg-accent/5'}`}
                                >
                                    Récent
                                </button>
                                <button
                                    onClick={() => { setActiveQuoteTab("archive"); setQuotePage(1); }}
                                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${activeQuoteTab === "archive" ? 'bg-accent text-white shadow-premium' : 'hover:bg-accent/5'}`}
                                >
                                    Archive
                                </button>
                            </div>
                        </div>

                        {quoteLoading ? (
                            <div className="p-20 text-center">Chargement...</div>
                        ) : (
                            <div className="grid grid-cols-1 gap-6">
                                {quotations.length === 0 ? (
                                    <Card className="p-20 text-center border-dashed bg-card/50">
                                        <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-20" />
                                        <p className="text-muted-foreground">Aucune demande de devis.</p>
                                    </Card>
                                ) : (
                                    <>
                                        {quotations.map((quote) => (
                                            <Card key={quote.id} className={`border-none shadow-premium bg-card overflow-hidden transition-all ${!quote.isRead ? 'ring-2 ring-primary/50' : ''}`}>
                                                <CardContent className="p-8">
                                                    <div className="flex flex-col lg:flex-row gap-8">
                                                        <div className="flex-1 space-y-6">
                                                            <div className="flex justify-between items-start">
                                                                <div>
                                                                    <h3 className="text-2xl font-bold flex items-center gap-2">
                                                                        {quote.firstName} {quote.lastName}
                                                                        {!quote.isRead && <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded-full uppercase tracking-wider">Nouveau</span>}
                                                                    </h3>
                                                                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground font-medium">
                                                                        <span className="flex items-center gap-1"><Mail className="h-4 w-4" /> {quote.email}</span>
                                                                        <span className="flex items-center gap-1"><Phone className="h-4 w-4" /> {quote.phone}</span>
                                                                        {quote.company && <span className="flex items-center gap-1"><Building2 className="h-4 w-4" /> {quote.company}</span>}
                                                                        <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {format(new Date(quote.createdAt), 'PPp', { locale: fr })}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex gap-2">
                                                                    {!quote.isRead && (
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                            className="rounded-xl border-primary text-primary hover:bg-primary hover:text-white"
                                                                            onClick={() => markQuoteAsRead(quote.id)}
                                                                        >
                                                                            <CheckCircle className="h-4 w-4 mr-2" /> Archiver
                                                                        </Button>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                                <div className="bg-background/50 p-4 rounded-2xl border border-border/30">
                                                                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-1">Services</p>
                                                                    <div className="flex flex-wrap gap-2">
                                                                        {quote.services.map(s => (
                                                                            <span key={s} className="bg-accent/10 text-accent text-[10px] px-2 py-0.5 rounded-md font-bold uppercase">{s}</span>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                                <div className="bg-background/50 p-4 rounded-2xl border border-border/30">
                                                                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-1">Budget</p>
                                                                    <span className="flex items-center gap-2 font-bold text-primary"><Euro className="h-4 w-4" /> {quote.budget}€</span>
                                                                </div>
                                                                <div className="bg-background/50 p-4 rounded-2xl border border-border/30">
                                                                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-1">Timeline</p>
                                                                    <span className="flex items-center gap-2 font-bold"><Clock className="h-4 w-4" /> {quote.timeline}</span>
                                                                </div>
                                                            </div>

                                                            {quote.details && (
                                                                <div className="bg-accent/5 p-6 rounded-2xl border border-accent/10 italic text-muted-foreground">
                                                                    "{quote.details}"
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                        {quotePagination && quotePagination.totalPages > 1 && (
                                            <div className="flex justify-center items-center gap-4 mt-8">
                                                <Button variant="outline" size="sm" disabled={quotePage === 1} onClick={() => setQuotePage(p => p - 1)} className="rounded-xl">
                                                    <ChevronLeft className="h-4 w-4 mr-2" /> Précédent
                                                </Button>
                                                <span className="text-sm font-medium">Page {quotePage} sur {quotePagination.totalPages}</span>
                                                <Button variant="outline" size="sm" disabled={quotePage === quotePagination.totalPages} onClick={() => setQuotePage(p => p + 1)} className="rounded-xl">
                                                    Suivant <ChevronRight className="h-4 w-4 ml-2" />
                                                </Button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                ) : activeMainTab === "messages" ? (
                    <div className="space-y-8">
                        {/* Messages Filter */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold font-['Outfit']">Gestion des Messages</h2>
                            <div className="flex bg-card p-1 rounded-2xl shadow-sm border border-border/50">
                                <button
                                    onClick={() => { setActiveMsgTab("recent"); setMsgPage(1); }}
                                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${activeMsgTab === "recent" ? 'bg-accent text-white shadow-premium' : 'hover:bg-accent/5'}`}
                                >
                                    Récent
                                </button>
                                <button
                                    onClick={() => { setActiveMsgTab("archive"); setMsgPage(1); }}
                                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${activeMsgTab === "archive" ? 'bg-accent text-white shadow-premium' : 'hover:bg-accent/5'}`}
                                >
                                    Archive
                                </button>
                            </div>
                        </div>

                        {msgLoading ? (
                            <div className="p-20 text-center">Chargement...</div>
                        ) : (
                            <div className="grid grid-cols-1 gap-6">
                                {messages.length === 0 ? (
                                    <Card className="p-20 text-center border-dashed bg-card/50">
                                        <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-20" />
                                        <p className="text-muted-foreground">Aucun message dans cette catégorie.</p>
                                    </Card>
                                ) : (
                                    <>
                                        {messages.map((msg) => (
                                            <Card key={msg.id} className={`border-none shadow-premium bg-card overflow-hidden transition-all ${!msg.isRead ? 'ring-2 ring-accent/50' : ''}`}>
                                                <CardContent className="p-0">
                                                    <div className="flex flex-col md:flex-row">
                                                        <div className="p-8 flex-1">
                                                            <div className="flex justify-between items-start mb-4">
                                                                <div>
                                                                    <h3 className="text-xl font-bold flex items-center gap-2">
                                                                        <UserIcon className="h-5 w-5 text-accent" />
                                                                        {msg.firstName} {msg.lastName}
                                                                        {!msg.isRead && <span className="text-[10px] bg-accent text-white px-2 py-0.5 rounded-full uppercase tracking-wider">Nouveau</span>}
                                                                    </h3>
                                                                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                                                                        <span className="flex items-center gap-1"><Mail className="h-4 w-4" /> {msg.email}</span>
                                                                        <span className="flex items-center gap-1"><Phone className="h-4 w-4" /> {msg.phone}</span>
                                                                        <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {format(new Date(msg.createdAt), 'PPp', { locale: fr })}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="bg-background/50 p-6 rounded-2xl border border-border/30">
                                                                <h4 className="font-bold mb-2 text-primary">Sujet: {msg.subject}</h4>
                                                                <p className="text-muted-foreground whitespace-pre-wrap">{msg.message}</p>
                                                            </div>
                                                        </div>
                                                        <div className="p-6 bg-accent/5 flex md:flex-col justify-center gap-2 border-t md:border-t-0 md:border-l border-accent/10">
                                                            {!msg.isRead && (
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className="rounded-xl border-accent text-accent hover:bg-accent hover:text-white shadow-sm"
                                                                    onClick={() => markAsRead(msg.id)}
                                                                >
                                                                    <CheckCircle className="h-4 w-4 mr-2" /> Marquer Lu
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                        {pagination && pagination.totalPages > 1 && (
                                            <div className="flex justify-center items-center gap-4 mt-8">
                                                <Button variant="outline" size="sm" disabled={msgPage === 1} onClick={() => setMsgPage(p => p - 1)} className="rounded-xl">
                                                    <ChevronLeft className="h-4 w-4 mr-2" /> Précédent
                                                </Button>
                                                <span className="text-sm font-medium">Page {msgPage} sur {pagination.totalPages}</span>
                                                <Button variant="outline" size="sm" disabled={msgPage === pagination.totalPages} onClick={() => setMsgPage(p => p + 1)} className="rounded-xl">
                                                    Suivant <ChevronRight className="h-4 w-4 ml-2" />
                                                </Button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                ) : activeMainTab === "blog" ? (
                    <AdminBlog />
                ) : activeMainTab === "analytics" ? (
                    <AdminAnalytics />
                ) : activeMainTab === "ads" ? (
                    <AdminAds />
                ) : activeMainTab === "mailing" ? (
                    <AdminMailing />
                ) : (
                    <div className="space-y-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold font-['Outfit']">Utilisateurs</h2>
                            <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                                <DialogTrigger asChild>
                                    <Button className="rounded-xl shadow-premium">
                                        <Plus className="h-4 w-4 mr-2" /> Ajouter
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="rounded-3xl border-none shadow-premium bg-card">
                                    <DialogHeader>
                                        <DialogTitle className="text-2xl font-bold font-['Outfit']">Nouvel Utilisateur</DialogTitle>
                                        <DialogDescription className="mt-2 text-muted-foreground">
                                            Remplissez le formulaire ci-dessous pour ajouter un nouvel utilisateur.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleAddUser} className="space-y-4 pt-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Prénom</label>
                                                <Input required value={newUser.firstName} onChange={e => setNewUser({ ...newUser, firstName: e.target.value })} className="rounded-xl" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Nom</label>
                                                <Input required value={newUser.lastName} onChange={e => setNewUser({ ...newUser, lastName: e.target.value })} className="rounded-xl" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Email</label>
                                            <Input required type="email" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} className="rounded-xl" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Mot de passe</label>
                                            <Input required type="password" value={newUser.password} onChange={e => setNewUser({ ...newUser, password: e.target.value })} className="rounded-xl" />
                                        </div>
                                        <div className="flex items-center gap-2 pt-2">
                                            <input type="checkbox" id="isAdmin" checked={newUser.isAdmin} onChange={e => setNewUser({ ...newUser, isAdmin: e.target.checked })} className="rounded border-border" />
                                            <label htmlFor="isAdmin" className="text-sm font-medium">Administrateur</label>
                                        </div>
                                        <Button type="submit" className="w-full rounded-xl h-12 mt-4 shadow-premium">Créer</Button>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>
                        {userLoading ? (
                            <div className="p-20 text-center">Chargement...</div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {users.map(user => (
                                    <Card key={user.id} className="border-none shadow-premium bg-card rounded-2xl overflow-hidden group transition-all">
                                        <CardContent className="p-6">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className={`p-3 rounded-2xl ${user.isAdmin ? 'bg-accent/10 text-accent' : 'bg-muted text-muted-foreground'}`}>
                                                    {user.isAdmin ? <ShieldCheck className="h-6 w-6" /> : <UserIcon className="h-6 w-6" />}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-lg">{user.firstName} {user.lastName}</h3>
                                                    <p className="text-sm text-muted-foreground">{user.email}</p>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center pt-4 border-t border-border/50">
                                                <span className="text-xs text-muted-foreground">Inscrit le {format(new Date(user.createdAt), 'dd MMMM yyyy', { locale: fr })}</span>
                                                {user.isAdmin && <span className="text-[10px] bg-accent text-white px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">Admin</span>}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div >
    );
};
