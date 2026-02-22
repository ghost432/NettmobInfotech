import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Globe, Monitor, TrendingUp, Users, Eye } from "lucide-react";
import api from "@/lib/api";

interface AnalyticsStats {
    totalViews: number;
    uniqueVisitors: number;
    todayViews: number;
    thisWeekViews: number;
    thisMonthViews: number;
}

interface PageView {
    page_url: string;
    views: number;
    unique_visitors: number;
}

interface GeographicData {
    countries: Array<{ country: string; visits: number; unique_visitors: number }>;
    cities: Array<{ city: string; country: string; visits: number; unique_visitors: number }>;
}

interface DeviceData {
    device: string;
    count: number;
}

interface BrowserData {
    browser: string;
    count: number;
}

export const AdminAnalytics = () => {
    const [stats, setStats] = useState<AnalyticsStats | null>(null);
    const [pageViews, setPageViews] = useState<PageView[]>([]);
    const [geography, setGeography] = useState<GeographicData | null>(null);
    const [devices, setDevices] = useState<DeviceData[]>([]);
    const [browsers, setBrowsers] = useState<BrowserData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            setLoading(true);
            const [statsRes, pagesRes, geoRes, devicesRes, browsersRes] = await Promise.all([
                api.get('/company/admin/analytics/stats'),
                api.get('/company/admin/analytics/pages'),
                api.get('/company/admin/analytics/geography'),
                api.get('/company/admin/analytics/devices'),
                api.get('/company/admin/analytics/browsers')
            ]);

            setStats(statsRes.data);
            setPageViews(pagesRes.data);
            setGeography(geoRes.data);
            setDevices(devicesRes.data);
            setBrowsers(browsersRes.data);
        } catch (error) {
            console.error('Failed to fetch analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total de vues</CardTitle>
                        <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.totalViews?.toLocaleString() || 0}</div>
                        <p className="text-xs text-muted-foreground">Toutes les pages confondues</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Visiteurs uniques</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.uniqueVisitors?.toLocaleString() || 0}</div>
                        <p className="text-xs text-muted-foreground">Visiteurs différents</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Aujourd'hui</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.todayViews?.toLocaleString() || 0}</div>
                        <p className="text-xs text-muted-foreground">Vues du jour</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Cette semaine</CardTitle>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.thisWeekViews?.toLocaleString() || 0}</div>
                        <p className="text-xs text-muted-foreground">Vues hebdomadaires</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ce mois-ci</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.thisMonthViews?.toLocaleString() || 0}</div>
                        <p className="text-xs text-muted-foreground">Vues mensuelles</p>
                    </CardContent>
                </Card>
            </div>

            {/* Page Views */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Pages les plus vues
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {pageViews.slice(0, 10).map((page, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex-1">
                                    <p className="font-medium">{page.page_url}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {page.unique_visitors} visiteurs uniques
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-lg">{page.views}</p>
                                    <p className="text-xs text-muted-foreground">vues</p>
                                </div>
                            </div>
                        ))}
                        {pageViews.length === 0 && (
                            <p className="text-center text-muted-foreground py-8">Aucune donnée disponible</p>
                        )}
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
                {/* Geographic Data */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5" />
                            Pays
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {geography?.countries.slice(0, 10).map((country, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <span className="font-medium">{country.country || 'Inconnu'}</span>
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm text-muted-foreground">
                                            {country.unique_visitors} visiteurs
                                        </span>
                                        <span className="font-bold">{country.visits} vues</span>
                                    </div>
                                </div>
                            ))}
                            {(!geography?.countries || geography.countries.length === 0) && (
                                <p className="text-center text-muted-foreground py-4">Aucune donnée disponible</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Cities */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5" />
                            Villes
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {geography?.cities.slice(0, 10).map((city, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">{city.city || 'Inconnu'}</p>
                                        <p className="text-xs text-muted-foreground">{city.country}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm text-muted-foreground">
                                            {city.unique_visitors} visiteurs
                                        </span>
                                        <span className="font-bold">{city.visits} vues</span>
                                    </div>
                                </div>
                            ))}
                            {(!geography?.cities || geography.cities.length === 0) && (
                                <p className="text-center text-muted-foreground py-4">Aucune donnée disponible</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Devices */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Monitor className="h-5 w-5" />
                            Appareils
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {devices.map((device, index) => {
                                const total = devices.reduce((sum, d) => sum + d.count, 0);
                                const percentage = total > 0 ? ((device.count / total) * 100).toFixed(1) : 0;
                                return (
                                    <div key={index} className="space-y-1">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium">{device.device}</span>
                                            <span className="font-bold">{device.count} ({percentage}%)</span>
                                        </div>
                                        <div className="w-full bg-secondary rounded-full h-2">
                                            <div
                                                className="bg-primary rounded-full h-2"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                            {devices.length === 0 && (
                                <p className="text-center text-muted-foreground py-4">Aucune donnée disponible</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Browsers */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Monitor className="h-5 w-5" />
                            Navigateurs
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {browsers.map((browser, index) => {
                                const total = browsers.reduce((sum, b) => sum + b.count, 0);
                                const percentage = total > 0 ? ((browser.count / total) * 100).toFixed(1) : 0;
                                return (
                                    <div key={index} className="space-y-1">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium">{browser.browser}</span>
                                            <span className="font-bold">{browser.count} ({percentage}%)</span>
                                        </div>
                                        <div className="w-full bg-secondary rounded-full h-2">
                                            <div
                                                className="bg-primary rounded-full h-2"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                            {browsers.length === 0 && (
                                <p className="text-center text-muted-foreground py-4">Aucune donnée disponible</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
