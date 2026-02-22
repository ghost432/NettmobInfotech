import { useEffect, useState, useRef } from "react";
import {
    Mail, Users, Upload, Send, Plus, Trash2, Search,
    CheckCircle, AlertCircle, FileText, X, Loader2,
    ChevronLeft, ChevronRight, PartyPopper
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import api from "@/lib/api";
import { toast } from "sonner";
import Quill from "quill";
import "quill/dist/quill.snow.css";

// ─── Custom Image Resize Module ──────────────────────────────────
class ImageResize {
    quill: any;
    options: any;
    img: HTMLImageElement | null = null;
    overlay: HTMLDivElement | null = null;
    handle: HTMLDivElement | null = null;
    isResizing = false;
    startWidth = 0;
    startX = 0;

    constructor(quill: any, options: any) {
        this.quill = quill;
        this.options = options;
        this.quill.root.addEventListener('click', this.handleClick.bind(this));
    }

    handleClick(evt: MouseEvent) {
        if (evt.target instanceof HTMLImageElement) {
            this.showOverlay(evt.target);
        } else {
            this.hideOverlay();
        }
    }

    showOverlay(img: HTMLImageElement) {
        this.hideOverlay();
        this.img = img;
        this.overlay = document.createElement('div');
        this.overlay.className = 'quill-image-resize-overlay';
        Object.assign(this.overlay.style, {
            position: 'absolute',
            border: '2px solid #3b82f6',
            pointerEvents: 'none',
            zIndex: '10'
        });

        this.handle = document.createElement('div');
        this.handle.className = 'quill-image-resize-handle';
        Object.assign(this.handle.style, {
            position: 'absolute',
            width: '12px',
            height: '12px',
            backgroundColor: '#3b82f6',
            bottom: '-6px',
            right: '-6px',
            cursor: 'nwse-resize',
            pointerEvents: 'auto',
            borderRadius: '50%'
        });

        this.handle.addEventListener('mousedown', this.startResize.bind(this));
        this.overlay.appendChild(this.handle);
        document.body.appendChild(this.overlay);
        this.repositionOverlay();
    }

    repositionOverlay() {
        if (!this.img || !this.overlay) return;
        const rect = this.img.getBoundingClientRect();
        Object.assign(this.overlay.style, {
            top: `${rect.top + window.scrollY}px`,
            left: `${rect.left + window.scrollX}px`,
            width: `${rect.width}px`,
            height: `${rect.height}px`
        });
    }

    hideOverlay() {
        if (this.overlay) {
            this.overlay.remove();
            this.overlay = null;
            this.handle = null;
        }
        this.img = null;
    }

    startResize(evt: MouseEvent) {
        evt.preventDefault();
        this.isResizing = true;
        this.startWidth = this.img!.clientWidth;
        this.startX = evt.clientX;
        document.addEventListener('mousemove', this.doResize.bind(this));
        document.addEventListener('mouseup', this.stopResize.bind(this));
    }

    doResize(evt: MouseEvent) {
        if (!this.isResizing || !this.img) return;
        const delta = evt.clientX - this.startX;
        const newWidth = Math.max(50, this.startWidth + delta);
        this.img.style.width = `${newWidth}px`;
        this.repositionOverlay();
    }

    stopResize() {
        this.isResizing = false;
        document.removeEventListener('mousemove', this.doResize.bind(this));
        document.removeEventListener('mouseup', this.stopResize.bind(this));
        if (this.img) {
            this.img.setAttribute('width', this.img.style.width);
            this.quill.update('user');
        }
    }
}

Quill.register('modules/imageResize', ImageResize);

interface Contact {
    id: number;
    email: string;
    name: string;
    createdAt: string;
}

// ─── Quill Toolbar Configuration ────────────────────────────────
const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ size: ["small", false, "large", "huge"] }],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["link", "image"],
    ["clean"],
];

