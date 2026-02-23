import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const usePageTitle = (title?: string) => {
    const { t } = useTranslation();
    useEffect(() => {
        if (title) {
            document.title = `${title} - NettmobInfotech`;
        } else {
            // Default for Home Page as requested
            document.title = t('home.title');
        }
    }, [title, t]);
};
