import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import fr from './locales/fr.json';
import es from './locales/es.json';
import de from './locales/de.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            fr: { translation: fr },
            es: { translation: es },
            de: { translation: de }
        },
        fallbackLng: 'fr',
        supportedLngs: ['fr', 'en', 'es', 'de'],
        detection: {
            order: ['path', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
            lookupFromPathIndex: 0,
            caches: ['cookie', 'localStorage']
        },
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
