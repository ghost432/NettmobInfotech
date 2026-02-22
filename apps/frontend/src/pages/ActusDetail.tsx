import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { User, ChevronLeft, Share2, Facebook, Linkedin, Twitter, CheckCircle2, Instagram, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { usePageTitle } from "@/hooks/usePageTitle";
import { toast } from "sonner";
import { SEO } from "@/components/common/SEO";

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

export const ActusDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [feedbackSent, setFeedbackSent] = useState(false);
    usePageTitle(post ? `${post.title} | Actus` : "Actualité | Actus");

    useEffect(() => {
        if (slug) fetchPost();
    }, [slug]);

    const fetchPost = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/blog/slug/${slug}`);
            setPost(response.data);
        } catch (error) {
            console.error("Error fetching article:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFeedback = async (isUseful: boolean) => {
        if (feedbackSent || !post) return;
        try {
            await api.post(`/blog/${post.id}/feedback`, { isUseful });
            setFeedbackSent(true);
            toast.success("Merci pour votre retour !");
            // Refresh counts locally for UX
            if (post) {
                setPost({
                    ...post,
                    usefulCount: isUseful ? post.usefulCount + 1 : post.usefulCount,
                    notUsefulCount: !isUseful ? post.notUsefulCount + 1 : post.notUsefulCount
                });
            }
        } catch (error) {
            console.error("Error sending feedback:", error);
        }
    };

    const articleSchema = post ? {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "image": [post.imageUrl],
        "datePublished": post.createdAt,
        "author": [{
            "@type": "Person",
            "name": post.author,
            "url": "https://nettmobinfotech.fr"
        }],
        "publisher": {
            "@type": "Organization",
            "name": "NettmobInfotech",
            "logo": {
                "@type": "ImageObject",
                "url": "https://nettmobinfotech.fr/Logo.png"
            }
        },
        "description": post.content.substring(0, 160).replace(/<[^>]*>/g, '')
    } : null;

    const shareUrl = window.location.href;

    const socialPlatforms = [
        {
            name: "Facebook",
            icon: <Facebook className="h-4 w-4" />,
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            color: "hover:bg-[#1877F2]"
        },
        {
            name: "LinkedIn",
            icon: <Linkedin className="h-4 w-4" />,
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
            color: "hover:bg-[#0A66C2]"
        },
        {
            name: "Twitter",
            icon: <Twitter className="h-4 w-4" />,
            url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post?.title || "")}`,
            color: "hover:bg-[#1DA1F2]"
        },
        {
            name: "WhatsApp",
            icon: <MessageCircle className="h-4 w-4" />,
            url: `https://wa.me/?text=${encodeURIComponent((post?.title || "") + " " + shareUrl)}`,
            color: "hover:bg-[#25D366]"
        },
        {
            name: "Telegram",
            icon: <Send className="h-4 w-4" />,
            url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post?.title || "")}`,
            color: "hover:bg-[#0088CC]"
        },
        {
            name: "Instagram",
            icon: <Instagram className="h-4 w-4" />,
            url: "#",
            onClick: (e: React.MouseEvent) => {
                e.preventDefault();
                navigator.clipboard.writeText(shareUrl);
                toast.success("Lien copié ! Vous pouvez maintenant le partager sur Instagram.");
            },
            color: "hover:bg-[#E4405F]"
        }
    ];

    if (loading) {
        return (
            <div className="min-h-screen pt-32 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen pt-32 text-center">
                <h2 className="text-2xl font-bold mb-4">Article non trouvé</h2>
                <Link to="/actus">
                    <Button variant="outline" className="rounded-xl">Retour aux Actualités</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <SEO
                title={post.title}
                description={post.content.substring(0, 160).replace(/<[^>]*>/g, '')}
                schemaData={articleSchema || undefined}
                ogType="article"
                ogImage={post.imageUrl}
            />
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <Link to="/actus">
                    <Button variant="ghost" className="mb-8 rounded-xl text-muted-foreground hover:text-accent">
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Retour aux Actualités
                    </Button>
                </Link>

                {/* Article Header */}
                <div className="mb-12">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent mb-6 text-sm font-bold tracking-wider">
                        {post.category}
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight">
                        {post.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-b border-border/50 pb-8">
                        <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-accent" />
                            <span className="font-medium">{post.author}</span>
                        </div>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="relative aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-2xl mb-12 border border-border/50">
                    <img
                        src={post.imageUrl || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Article Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none mb-16 actus-content">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>

                {/* Footer Section (Share + Feedback) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12 border-t border-border/50">
                    {/* Share */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 flex items-center">
                            <Share2 className="h-5 w-5 mr-3 text-accent" />
                            Partager cet article
                        </h4>
                        <div className="flex space-x-3">
                            {socialPlatforms.map((platform) => (
                                <a
                                    key={platform.name}
                                    href={platform.url}
                                    onClick={platform.onClick as any}
                                    target={platform.url === "#" ? undefined : "_blank"}
                                    rel="noopener noreferrer"
                                    className={`p-3 rounded-2xl bg-card border border-border/50 text-muted-foreground transition-all duration-300 ${platform.color} hover:text-white hover:border-transparent hover:scale-110 shadow-sm`}
                                    title={platform.name}
                                >
                                    {platform.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Feedback */}
                    <div className="bg-accent/5 rounded-[2rem] p-8 border border-accent/10">
                        <h4 className="text-lg font-bold mb-6">Cet article vous a été utile ?</h4>
                        {feedbackSent ? (
                            <div className="flex items-center text-green-500 font-bold">
                                <CheckCircle2 className="h-5 w-5 mr-2" />
                                Merci pour votre avis !
                            </div>
                        ) : (
                            <div className="flex space-x-4">
                                <Button
                                    variant="outline"
                                    onClick={() => handleFeedback(true)}
                                    className="rounded-2xl flex-1 py-6 border-border/50 hover:bg-green-500/10 hover:text-green-500 hover:border-green-500/30 transition-all text-lg"
                                >
                                    Oui 😊
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => handleFeedback(false)}
                                    className="rounded-2xl flex-1 py-6 border-border/50 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/30 transition-all text-lg"
                                >
                                    Non ☹️
                                </Button>
                            </div>
                        )}
                        <div className="mt-4 flex space-x-6 text-sm text-muted-foreground opacity-60">
                            <span>{post.usefulCount} ont trouvé ça utile</span>
                            <span>{post.notUsefulCount} n'ont pas trouvé ça utile</span>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .actus-content h2 { font-size: 2rem; font-weight: 800; margin-top: 2.5rem; margin-bottom: 1.5rem; color: hsl(var(--foreground)); }
                .actus-content h3 { font-size: 1.5rem; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem; color: hsl(var(--foreground)); }
                .actus-content p { margin-bottom: 1.5rem; line-height: 1.8; color: hsl(var(--muted-foreground)); }
                .actus-content ul { margin-bottom: 1.5rem; list-style-type: disc; padding-left: 1.5rem; }
                .actus-content li { margin-bottom: 0.5rem; color: hsl(var(--muted-foreground)); }
                .actus-content img { border-radius: 2rem; margin: 2.5rem 0; width: 100%; border: 1px solid hsl(var(--border) / 0.5); }
            `}</style>
        </div>
    );
};
