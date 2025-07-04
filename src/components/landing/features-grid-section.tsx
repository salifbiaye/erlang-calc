import GridShape from "@/components/common/GridShape";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import React from "react";
import {BarChart3, Calculator, Globe, Shield, Users, Zap} from "lucide-react";
const features = [
    {
        icon: Calculator,
        title: "Calculs Intelligents",
        description: "Calculs Erlang avancés pour une allocation optimale des canaux et gestion du trafic.",
    },
    {
        icon: BarChart3,
        title: "Analyses ",
        description: "Graphiques interactifs et visualisations pour comprendre les performances de votre réseau.",
    },
    {
        icon: Globe,
        title: "Cartographie des Zones",
        description: "Sélection visuelle des zones avec cartes interactives pour une analyse précise par localisation.",
    },
    {
        icon: Users,
        title: "Collaboration d'Équipe",
        description: "Partagez des simulations, commentez et collaborez avec vos collègues en toute simplicité.",
    },
    {
        icon: Zap,
        title: "Traitement Rapide",
        description: "Calculs ultra-rapides avec résultats instantanés et rapports détaillés.",
    },
    {
        icon: Shield,
        title: "Prêt pour l'Entreprise",
        description: "Sécurisé, évolutif et conçu pour les environnements télécom professionnels.",
    },
]
export  default function FeaturesGridSection() {
    return (
        <section className=" relative py-20 px-6 dark:bg-slate-800/20 bg-gray-100">

            <div className="container mx-auto max-w-6xl z-30">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-600 dark:text-white ">Tout ce dont Vous
                        Avez
                        Besoin</h2>
                    <p className="text-xl dark:text-slate-400 text-gray-600 ">Des outils puissants conçus pour les
                        professionnels
                        des télécoms</p>
                </div>

                <div className="relative  grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <GridShape/>
                    {features.map((feature, index) => (
                        <Card key={index}
                              className="dark:bg-slate-800/30 bg-white  dark:border-slate-700/50 border-border hover:dark:bg-slate-800/50  transition-colors shadow-sm">

                            <CardHeader>
                                <div
                                    className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                                    <feature.icon className="h-6 w-6 text-blue-500 dark:text-blue-400"/>
                                </div>
                                <CardTitle className="dark:text-white text-gray-600">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="dark:text-slate-400 text-gray-600  ">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}