export interface ServiceDetail {
    title: string;
    description: string;
    features: string[];
    icon: string;
    image: string;
}

export interface Service {
    slug: string;
    title: string;
    shortDescription: string;
    icon: string;
    image: string;
    details: ServiceDetail;
}

export const servicesData: Service[] = [
    {
        slug: "marketing-digital",
        title: "Marketing Digital",
        shortDescription: "Une gamme complète de services pour atteindre vos objectifs commerciaux en ligne.",
        icon: "Megaphone",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop",
        details: {
            title: "Marketing Digital Stratégique",
            description: "Nettmobinfotech vous accompagne dans l'élaboration et l'exécution d'une stratégie marketing digitale performante, centrée sur le retour sur investissement et la croissance de votre marque.",
            features: [
                "Audit et stratégie digitale sur-mesure",
                "Gestion de campagnes publicitaires (Google Ads, Social Ads)",
                "Email marketing et automation",
                "Analyse de données et rapports de performance"
            ],
            icon: "Megaphone",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop"
        }
    },
    {
        slug: "creation-de-site-web",
        title: "Création de site Web",
        shortDescription: "Sites vitrines et e-commerce haute performance, optimisés pour la conversion.",
        icon: "Globe",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
        details: {
            title: "Conception & Développement Web",
            description: "Nous créons des sites web uniques qui reflètent votre identity de marque tout en offrant une expérience utilisateur exceptionnelle et des performances techniques de premier ordre.",
            features: [
                "Design responsive et moderne",
                "Architecture SEO-friendly",
                "Solutions e-commerce (Shopify, PrestaShop, WooCommerce)",
                "Intégration de fonctionnalités avancées et Chatbots"
            ],
            icon: "Globe",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
        }
    },
    {
        slug: "developpement-applications-mobiles",
        title: "Développement d'applications mobiles",
        shortDescription: "Applications iOS et Android innovantes pour booster votre efficacité et votre visibilité.",
        icon: "Smartphone",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
        details: {
            title: "Applications Mobiles Sur-Mesure",
            description: "Que ce soit pour optimiser vos processus internes ou lancer une idée révolutionnaire, nous développons des applications mobiles robustes et intuitives.",
            features: [
                "Développement natif et cross-platform (React Native)",
                "Design UI/UX centré utilisateur",
                "Publication et gestion sur les stores (App Store, Play Store)",
                "Maintenance et mises à jour évolutives"
            ],
            icon: "Smartphone",
            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop"
        }
    },
    {
        slug: "referencement-seo",
        title: "Référencement (SEO)",
        shortDescription: "Boostez votre visibilité organique et attirez un trafic qualifié durablement.",
        icon: "Search",
        image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=1974&auto=format&fit=crop",
        details: {
            title: "Optimisation pour les Moteurs de Recherche",
            description: "Notre expertise en SEO vous permet de grimper dans les résultats de recherche et de transformer votre présence en ligne en un véritable levier d'acquisition.",
            features: [
                "Audit technique SEO complet",
                "Optimisation sémantique et contenu",
                "Stratégie de Netlinking haute qualité",
                "Suivi de positionnement et analyse concurrentielle"
            ],
            icon: "Search",
            image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=1974&auto=format&fit=crop"
        }
    },
    {
        slug: "creation-de-contenu",
        title: "Création de contenu",
        shortDescription: "Contenus engageants et stratégiques pour captiver votre audience.",
        icon: "PenTool",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop",
        details: {
            title: "Stratégie de Contenu & Storytelling",
            description: "Nous produisons des contenus de haute qualité qui informent, inspirent et convertissent votre audience cible sur tous vos canaux de communication.",
            features: [
                "Rédaction d'articles de blog et livres blancs",
                "Création de visuels et animations",
                "Copywriting pour pages de vente",
                "Stratégie éditoriale pour réseaux sociaux"
            ],
            icon: "PenTool",
            image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop"
        }
    },
    {
        slug: "conception-graphique",
        title: "Conception graphique",
        shortDescription: "Identités visuelles percutantes qui marquent les esprits.",
        icon: "Palette",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1964&auto=format&fit=crop",
        details: {
            title: "Design Graphique & Branding",
            description: "Nous créons des univers visuels forts et cohérents qui permettent à votre marque de se démarquer et de communiquer efficacement ses valeurs.",
            features: [
                "Création de logos et chartes graphiques",
                "Design de supports marketing (brochures, flyers)",
                "Illustrations personnalisées",
                "Créations graphiques pour plateformes sociales"
            ],
            icon: "Palette",
            image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1964&auto=format&fit=crop"
        }
    },
    {
        slug: "solution-ia",
        title: "Solution IA (Applications & Chatbots)",
        shortDescription: "Intégrez la puissance de l'Intelligence Artificielle pour automatiser et innover.",
        icon: "Cpu",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
        details: {
            title: "Intelligence Artificielle & Automatisation",
            description: "Exploitez les dernières avancées en IA pour transformer vos processus, améliorer votre relation client et créer des applications intelligentes de nouvelle génération.",
            features: [
                "Développement de Chatbots IA personnalisés",
                "Automatisation de processus métier par l'IA",
                "Agents conversationnels intelligents",
                "Intégration de modèles LLM dans vos applications existantes"
            ],
            icon: "Cpu",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop"
        }
    }
];
