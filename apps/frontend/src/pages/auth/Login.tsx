import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/store/AuthContext";
import api from "@/lib/api";
import { usePageTitle } from "@/hooks/usePageTitle";
import { Eye, EyeOff } from "lucide-react";

export const Login = () => {
    usePageTitle("Connexion");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data } = await api.post("/auth/login", { email, password });
            login(data.token, data.user);
            navigate("/");
        } catch (err: any) {
            setError(err.response?.data?.message || "Erreur de connexion");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <Card className="w-full max-w-md border-none shadow-premium bg-card">
                <CardContent className="p-8">
                    <div className="text-center mb-8">
                        <Link to="/" className="inline-block mb-6">
                            <img src="/Logo.png" alt="Logo" className="h-12 w-auto mx-auto" />
                        </Link>
                        <h1 className="text-2xl font-bold font-['Outfit']">Connexion Admin</h1>
                        <p className="text-muted-foreground mt-2">Accédez à votre espace de gestion</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && <p className="text-destructive text-sm bg-destructive/10 p-3 rounded-lg">{error}</p>}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <Input
                                type="email"
                                placeholder="votre@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-12 rounded-xl"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Mot de passe</label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="h-12 rounded-xl pr-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>
                        <Button type="submit" className="w-full h-12 rounded-xl text-lg shadow-premium mt-4">
                            Se Connecter
                        </Button>
                    </form>

                    <div className="mt-8 text-center text-sm text-muted-foreground">
                        <p>Pas encore de compte ? <Link to="/register" className="text-primary font-medium hover:underline">S'inscrire</Link></p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
