import { useEffect } from 'react';

export const usePageTitle = (title?: string) => {
    useEffect(() => {
        if (title) {
            document.title = `${title} - NettmobInfotech`;
        } else {
            // Default for Home Page as requested
            document.title = "NettmobInfotech - Vous pensez, Nous concevons.";
        }
    }, [title]);
};
