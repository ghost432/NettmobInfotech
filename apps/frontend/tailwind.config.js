export default {
    darkMode: "class",
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#0F172A",
                    foreground: "#FFFFFF",
                },
                accent: {
                    DEFAULT: "#3B82F6",
                    foreground: "#FFFFFF",
                },
                background: "#F8FAFC",
                foreground: "#0F172A",
                card: {
                    DEFAULT: "#FFFFFF",
                    foreground: "#0F172A",
                },
                border: "#E2E8F0",
            },
            borderRadius: {
                lg: "12px",
                md: "10px",
                sm: "8px",
            },
            fontFamily: {
                sans: ["Inter", "Outfit", "sans-serif"],
            },
            boxShadow: {
                premium: "0 4px 14px 0 rgba(15, 23, 42, 0.1)",
                card: "0 4px 16px 0 rgba(0, 0, 0, 0.05)",
            },
        },
        animation: {
            marquee: "marquee 25s linear infinite",
            "marquee-vertical": "marquee-vertical 25s linear infinite",
        },
        keyframes: {
            marquee: {
                from: { transform: "translateX(0)" },
                to: { transform: "translateX(-50%)" },
            },
            "marquee-vertical": {
                from: { transform: "translateY(0)" },
                to: { transform: "translateY(-50%)" },
            },
        },
    },
    plugins: [],
}
