import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Briefcase, AlertTriangle } from 'lucide-react';
import { usePageTitle } from '@/hooks/usePageTitle';
import { SEO } from "@/components/common/SEO";
import { useTranslation } from 'react-i18next';
import { getLocalizedPath } from '@/lib/i18nUtils';

const NotFound: React.FC = () => {
    const { t } = useTranslation();
    usePageTitle(t('notfound.title'));

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
            <SEO
                title={t('notfound.title')}
                description={t('notfound.seoDescription')}
            />
            <div className="bg-primary/5 rounded-full p-8 mb-8 animate-pulse">
                <AlertTriangle className="h-24 w-24 text-primary" />
            </div>

            <h1 className="text-6xl md:text-8xl font-bold text-primary mb-4 font-['Outfit']">{t('notfound.header')}</h1>
            <h2 className="text-2xl md:text-4xl font-semibold mb-6">{t('notfound.subheader')}</h2>

            <p className="text-muted-foreground max-w-md mb-10 text-lg">
                {t('notfound.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Link to={getLocalizedPath("/")}>
                    <Button size="lg" className="rounded-xl px-8 shadow-lg gap-2">
                        <Home className="h-5 w-5" />
                        {t('notfound.backHome')}
                    </Button>
                </Link>
                <Link to={getLocalizedPath("/expertise")}>
                    <Button variant="outline" size="lg" className="rounded-xl px-8 shadow-sm gap-2 bg-background hover:bg-accent/5">
                        <Briefcase className="h-5 w-5" />
                        {t('notfound.ourServices')}
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
