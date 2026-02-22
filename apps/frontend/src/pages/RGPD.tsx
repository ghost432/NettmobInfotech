import React from "react";
import { Link } from "react-router-dom";
import { Lock, Shield, Eye, FileText, UserCheck, Mail, AlertCircle, Database, Globe, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { usePageTitle } from "@/hooks/usePageTitle";
import { SEO } from "@/components/common/SEO";

export const RGPD = () => {
    usePageTitle("RGPD & Protection des Données");

    return (
        <div className="min-h-screen bg-background py-20 px-4">
            <SEO
                title="RGPD - Protection des Données Personnelles | NettmobInfotech"
                description="Notre politique RGPD et protection des données personnelles. Transparence totale sur le traitement de vos informations."
                keywords="RGPD, protection données, vie privée, conformité, données personnelles, sécurité"
            />
            {/* Hero Section */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="flex items-center justify-center mb-6">
                        <Lock className="h-16 w-16" />
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-center mb-4 font-['Outfit'] text-foreground">
                        RGPD & Protection des Données
                    </h1>
                    <p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto">
                        Notre engagement pour la protection de vos données personnelles
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16">
                <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
                    <Card className="border-none shadow-premium rounded-[2rem] mb-8">
                        <CardContent className="p-8 lg:p-12 space-y-8">
                            {/* Introduction RGPD */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-primary font-['Outfit']">Qu'est-ce que le RGPD ?</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Le Règlement Général sur la Protection des Données (RGPD) est un règlement européen entré en vigueur
                                    le 25 mai 2018. Il vise à renforcer et unifier la protection des données personnelles des citoyens
                                    de l'Union européenne.
                                </p>
                                <p className="text-muted-foreground leading-relaxed mt-4">
                                    En France, le RGPD complète la loi Informatique et Libertés de 1978 modifiée, et est appliqué sous
                                    le contrôle de la CNIL (Commission Nationale de l'Informatique et des Libertés).
                                </p>
                            </div>

                            {/* Responsable du Traitement */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-primary font-['Outfit']">Responsable du Traitement</h2>
                                <div className="bg-primary/5 p-6 rounded-xl space-y-2">
                                    <p className="font-bold text-primary">NettmobInfotech</p>
                                    <p className="text-muted-foreground">10 Rue du Colisée, 75008 Paris, France</p>
                                    <p className="text-muted-foreground">Email : contact@nettmobinfotech.fr</p>
                                    <p className="text-muted-foreground">Téléphone : +33 7 66 39 09 92</p>
                                </div>
                            </div>

                            {/* Vos Droits en Détail */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-primary font-['Outfit']">Vos Droits RGPD en Détail</h2>
                                <p className="text-muted-foreground leading-relaxed mb-6">
                                    Le RGPD vous confère des droits renforcés sur vos données personnelles :
                                </p>

                                <div className="space-y-4">
                                    <Card className="border border-accent/20">
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4">
                                                <Eye className="h-6 w-6 text-accent mt-1" />
                                                <div>
                                                    <h3 className="font-bold text-primary mb-2">Droit d'Accès (Art. 15 RGPD)</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        Vous avez le droit d'obtenir la confirmation que vos données sont traitées et d'accéder
                                                        à ces données. Nous vous fournirons une copie gratuite de vos données personnelles.
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="border border-accent/20">
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4">
                                                <FileText className="h-6 w-6 text-accent mt-1" />
                                                <div>
                                                    <h3 className="font-bold text-primary mb-2">Droit de Rectification (Art. 16 RGPD)</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        Vous pouvez demander la correction de données inexactes ou incomplètes vous concernant.
                                                        Nous procéderons à la rectification dans les meilleurs délais.
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="border border-accent/20">
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4">
                                                <Shield className="h-6 w-6 text-accent mt-1" />
                                                <div>
                                                    <h3 className="font-bold text-primary mb-2">Droit à l'Effacement / "Droit à l'Oubli" (Art. 17 RGPD)</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        Vous pouvez demander l'effacement de vos données dans certains cas : retrait du consentement,
                                                        données non nécessaires, opposition légitime, traitement illicite.
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="border border-accent/20">
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4">
                                                <Lock className="h-6 w-6 text-accent mt-1" />
                                                <div>
                                                    <h3 className="font-bold text-primary mb-2">Droit à la Limitation du Traitement (Art. 18 RGPD)</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        Vous pouvez demander la limitation du traitement de vos données dans certaines circonstances,
                                                        notamment lors d'une contestation de l'exactitude des données.
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="border border-accent/20">
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4">
                                                <UserCheck className="h-6 w-6 text-accent mt-1" />
                                                <div>
                                                    <h3 className="font-bold text-primary mb-2">Droit à la Portabilité (Art. 20 RGPD)</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        Vous pouvez recevoir vos données dans un format structuré, couramment utilisé et lisible par machine,
                                                        et les transmettre à un autre responsable du traitement.
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="border border-accent/20">
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4">
                                                <Shield className="h-6 w-6 text-accent mt-1" />
                                                <div>
                                                    <h3 className="font-bold text-primary mb-2">Droit d'Opposition (Art. 21 RGPD)</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        Vous pouvez vous opposer à tout moment au traitement de vos données pour des raisons tenant
                                                        à votre situation particulière, notamment en cas de prospection commerciale.
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>

                            {/* Base Légale */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-primary font-['Outfit']">Bases Légales du Traitement</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    Conformément à l'article 6 du RGPD, nous traitons vos données sur les bases légales suivantes :
                                </p>
                                <div className="space-y-3">
                                    <div className="bg-accent/5 p-4 rounded-xl">
                                        <h3 className="font-bold text-primary mb-2">Consentement (Art. 6.1.a)</h3>
                                        <p className="text-sm text-muted-foreground">
                                            En soumettant nos formulaires, vous consentez expressément au traitement de vos données
                                        </p>
                                    </div>
                                    <div className="bg-accent/5 p-4 rounded-xl">
                                        <h3 className="font-bold text-primary mb-2">Exécution d'un Contrat (Art. 6.1.b)</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Le traitement est nécessaire à l'exécution de nos prestations de services
                                        </p>
                                    </div>
                                    <div className="bg-accent/5 p-4 rounded-xl">
                                        <h3 className="font-bold text-primary mb-2">Intérêt Légitime (Art. 6.1.f)</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Amélioration de nos services et suivi de la relation client
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Durée de Conservation */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-primary font-['Outfit']">Durée de Conservation des Données</h2>
                                <div className="bg-primary/5 p-6 rounded-xl">
                                    <p className="text-muted-foreground leading-relaxed mb-4">
                                        Conformément au principe de minimisation et de limitation de la conservation (Art. 5 RGPD),
                                        vos données sont conservées :
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                        <li><strong>Prospects (devis, cahier des charges)</strong> : 3 ans après le dernier contact</li>
                                        <li><strong>Clients</strong> : Durée de la relation contractuelle + 5 ans (obligations comptables)</li>
                                        <li><strong>Données de connexion</strong> : 12 mois (obligations légales)</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Sécurité */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-primary font-['Outfit']">Mesures de Sécurité</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    Conformément à l'article 32 du RGPD, nous mettons en œuvre les mesures techniques et organisationnelles
                                    appropriées pour garantir un niveau de sécurité adapté au risque :
                                </p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-accent/5 p-4 rounded-xl">
                                        <h3 className="font-bold text-primary mb-2 text-sm">Chiffrement des Données</h3>
                                        <p className="text-xs text-muted-foreground">
                                            Chiffrement SSL/TLS pour les transmissions, chiffrement au repos pour les données sensibles
                                        </p>
                                    </div>
                                    <div className="bg-accent/5 p-4 rounded-xl">
                                        <h3 className="font-bold text-primary mb-2 text-sm">Contrôle d'Accès</h3>
                                        <p className="text-xs text-muted-foreground">
                                            Accès limité aux seules personnes habilitées, authentification forte
                                        </p>
                                    </div>
                                    <div className="bg-accent/5 p-4 rounded-xl">
                                        <h3 className="font-bold text-primary mb-2 text-sm">Sauvegardes Sécurisées</h3>
                                        <p className="text-xs text-muted-foreground">
                                            Sauvegardes régulières, chiffrées et stockées de manière sécurisée
                                        </p>
                                    </div>
                                    <div className="bg-accent/5 p-4 rounded-xl">
                                        <h3 className="font-bold text-primary mb-2 text-sm">Surveillance Continue</h3>
                                        <p className="text-xs text-muted-foreground">
                                            Détection et réponse aux incidents de sécurité, mises à jour régulières
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Transferts de Données */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-primary font-['Outfit']">Transferts de Données</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Vos données personnelles sont hébergées en France et ne font l'objet d'aucun transfert en dehors
                                    de l'Union européenne. En cas de transfert futur, nous nous assurerons que celui-ci est encadré
                                    conformément au Chapitre V du RGPD (clauses contractuelles types, décision d'adéquation, etc.).
                                </p>
                            </div>

                            {/* Violation de Données */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-primary font-['Outfit']">Violation de Données</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Conformément à l'article 33 du RGPD, en cas de violation de données personnelles susceptible
                                    d'engendrer un risque élevé pour vos droits et libertés, nous vous en informerons dans les
                                    meilleurs délais et notifierons la CNIL dans les 72 heures.
                                </p>
                            </div>

                            {/* Exercer Vos Droits */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-primary font-['Outfit']">Comment Exercer Vos Droits ?</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    Pour exercer l'un de vos droits, vous pouvez nous contacter par :
                                </p>
                                <div className="bg-accent/5 p-6 rounded-xl space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Mail className="h-5 w-5 text-accent mt-1" />
                                        <div>
                                            <p className="font-bold text-primary">Email</p>
                                            <a href="mailto:contact@nettmobinfotech.fr" className="text-accent hover:underline">
                                                contact@nettmobinfotech.fr
                                            </a>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Objet : "Exercice de mes droits RGPD"
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <FileText className="h-5 w-5 text-accent mt-1" />
                                        <div>
                                            <p className="font-bold text-primary">Courrier postal</p>
                                            <p className="text-sm text-muted-foreground">
                                                NettmobInfotech - Service Protection des Données<br />
                                                10 Rue du Colisée<br />
                                                75008 Paris, France
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground mt-4">
                                    <strong>Délai de réponse</strong> : Nous nous engageons à répondre à votre demande dans un délai d'un mois
                                    à compter de sa réception. Ce délai peut être prolongé de deux mois en cas de complexité ou de nombre
                                    important de demandes.
                                </p>
                                <p className="text-sm text-muted-foreground mt-4">
                                    <strong>Pièces justificatives</strong> : Pour des raisons de sécurité, nous pourrons vous demander de justifier
                                    de votre identité en nous fournissant une copie d'un document d'identité.
                                </p>
                            </div>

                            {/* Réclamation */}
                            <div className="bg-primary/5 p-6 rounded-xl">
                                <h2 className="text-xl font-bold mb-3 text-primary font-['Outfit']">Droit de Réclamation auprès de la CNIL</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Si vous estimez que vos droits ne sont pas respectés, vous avez le droit d'introduire une réclamation
                                    auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) :
                                </p>
                                <div className="mt-4 space-y-2">
                                    <p className="text-sm font-bold text-primary">CNIL</p>
                                    <p className="text-sm text-muted-foreground">3 Place de Fontenoy - TSA 80715</p>
                                    <p className="text-sm text-muted-foreground">75334 PARIS CEDEX 07</p>
                                    <p className="text-sm text-muted-foreground">
                                        Téléphone : 01 53 73 22 22
                                    </p>
                                    <p className="text-sm">
                                        <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                                            www.cnil.fr
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* CTA Section */}
                    <div className="text-center space-y-4">
                        <Link
                            to="/politique-confidentialite"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl font-bold mr-4"
                        >
                            Politique de Confidentialité
                        </Link>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-full hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl font-bold"
                        >
                            Contactez-nous
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};
