import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const useAnalytics = () => {
    const location = useLocation();

    useEffect(() => {
        // Don't track admin pages
        if (location.pathname.startsWith('/admin') || location.pathname.startsWith('/login') || location.pathname.startsWith('/register')) {
            return;
        }

        const trackPageView = async () => {
            try {
                await axios.post(`${API_URL}/company/analytics`, {
                    pageUrl: location.pathname + location.search,
                    referrer: document.referrer
                });
            } catch (error) {
                // Silent fail - analytics should not affect user experience
                console.debug('Analytics tracking failed:', error);
            }
        };

        // Track after a small delay to batch rapid navigation
        const timer = setTimeout(trackPageView, 1000);

        return () => clearTimeout(timer);
    }, [location]);
};
