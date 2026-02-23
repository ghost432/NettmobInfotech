import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

export const LanguageWatcher = () => {
    const { i18n, t } = useTranslation();
    const location = useLocation();

    useEffect(() => {
        // Sync i18n with URL param
        const pathParts = location.pathname.split('/').filter(Boolean);
        const urlLng = pathParts.length > 0 ? pathParts[0] : '';
        const supportedLngs = ['en', 'fr', 'es', 'de'];

        let targetLng = 'fr'; // default
        if (supportedLngs.includes(urlLng) && urlLng !== 'fr') {
            targetLng = urlLng;
        }

        if (i18n.language !== targetLng) {
            i18n.changeLanguage(targetLng);
        }
    }, [location.pathname, i18n]);

    useEffect(() => {
        // Handle page titles
        const path = location.pathname;
        let titleKey = '';

        const pathParts = path.split('/').filter(Boolean);
        const urlLng = pathParts.length > 0 ? pathParts[0] : '';
        const basePath = ['en', 'es', 'de'].includes(urlLng)
            ? '/' + pathParts.slice(1).join('/')
            : path;

        if (basePath === '/' || basePath === '') {
            titleKey = 'home.title';
        } else if (basePath.startsWith('/a-propos') || basePath.startsWith('/about')) {
            titleKey = 'about.title';
        } else if (basePath.startsWith('/contact')) {
            titleKey = 'contact.title';
        } else if (basePath.startsWith('/expertise')) {
            titleKey = 'expertise.title';
        } else if (basePath.startsWith('/services')) {
            titleKey = 'services_data.marketing.title'; // Default or generic
        }

        if (titleKey) {
            document.title = t(titleKey);
        }
    }, [location.pathname, i18n.language, t]);

    return null;
};
