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
        title: "services_data.marketing.title",
        shortDescription: "services_data.marketing.short",
        icon: "Megaphone",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop",
        details: {
            title: "services_data.marketing.detailTitle",
            description: "services_data.marketing.detailDesc",
            features: [
                "services_data.marketing.f1",
                "services_data.marketing.f2",
                "services_data.marketing.f3",
                "services_data.marketing.f4"
            ],
            icon: "Megaphone",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop"
        }
    },
    {
        slug: "creation-de-site-web",
        title: "services_data.web.title",
        shortDescription: "services_data.web.short",
        icon: "Globe",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
        details: {
            title: "services_data.web.detailTitle",
            description: "services_data.web.detailDesc",
            features: [
                "services_data.web.f1",
                "services_data.web.f2",
                "services_data.web.f3",
                "services_data.web.f4"
            ],
            icon: "Globe",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
        }
    },
    {
        slug: "developpement-applications-mobiles",
        title: "services_data.mobile.title",
        shortDescription: "services_data.mobile.short",
        icon: "Smartphone",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
        details: {
            title: "services_data.mobile.detailTitle",
            description: "services_data.mobile.detailDesc",
            features: [
                "services_data.mobile.f1",
                "services_data.mobile.f2",
                "services_data.mobile.f3",
                "services_data.mobile.f4"
            ],
            icon: "Smartphone",
            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop"
        }
    },
    {
        slug: "referencement-seo",
        title: "services_data.seo.title",
        shortDescription: "services_data.seo.short",
        icon: "Search",
        image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=1974&auto=format&fit=crop",
        details: {
            title: "services_data.seo.detailTitle",
            description: "services_data.seo.detailDesc",
            features: [
                "services_data.seo.f1",
                "services_data.seo.f2",
                "services_data.seo.f3",
                "services_data.seo.f4"
            ],
            icon: "Search",
            image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=1974&auto=format&fit=crop"
        }
    },
    {
        slug: "creation-de-contenu",
        title: "services_data.content.title",
        shortDescription: "services_data.content.short",
        icon: "PenTool",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop",
        details: {
            title: "services_data.content.detailTitle",
            description: "services_data.content.detailDesc",
            features: [
                "services_data.content.f1",
                "services_data.content.f2",
                "services_data.content.f3",
                "services_data.content.f4"
            ],
            icon: "PenTool",
            image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop"
        }
    },
    {
        slug: "conception-graphique",
        title: "services_data.graphic.title",
        shortDescription: "services_data.graphic.short",
        icon: "Palette",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1964&auto=format&fit=crop",
        details: {
            title: "services_data.graphic.detailTitle",
            description: "services_data.graphic.detailDesc",
            features: [
                "services_data.graphic.f1",
                "services_data.graphic.f2",
                "services_data.graphic.f3",
                "services_data.graphic.f4"
            ],
            icon: "Palette",
            image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1964&auto=format&fit=crop"
        }
    },
    {
        slug: "solution-ia",
        title: "services_data.ai.title",
        shortDescription: "services_data.ai.short",
        icon: "Cpu",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
        details: {
            title: "services_data.ai.detailTitle",
            description: "services_data.ai.detailDesc",
            features: [
                "services_data.ai.f1",
                "services_data.ai.f2",
                "services_data.ai.f3",
                "services_data.ai.f4"
            ],
            icon: "Cpu",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop"
        }
    }
];