export const AdminMailing = () => {
    // ─── Contacts state ───────────────────────────────────────────
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loadingContacts, setLoadingContacts] = useState(true);
    const [contactSearch, setContactSearch] = useState("");
    const [showAddContact, setShowAddContact] = useState(false);
    const [newContactEmail, setNewContactEmail] = useState("");
    const [newContactName, setNewContactName] = useState("");

    // Pagination for contacts
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    // ─── Campaign state ───────────────────────────────────────────
    const [subject, setSubject] = useState("");
    const [htmlBody, setHtmlBody] = useState("");
    const [manualEmails, setManualEmails] = useState("");
    const [selectedContactIds, setSelectedContactIds] = useState<Set<number>>(new Set());
    const [sending, setSending] = useState(false);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [lastSentCount, setLastSentCount] = useState(0);

    // ─── Editor Ref ───────────────────────────────────────────────
    const quillRef = useRef<Quill | null>(null);
    const editorContainerRef = useRef<HTMLDivElement>(null);

    // ─── Import state ─────────────────────────────────────────────
    const [importedEmails, setImportedEmails] = useState<string[]>([]);
    const [importing, setImporting] = useState(false);
    const [importFileName, setImportFileName] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => { fetchContacts(); }, []);

    // ─── Quill Initialization ─────────────────────────────────────
    useEffect(() => {
        if (!editorContainerRef.current || quillRef.current) return;

        const quill = new Quill(editorContainerRef.current, {
            theme: "snow",
            modules: {
                toolbar: TOOLBAR_OPTIONS,
                imageResize: {}
            },
            placeholder: "Écrivez votre message ici... (Redimensionner les images : cliquez dessus. Alignement supporté via la barre d'outils)",
        });

        quill.on("text-change", () => {
            setHtmlBody(quill.root.innerHTML);
        });

        quillRef.current = quill;
    }, []);

    // Update body if external change occurs (e.g. reset)
    useEffect(() => {
        if (quillRef.current && htmlBody === "") {
            if (quillRef.current.root.innerHTML !== "") {
                quillRef.current.root.innerHTML = "";
            }
        }
    }, [htmlBody]);

    const fetchContacts = async () => {
        try {
            setLoadingContacts(true);
            const res = await api.get("/mailing/contacts");
            setContacts(res.data);
        } catch {
            toast.error("Erreur chargement contacts");
        } finally {
            setLoadingContacts(false);
        }
    };

    // ─── Recipients computation ───────────────────────────────────
    const manualList = manualEmails
        .split(",")
        .map(e => e.trim().toLowerCase())
        .filter(e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e));

    const selectedContactEmails = contacts
        .filter(c => selectedContactIds.has(c.id))
        .map(c => c.email);

    const allRecipients = [...new Set([...manualList, ...selectedContactEmails])];

    const toggleContact = (id: number) => {
        setSelectedContactIds(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    const selectAllContacts = () => {
        if (selectedContactIds.size === contacts.length) {
            setSelectedContactIds(new Set());
        } else {
            setSelectedContactIds(new Set(contacts.map(c => c.id)));
        }
    };

    // ─── Send campaign ────────────────────────────────────────────
    const handleSend = async () => {
        if (!subject.trim()) return toast.error("Le sujet est requis");
        if (!htmlBody.trim() || htmlBody === "<p><br></p>") return toast.error("Le contenu est requis");
        if (allRecipients.length === 0) return toast.error("Aucun destinataire sélectionné");
        try {
            setSending(true);
            const res = await api.post("/mailing/send", {
                subject, html: htmlBody, recipients: allRecipients,
            });
            setLastSentCount(res.data.sent);
            setShowSuccessDialog(true);
            setSubject("");
            setHtmlBody("");
            setManualEmails("");
            setSelectedContactIds(new Set());
        } catch (err: any) {
            toast.error(err?.response?.data?.detail || "Erreur lors de l'envoi");
        } finally {
            setSending(false);
        }
    };

    // ─── Import file ──────────────────────────────────────────────
    const handleFileImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImportFileName(file.name);
        setImporting(true);
        try {
            const form = new FormData();
            form.append("file", file);
            const res = await api.post("/mailing/import?save=true", form, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setImportedEmails(res.data.emails);
            toast.success(`${res.data.count} email(s) extraits — ${res.data.inserted} nouveau(x) ajouté(s) aux contacts`);
            fetchContacts();
        } catch (err: any) {
            toast.error(err?.response?.data?.detail || "Erreur lors de l'import");
        } finally {
            setImporting(false);
            e.target.value = "";
        }
    };

    // ─── Add contact ─────────────────────────────────────────────
    const handleAddContact = async () => {
        if (!newContactEmail.trim()) return toast.error("Email requis");
        try {
            await api.post("/mailing/contacts", {
                emails: [newContactEmail],
                name: newContactName,
            });
            toast.success("Contact ajouté");
            setShowAddContact(false);
            setNewContactEmail("");
            setNewContactName("");
            fetchContacts();
        } catch {
            toast.error("Erreur lors de l'ajout");
        }
    };

    const handleDeleteContact = async (id: number) => {
        if (!confirm("Supprimer ce contact ?")) return;
        try {
            await api.delete(`/mailing/contacts/${id}`);
            toast.success("Contact supprimé");
            fetchContacts();
        } catch {
            toast.error("Erreur lors de la suppression");
        }
    };

    const filteredContacts = contacts.filter(c =>
        c.email.includes(contactSearch.toLowerCase()) ||
        c.name.toLowerCase().includes(contactSearch.toLowerCase())
    );

    // Paginated contacts
    const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
    const paginatedContacts = filteredContacts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [contactSearch]);

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-black">Gestion du <span className="text-accent underline decoration-accent/30 underline-offset-8">Mailing</span></h2>
                <p className="text-muted-foreground mt-2">Envoyez des campagnes groupées, importez des listes et gérez vos contacts.</p>
            </div>

            {/* ── SECTION 1 : Campaign ───────────────────────────────────── */}
            <Card className="rounded-[2rem] border-border/50 bg-card/40">
                <CardContent className="p-8 space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2.5 bg-accent/10 rounded-2xl text-accent"><Send className="h-5 w-5" /></div>
                        <div>
                            <h3 className="text-xl font-black">Campagne Email</h3>
                            <p className="text-sm text-muted-foreground">Composez et envoyez votre campagne groupée.</p>
                        </div>
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold">Sujet *</label>
                        <Input
                            value={subject}
                            onChange={e => setSubject(e.target.value)}
                            placeholder="Objet de votre email..."
                            className="rounded-2xl h-12 bg-muted/50 border-border/50"
                        />
                    </div>

                    {/* Rich Text Editor */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold">Contenu du Message *</label>
                        <div className="bg-muted/50 rounded-2xl border border-border/50 overflow-hidden quill-editor-wrapper">
                            <div ref={editorContainerRef} className="min-h-[300px]" />
                        </div>
                        <style dangerouslySetInnerHTML={{
                            __html: `
                            .quill-editor-wrapper .ql-toolbar.ql-snow { border:none !important; border-bottom: 1px solid rgba(255,255,255,0.1) !important; background: rgba(255,255,255,0.05); }
                            .quill-editor-wrapper .ql-container.ql-snow { border:none !important; min-height: 250px; font-size: 14px; font-family: inherit; }
                            .quill-editor-wrapper .ql-editor.ql-blank::before { color: #a1a1aa; font-style: normal; }
                            .quill-editor-wrapper .ql-snow .ql-stroke { stroke: currentColor; }
                            .quill-editor-wrapper .ql-snow .ql-fill { fill: currentColor; }
                            .quill-editor-wrapper .ql-snow .ql-picker { color: currentColor; }
                            .quill-editor-wrapper .ql-snow .ql-picker-options { background-color: #18181b; border: 1px solid rgba(255,255,255,0.1); }
                            .quill-image-resize-overlay { pointer-events: none; border: 2px solid #3b82f6; position: absolute; }
                            .quill-image-resize-handle { pointer-events: auto; width: 12px; height: 12px; background-color: #3b82f6; border-radius: 50%; cursor: nwse-resize; position: absolute; bottom: -6px; right: -6px; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.3); }
                        `}} />
                    </div>

                    {/* Recipients */}
                    <div className="space-y-3">
                        <label className="text-sm font-bold">Destinataires</label>

                        {/* Manual emails */}
                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Saisie manuelle — séparez par des virgules</p>
                            <textarea
                                value={manualEmails}
                                onChange={e => setManualEmails(e.target.value)}
                                rows={2}
                                placeholder="email1@exemple.com, email2@exemple.com, ..."
                                className="w-full rounded-2xl p-3 bg-muted/50 border border-border/50 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent font-mono"
                            />
                        </div>

                        {/* Contacts selector */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <p className="text-xs text-muted-foreground">Depuis vos contacts ({contacts.length})</p>
                                <button
                                    type="button"
                                    onClick={selectAllContacts}
                                    className="text-xs font-bold text-accent hover:underline"
                                >
                                    {selectedContactIds.size === contacts.length ? "Tout désélectionner" : "Tout sélectionner"}
                                </button>
                            </div>
                            {contacts.length > 0 && (
                                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-1">
                                    {contacts.map(c => (
                                        <button
                                            key={c.id}
                                            type="button"
                                            onClick={() => toggleContact(c.id)}
                                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${selectedContactIds.has(c.id) ? 'bg-accent text-white border-accent' : 'border-border/50 hover:border-accent/50 hover:text-accent'}`}
                                        >
                                            {selectedContactIds.has(c.id) && <CheckCircle className="h-3 w-3" />}
                                            {c.name || c.email}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Summary + Send button */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border/50">
                        <div className="flex items-center gap-2">
                            {allRecipients.length > 0 ? (
                                <span className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-500 rounded-xl text-sm font-bold">
                                    <CheckCircle className="h-4 w-4" /> {allRecipients.length} destinataire(s) sélectionné(s)
                                </span>
                            ) : (
                                <span className="flex items-center gap-2 px-4 py-2 bg-muted/50 text-muted-foreground rounded-xl text-sm">
                                    <AlertCircle className="h-4 w-4" /> Aucun destinataire
                                </span>
                            )}
                        </div>
                        <Button
                            onClick={handleSend}
                            disabled={sending || allRecipients.length === 0}
                            className="rounded-xl bg-accent hover:bg-accent/90 text-white font-bold h-12 px-8 shadow-lg shadow-accent/20 transition-all hover:scale-[1.02] active:scale-95"
                        >
                            {sending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
                            {sending ? "Envoi en cours..." : "Lancer le Mailing"}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* ── SECTION 2 : File Import ────────────────────────────────── */}
            <Card className="rounded-[2rem] border-border/50 bg-card/40">
                <CardContent className="p-8 space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2.5 bg-violet-500/10 rounded-2xl text-violet-500"><Upload className="h-5 w-5" /></div>
                        <div>
                            <h3 className="text-xl font-black">Import de Fichier</h3>
                            <p className="text-sm text-muted-foreground">Importez un dossier PDF ou Word pour extraire les emails.</p>
                        </div>
                    </div>

                    <div
                        className="border-2 border-dashed border-border/50 rounded-3xl p-10 text-center cursor-pointer hover:border-accent/50 hover:bg-accent/5 transition-all duration-300"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".docx,.pdf,.doc,.txt"
                            className="hidden"
                            onChange={handleFileImport}
                        />
                        {importing ? (
                            <div className="flex flex-col items-center gap-3">
                                <Loader2 className="h-10 w-10 text-accent animate-spin" />
                                <p className="text-sm font-medium">Analyse de <span className="font-bold text-accent">{importFileName}</span>...</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-3">
                                <FileText className="h-12 w-12 text-muted-foreground/40" />
                                <div>
                                    <p className="font-bold text-base">Glissez ou cliquez pour importer</p>
                                    <p className="text-sm text-muted-foreground mt-1">Formats supportés : .docx, .pdf, .txt — Max 20 Mo</p>
                                </div>
                                <Button variant="outline" className="rounded-xl mt-2 border-accent text-accent hover:bg-accent hover:text-white">
                                    <Upload className="h-4 w-4 mr-2" /> Choisir un fichier
                                </Button>
                            </div>
                        )}
                    </div>

                    {importedEmails.length > 0 && (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-500 rounded-xl text-sm font-bold">
                                    <CheckCircle className="h-4 w-4" /> {importedEmails.length} email(s) extrait(s) et ajoutés aux contacts
                                </span>
                                <button onClick={() => { setImportedEmails([]); setImportFileName(""); }} className="text-muted-foreground hover:text-foreground hover:bg-muted p-1 rounded-full transition-colors">
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 bg-muted/30 rounded-2xl border border-border/20">
                                {importedEmails.map(email => (
                                    <span key={email} className="px-2.5 py-1 bg-background border border-border/50 rounded-lg text-xs font-mono">{email}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* ── SECTION 3 : Contacts ──────────────────────────────────── */}
            <Card className="rounded-[2rem] border-border/50 bg-card/40">
                <CardContent className="p-8 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-emerald-500/10 rounded-2xl text-emerald-500"><Users className="h-5 w-5" /></div>
                            <div>
                                <h3 className="text-xl font-black">Contacts <span className="text-muted-foreground font-medium text-base">({contacts.length})</span></h3>
                                <p className="text-sm text-muted-foreground">Gérez vos listes de contacts.</p>
                            </div>
                        </div>
                        <Button
                            onClick={() => setShowAddContact(true)}
                            className="rounded-xl bg-accent hover:bg-accent/90 text-white font-bold h-10 px-5 shadow-lg shadow-accent/20"
                        >
                            <Plus className="h-4 w-4 mr-2" /> Ajouter un contact
                        </Button>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Rechercher par email ou nom..."
                            value={contactSearch}
                            onChange={e => setContactSearch(e.target.value)}
                            className="pl-12 rounded-2xl bg-muted/50 border-border/50 h-13 text-base"
                        />
                    </div>

                    {/* Contact list with Pagination */}
                    {loadingContacts ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="h-10 w-10 animate-spin text-accent" />
                        </div>
                    ) : filteredContacts.length === 0 ? (
                        <div className="text-center py-20 bg-muted/20 rounded-[2.5rem] border-2 border-dashed border-border/50">
                            <Users className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                            <p className="text-muted-foreground font-medium">Aucun contact trouvé.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-4">
                                {paginatedContacts.map(contact => (
                                    <div
                                        key={contact.id}
                                        className="flex items-center justify-between px-5 py-4 rounded-2xl bg-background/60 border border-border/40 hover:border-accent/40 hover:bg-accent/5 transition-all group lg:min-h-16"
                                    >
                                        <div className="flex items-center gap-4 min-w-0">
                                            <div className="h-10 w-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center font-bold text-sm shrink-0">
                                                {(contact.name || contact.email).charAt(0).toUpperCase()}
                                            </div>
                                            <div className="min-w-0">
                                                {contact.name && <p className="font-bold text-sm truncate pr-2">{contact.name}</p>}
                                                <p className={`text-xs truncate font-mono ${contact.name ? 'text-muted-foreground' : 'font-bold text-sm'}`}>{contact.email}</p>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDeleteContact(contact.id)}
                                            className="rounded-xl hover:bg-red-500/10 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all text-muted-foreground shrink-0"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-between pt-6 border-t border-border/50">
                                    <p className="text-sm text-muted-foreground font-medium">
                                        Affichage de <span className="font-bold text-foreground">{(currentPage - 1) * itemsPerPage + 1}</span> à <span className="font-bold text-foreground">{Math.min(currentPage * itemsPerPage, filteredContacts.length)}</span> sur <span className="font-bold text-foreground">{filteredContacts.length}</span>
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            disabled={currentPage === 1}
                                            onClick={() => setCurrentPage(p => p - 1)}
                                            className="rounded-xl h-9 w-9 border-border/50 hover:bg-accent hover:text-white transition-colors"
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </Button>
                                        <div className="flex items-center gap-1 mx-2">
                                            {[...Array(totalPages)].map((_, i) => {
                                                const pageNum = i + 1;
                                                // Minimal logic for jumping pages if too many
                                                if (totalPages > 5 && (pageNum > 3 && pageNum < totalPages - 1 && Math.abs(pageNum - currentPage) > 1)) {
                                                    if (pageNum === 4 && currentPage > 4) return <span key="dots1" className="px-2">...</span>;
                                                    if (pageNum === totalPages - 1 && currentPage < totalPages - 3) return <span key="dots2" className="px-2">...</span>;
                                                    return null;
                                                }
                                                return (
                                                    <Button
                                                        key={pageNum}
                                                        variant={currentPage === pageNum ? "default" : "outline"}
                                                        onClick={() => setCurrentPage(pageNum)}
                                                        className={`h-9 w-9 rounded-xl text-xs font-bold transition-all ${currentPage === pageNum ? 'bg-accent shadow-lg shadow-accent/20 ring-2 ring-accent/20' : 'border-border/50 hover:border-accent/40'}`}
                                                    >
                                                        {pageNum}
                                                    </Button>
                                                );
                                            })}
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            disabled={currentPage === totalPages}
                                            onClick={() => setCurrentPage(p => p + 1)}
                                            className="rounded-xl h-9 w-9 border-border/50 hover:bg-accent hover:text-white transition-colors"
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* ── DIALOGS ────────────────────────────────────────────── */}

            {/* Add Contact Dialog */}
            <Dialog open={showAddContact} onOpenChange={setShowAddContact}>
                <DialogContent className="max-w-md rounded-[2.5rem] border-border/50 bg-background/95 backdrop-blur-2xl shadow-2xl p-8">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black">Nouveau Contact</DialogTitle>
                        <DialogDescription className="text-muted-foreground">Ajoutez un nouvel email à votre liste de diffusion.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-5 py-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold ml-1">Adresse Email *</label>
                            <Input
                                value={newContactEmail}
                                onChange={e => setNewContactEmail(e.target.value)}
                                placeholder="nom@exemple.com"
                                className="rounded-2xl h-13 bg-muted/40 border-border/50 focus:bg-muted/60 transition-colors"
                                onKeyDown={e => e.key === "Enter" && handleAddContact()}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold ml-1">Nom Complet <span className="text-muted-foreground font-normal">(facultatif)</span></label>
                            <Input
                                value={newContactName}
                                onChange={e => setNewContactName(e.target.value)}
                                placeholder="Jean Dupont"
                                className="rounded-2xl h-13 bg-muted/40 border-border/50 focus:bg-muted/60 transition-colors"
                                onKeyDown={e => e.key === "Enter" && handleAddContact()}
                            />
                        </div>
                    </div>
                    <DialogFooter className="sm:justify-between gap-3 pt-4">
                        <Button variant="ghost" onClick={() => setShowAddContact(false)} className="rounded-2xl h-12 font-bold px-6">Annuler</Button>
                        <Button onClick={handleAddContact} className="rounded-2xl bg-accent hover:bg-accent/90 text-white font-bold h-12 px-8 shadow-lg shadow-accent/20">
                            <Plus className="h-4 w-4 mr-2" /> Créer le contact
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Success Success Dialog */}
            <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
                <DialogContent className="max-w-md rounded-[2.5rem] border-none bg-background/95 backdrop-blur-3xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] p-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent pointer-events-none" />
                    <div className="p-10 flex flex-col items-center text-center relative z-10">
                        <div className="w-24 h-24 rounded-[2rem] bg-accent/20 text-accent flex items-center justify-center mb-8 animate-bounce duration-1000">
                            <PartyPopper className="h-12 w-12" />
                        </div>
                        <DialogHeader>
                            <DialogTitle className="text-3xl font-black mb-2 text-foreground">Mailing envoyé !</DialogTitle>
                            <DialogDescription className="text-lg text-muted-foreground font-medium leading-relaxed">
                                Votre campagne a été propulsée avec succès à <span className="text-accent font-black">{lastSentCount}</span> destinataires.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="mt-10 w-full">
                            <Button
                                onClick={() => setShowSuccessDialog(false)}
                                className="w-full rounded-2xl h-14 bg-accent hover:bg-accent/90 text-white text-lg font-black shadow-xl shadow-accent/30 transition-all hover:scale-[1.03] active:scale-95"
                            >
                                Super !
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

