import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, ArrowRight, Tag, ThumbsUp, ThumbsDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { usePageTitle } from "@/hooks/usePageTitle";
import { SEO } from "@/components/common/SEO";
import { AdBanner } from "@/components/common/AdBanner";
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

export const Actus = () => {
    const { t, i18n } = useTranslation();
    usePageTitle(t('nav.news'));
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const getTranslatedField = (post: BlogPost, field: 'title' | 'content') => {
        const lang = i18n.language;
        if (lang === 'en' && post[`${field}_en` as keyof BlogPost]) return post[`${field}_en` as keyof BlogPost] as string;
        if (lang === 'es' && post[`${field}_es` as keyof BlogPost]) return post[`${field}_es` as keyof BlogPost] as string;
        if (lang === 'de' && post[`${field}_de` as keyof BlogPost]) return post[`${field}_de` as keyof BlogPost] as string;
        return post[field] as string;
    };

    useEffect(() => {
        fetchPosts();
    }, [currentPage]);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/blog?page=${currentPage}&limit=15`);
            setPosts(response.data.posts);
            setTotalPages(response.data.pagination.totalPages);
        } catch (error) {
            console.error("Error fetching articles:", error);
        } finally {
            setLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    const blogSchema = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Le Blog de NettmobInfotech",
        "description": "Actualités sur l'intelligence artificielle, le développement web et les tendances du marketing digital.",
        "publisher": {
            "@type": "Organization",
            "name": "NettmobInfotech"
        }
    };

    return (
        <div className="min-h-screen bg-background py-24">
            <SEO
                title={t('blog.title')}
                description={t('blog.description')}
                keywords={t('blog.keywords')}
                schemaData={blogSchema}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Ad — Rectangle (après header) */}
                <AdBanner page="actus" format="rectangle" className="mb-6" />

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-6"
                    >
                        <Tag className="h-4 w-4" />
                        <span className="text-sm font-bold uppercase tracking-wider">{t('blog.hero.badge')}</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
                    >
                        {t('blog.hero.title').split('&')[0]} & <span className="text-accent">{t('blog.hero.title').split('&')[1]}</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-muted-foreground text-lg max-w-2xl mx-auto"
                    >
                        {t('blog.hero.subtitle')}
                    </motion.p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="animate-pulse">
                                <div className="bg-muted rounded-3xl aspect-[16/10] mb-4" />
                                <div className="h-4 bg-muted rounded w-1/2 mb-4" />
                                <div className="h-8 bg-muted rounded w-full mb-4" />
                                <div className="h-4 bg-muted rounded w-full mb-4" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
                        >
                            {posts.map((post) => (
                                <motion.div key={post.id} variants={itemVariants}>
                                    <Link to={getLocalizedPath(`/actus/${post.slug}`)}>
                                        <Card className="group h-full overflow-hidden border-border/50 bg-card/30 backdrop-blur-sm hover:border-accent/40 transition-all duration-500 rounded-3xl hover:shadow-2xl hover:shadow-accent/5">
                                            <div className="relative aspect-[16/10] overflow-hidden">
                                                <img
                                                    src={post.imageUrl || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute top-4 left-4">
                                                    <span className="px-4 py-1.5 rounded-full bg-background/80 backdrop-blur-md text-xs font-bold text-accent shadow-lg">
                                                        {post.category}
                                                    </span>
                                                </div>
                                            </div>
                                            <CardContent className="p-8">
                                                <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-4">
                                                    <div className="flex items-center">
                                                        <User className="h-3 w-3 mr-1.5" />
                                                        {post.author}
                                                    </div>
                                                </div>
                                                <h3 className="text-xl font-bold mb-4 line-clamp-2 group-hover:text-accent transition-colors duration-300">
                                                    {getTranslatedField(post, 'title')}
                                                </h3>
                                                <p className="text-muted-foreground text-sm line-clamp-3 mb-6 bg-clip-text">
                                                    {getTranslatedField(post, 'content').replace(/<[^>]*>/g, '').substring(0, 150)}...
                                                </p>
                                                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="flex items-center text-xs text-muted-foreground">
                                                            <ThumbsUp className="h-3.5 w-3.5 mr-1 text-green-500" />
                                                            {post.usefulCount}
                                                        </div>
                                                        <div className="flex items-center text-xs text-muted-foreground">
                                                            <ThumbsDown className="h-3.5 w-3.5 mr-1 text-red-500" />
                                                            {post.notUsefulCount}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center text-accent font-bold text-sm">
                                                        {t('blog.grid.readMore')}
                                                        <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center space-x-4 mt-12">
                                <Button
                                    variant="outline"
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1}
                                    className="rounded-xl border-border hover:bg-accent/5 hover:text-accent"
                                >
                                    {t('blog.pagination.prev')}
                                </Button>
                                <div className="text-sm font-medium">
                                    {t('blog.pagination.pageOf', { current: currentPage, total: totalPages })}
                                </div>
                                <Button
                                    variant="outline"
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                    disabled={currentPage === totalPages}
                                    className="rounded-xl border-border hover:bg-accent/5 hover:text-accent"
                                >
                                    {t('blog.pagination.next')}
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Ad — Square (bas de page) */}
            <AdBanner page="actus" format="square" className="py-6 bg-accent/5" />
        </div>
    );
};
