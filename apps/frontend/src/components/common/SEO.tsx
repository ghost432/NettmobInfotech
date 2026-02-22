import { Helmet } from "react-helmet-async";

interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
    ogImage?: string;
    ogType?: string;
    canonicalUrl?: string;
    schemaData?: object;
}

export const SEO = ({
    title,
    description,
    keywords = "développement web, applications mobiles, marketing digital, solutions informatiques, NettmobInfotech",
    ogImage = "https://nettmobinfotech.fr/Logo.png",
    ogType = "website",
    canonicalUrl,
    schemaData
}: SEOProps) => {
    const siteName = "NettmobInfotech";
    const fullTitle = title.includes(siteName) ? title : `${title} - ${siteName}`;
    const siteUrl = "https://nettmobinfotech.fr";
    const canonical = canonicalUrl || `${siteUrl}${window.location.pathname}`;

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="title" content={fullTitle} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* AI and Bot Specific */}
            <meta name="revisit-after" content="7 days" />
            <meta name="rating" content="General" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={canonical} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:site_name" content={siteName} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={canonical} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={ogImage} />

            {/* Canonical URL */}
            <link rel="canonical" href={canonical} />

            {/* Additional SEO */}
            <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
            <meta name="language" content="French" />
            <meta name="author" content="NettmobInfotech" />
            <meta name="theme-color" content="#030712" />

            {/* Structured Data (JSON-LD) */}
            {schemaData && (
                <script type="application/ld+json">
                    {JSON.stringify(schemaData)}
                </script>
            )}
        </Helmet>
    );
};
