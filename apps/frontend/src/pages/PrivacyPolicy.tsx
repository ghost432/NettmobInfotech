import React from "react";
import { Link } from "react-router-dom";
import { Shield, Lock, Eye, FileText, UserCheck, Server, Mail, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { usePageTitle } from "@/hooks/usePageTitle";
import { SEO } from "@/components/common/SEO";

export const PrivacyPolicy = () => {
    usePageTitle("Politique de Confidentialité");

    return (
        <div className="min-h-screen bg-background py-20 px-4">
            <SEO
                title="Politique de Confidentialité | NettmobInfotech"
                description="Politique de confidentialité de NettmobInfotech. Découvrez comment nous protégeons vos données et respectons votre vie privée."
                keywords="confidentialité, vie privée, cookies, données utilisateurs, sécurité, RGPD"
            />
            {/* Hero Section */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="flex items-center justify-center mb-6">
                        <Shield className="h-16 w-16" />
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-center mb-4 font-['Outfit'] text-foreground">
                        Politique de Confidentialité
                    </h1>
                    <p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto">
                        Votre vie privée est importante pour nous
                    </p>
                    <p className="text-sm text-center text-muted-foreground mt-4">
                        Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16">
                <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
                    <Card className="border-none shadow-premium rounded-[2rem] mb-8">
                        <CardContent className="p-8 lg:p-12 space-y-8">
                            {/* Introduction */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-primary font-['Outfit']">Introduction</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    NettmobInfotech, société située au 10 Rue du Colisée, 75008 Paris, France et accorde une grande importance à la protection de vos données personnelles.
                                </p>
                                <p className="text-muted-foreground leading-relaxed mt-4">
                                    Cette politique de confidentialité explique comment nous collectons, utilisons, stockons et protégeons
                                    vos informations personnelles lorsque vous utilisez nos services, notamment via nos formulaires de
                                    demande de devis et de cahier des charges.
                                </p>
                            </div>

                            {/* Données Collectées */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-primary font-['Outfit']">Données Collectées</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    Nous collectons les informations suivantes lorsque vous remplissez nos formulaires :
                                </p>
                                <div className="bg-accent/5 p-6 rounded-xl space-y-3">
                                    <h3 className="font-bold text-primary">Formulaire de Demande de Devis :</h3>
                                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                        <li>Nom et prénom</li>
                                        <li>Adresse email</li>
                                        <li>Numéro de téléphone</li>
                                        <li>Description du projet</li>
                                        <li>Budget estimé</li>
                                    </ul>
                                </div>
                                <div className="bg-accent/5 p-6 rounded-xl space-y-3 mt-4">
                                    <h3 className="font-bold text-primary">Formulaire Cahier des Charges :</h3>
                                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                        <li>Nom de l'entreprise</li>
                                        <li>Nom du contact</li>
                                        <li>Adresse email professionnelle</li>
                                        <li>Numéro de téléphone</li>
                                        <li>Type de projet souhaité</li>
                                        <li>Description détaillée du projet</li>
                                        <li>Budget et délai</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Finalité du Traitement */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-primary font-['Outfit']">Finalité du Traitement</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    Les données personnelles collectées sont utilisées exclusivement pour :
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                    <li>Traiter et répondre à vos demandes de devis et cahiers des charges</li>
                                    <li>Vous contacter concernant votre projet</li>
                                    <li>Établir des propositions commerciales adaptées à vos besoins</li>
                                    <li>Assurer le suivi de la relation client</li>
                                    <li>Améliorer nos services</li>
                                </ul>
                            </div>

                            {/* Base Légale */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-primary font-['Outfit']">Base Légale du Traitement</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Le traitement de vos données personnelles repose sur :
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mt-4">
                                    <li><strong>Votre consentement</strong> : En soumettant nos formulaires, vous consentez au traitement de vos données</li>
                                    <li><strong>L'exécution d'un contrat</strong> : Le traitement est nécessaire à l'exécution de nos prestations</li>
                                    <li><strong>L'intérêt légitime</strong> : Pour améliorer nos services et assurer le suivi client</li>
                                </ul>
                            </div>

                            {/* Conservation des Données */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-primary font-['Outfit']">Conservation des Données</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Vos données personnelles sont conservées pendant une durée de <strong>3 ans</strong> à compter
                                    de notre dernier contact, conformément aux recommandations de la CNIL.
                                </p>
                                <p className="text-muted-foreground leading-relaxed mt-4">
                                    Passé ce délai, vos données sont supprimées de manière sécurisée, sauf obligation légale de conservation.
                                </p>
                            </div>

                            {/* Sécurité */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-primary font-['Outfit']">Sécurité des Données</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées pour protéger
                                    vos données contre tout accès non autorisé, modification, divulgation ou destruction :
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mt-4">
                                    <li>Chiffrement des données sensibles</li>
                                    <li>Accès restreint aux données personnelles</li>
                                    <li>Sauvegardes régulières et sécurisées</li>
                                    <li>Serveurs sécurisés et mise à jour régulière des systèmes</li>
                                </ul>
                            </div>

                            {/* Vos Droits */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-primary font-['Outfit']">Vos Droits</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    Conformément à la loi Informatique et Libertés du 6 janvier 1978 modifiée et au RGPD,
                                    vous disposez des droits suivants :
                                </p>
                                <div className="space-y-3">
                                    <div className="bg-accent/5 p-4 rounded-xl">
                                        <h3 className="font-bold text-primary mb-2">Droit d'accès</h3>
                                        <p className="text-sm text-muted-foreground">Obtenir une copie de vos données personnelles</p>
                                    </div>
                                    <div className="bg-accent/5 p-4 rounded-xl">
                                        <h3 className="font-bold text-primary mb-2">Droit de rectification</h3>
                                        <p className="text-sm text-muted-foreground">Corriger vos données inexactes ou incomplètes</p>
                                    </div>
                                    <div className="bg-accent/5 p-4 rounded-xl">
                                        <h3 className="font-bold text-primary mb-2">Droit à l'effacement</h3>
                                        <p className="text-sm text-muted-foreground">Demander la suppression de vos données</p>
                                    </div>
                                    <div className="bg-accent/5 p-4 rounded-xl">
                                        <h3 className="font-bold text-primary mb-2">Droit d'opposition</h3>
                                        <p className="text-sm text-muted-foreground">Vous opposer au traitement de vos données</p>
                                    </div>
                                    <div className="bg-accent/5 p-4 rounded-xl">
                                        <h3 className="font-bold text-primary mb-2">Droit à la portabilité</h3>
                                        <p className="text-sm text-muted-foreground">Recevoir vos données dans un format structuré</p>
                                    </div>
                                </div>
                            </div>

                            {/* Contact */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-primary font-['Outfit']">Exercer Vos Droits</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    Pour exercer vos droits ou pour toute question relative à la protection de vos données personnelles,
                                    vous pouvez nous contacter :
                                </p>
                                <div className="bg-primary/5 p-6 rounded-xl space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Mail className="h-5 w-5 text-primary" />
                                        <div>
                                            <p className="font-bold text-primary">Par email</p>
                                            <a href="mailto:contact@nettmobinfotech.fr" className="text-accent hover:underline">
                                                contact@nettmobinfotech.fr
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Shield className="h-5 w-5 text-primary" />
                                        <div>
                                            <p className="font-bold text-primary">Par courrier</p>
                                            <p className="text-sm text-muted-foreground">
                                                NettmobInfotech - Protection des Données<br />
                                                10 Rue du Colisée, 75008 Paris, France
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground mt-4">
                                    Vous disposez également du droit d'introduire une réclamation auprès de la CNIL
                                    (Commission Nationale de l'Informatique et des Libertés) si vous estimez que vos droits
                                    ne sont pas respectés : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">www.cnil.fr</a>
                                </p>
                            </div>

                            {/* Cookies */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-primary font-['Outfit']">Cookies</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Notre site utilise des cookies strictement nécessaires au fonctionnement du site et à la sécurité
                                    de votre navigation. Ces cookies ne nécessitent pas votre consentement.
                                </p>
                            </div>

                            {/* Modification */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-primary font-['Outfit']">Modification de la Politique</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment.
                                    Toute modification sera publiée sur cette page avec une date de mise à jour actualisée.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* CTA Section */}
                    <div className="text-center">
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
