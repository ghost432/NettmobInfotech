import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { User, ChevronLeft, Share2, Facebook, Linkedin, Twitter, CheckCircle2, Instagram, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { usePageTitle } from "@/hooks/usePageTitle";
import { toast } from "sonner";
import { SEO } from "@/components/common/SEO";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/lib/i18nUtils";

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

export const ActusDetail = () => {
    const { t, i18n } = useTranslation();
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [feedbackSent, setFeedbackSent] = useState(false);

    const getTranslatedField = (p: BlogPost, field: 'title' | 'content') => {
        const lang = i18n.language;
        if (lang === 'en' && p[`${field}_en` as keyof BlogPost]) return p[`${field}_en` as keyof BlogPost] as string;
        if (lang === 'es' && p[`${field}_es` as keyof BlogPost]) return p[`${field}_es` as keyof BlogPost] as string;
        if (lang === 'de' && p[`${field}_de` as keyof BlogPost]) return p[`${field}_de` as keyof BlogPost] as string;
        return p[field] as string;
    };

    const title = post ? getTranslatedField(post, 'title') : t('blog.detail.notFound');
    const content = post ? getTranslatedField(post, 'content') : '';

    usePageTitle(post ? `${title} | ${t('nav.news')}` : `${title} | ${t('nav.news')}`);

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
            toast.success(t('blog.detail.thanks'));
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
        "headline": title,
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
        "description": content.substring(0, 160).replace(/<[^>]*>/g, '')
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
            url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title || "")}`,
            color: "hover:bg-[#1DA1F2]"
        },
        {
            name: "WhatsApp",
            icon: <MessageCircle className="h-4 w-4" />,
            url: `https://wa.me/?text=${encodeURIComponent((title || "") + " " + shareUrl)}`,
            color: "hover:bg-[#25D366]"
        },
        {
            name: "Telegram",
            icon: <Send className="h-4 w-4" />,
            url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title || "")}`,
            color: "hover:bg-[#0088CC]"
        },
        {
            name: "Instagram",
            icon: <Instagram className="h-4 w-4" />,
            url: "#",
            onClick: (e: React.MouseEvent) => {
                e.preventDefault();
                navigator.clipboard.writeText(shareUrl);
                toast.success(t('blog.detail.copyLink'));
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
                <h2 className="text-2xl font-bold mb-4">{t('blog.detail.notFound')}</h2>
                <Link to={getLocalizedPath("/actus")}>
                    <Button variant="outline" className="rounded-xl">{t('blog.detail.back')}</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <SEO
                title={title}
                description={content.substring(0, 160).replace(/<[^>]*>/g, '')}
                schemaData={articleSchema || undefined}
                ogType="article"
                ogImage={post.imageUrl}
            />
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <Link to={getLocalizedPath("/actus")}>
                    <Button variant="ghost" className="mb-8 rounded-xl text-muted-foreground hover:text-accent">
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        {t('blog.detail.back')}
                    </Button>
                </Link>

                {/* Article Header */}
                <div className="mb-12">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent mb-6 text-sm font-bold tracking-wider">
                        {post.category}
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight">
                        {title}
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
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Article Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none mb-16 actus-content">
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>

                {/* Footer Section (Share + Feedback) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12 border-t border-border/50">
                    {/* Share */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 flex items-center">
                            <Share2 className="h-5 w-5 mr-3 text-accent" />
                            {t('blog.detail.share')}
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
                        <h4 className="text-lg font-bold mb-6">{t('blog.detail.useful')}</h4>
                        {feedbackSent ? (
                            <div className="flex items-center text-green-500 font-bold">
                                <CheckCircle2 className="h-5 w-5 mr-2" />
                                {t('blog.detail.thanks')}
                            </div>
                        ) : (
                            <div className="flex space-x-4">
                                <Button
                                    variant="outline"
                                    onClick={() => handleFeedback(true)}
                                    className="rounded-2xl flex-1 py-6 border-border/50 hover:bg-green-500/10 hover:text-green-500 hover:border-green-500/30 transition-all text-lg"
                                >
                                    {t('blog.detail.yes')}
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => handleFeedback(false)}
                                    className="rounded-2xl flex-1 py-6 border-border/50 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/30 transition-all text-lg"
                                >
                                    {t('blog.detail.no')}
                                </Button>
                            </div>
                        )}
                        <div className="mt-4 flex space-x-6 text-sm text-muted-foreground opacity-60">
                            <span>{t('blog.detail.usefulCount', { count: post.usefulCount })}</span>
                            <span>{t('blog.detail.notUsefulCount', { count: post.notUsefulCount })}</span>
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
