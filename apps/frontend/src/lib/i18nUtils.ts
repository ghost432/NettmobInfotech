import i18n from 'i18next';

export const getLocalizedPath = (path: string) => {
    const lng = i18n.language.split('-')[0];
    if (lng === 'fr') return path;
    return `/${lng}${path === '/' ? '' : path}`;
};
