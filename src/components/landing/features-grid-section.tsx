import GridShape from "@/components/common/GridShape";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { BarChart3, Calculator, Globe, Shield, Users, Zap } from "lucide-react";

const TopWaveDivider = () => (
    <div className="absolute w-full overflow-hidden -top-px left-0">
        <svg
            className="relative block w-full h-16 -mt-1"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                className="fill-white dark:fill-gray-900"
            />
            <rect width="100%" height="2" y="-1" className="fill-primary" />
        </svg>
    </div>
);
//
// const BottomWaveDivider = () => (
//     <div className="absolute bottom-0 left-0 w-full transform translate-y-px">
//         <svg
//             className="relative block w-full h-24"
//             viewBox="0 0 1200 120"
//             preserveAspectRatio="none"
//             xmlns="http://www.w3.org/2000/svg"
//         >
//             <path
//                 d="M0,120c47.79-25.3,103.59-39.8,158-39.8,70.36,0,136.33,21.3,206.8,17.7,42.15-2.2,84.85-15.2,127.2-32.4,50.86-20.6,98.7-48.3,150.6-50.2,55.2-2,108.4,14.8,158.4,32.4,25.4,9,50.8,18.1,75.2,24.8l-1.9,68.5H0Z"
//                 className="fill-white dark:fill-gray-900"
//             />
//         </svg>
//     </div>
// );

const features = [
    {
        icon: Calculator,
        title: "Calculs Intelligents",
        description: "Calculs Erlang avancés pour une allocation optimale des canaux et gestion du trafic.",
    },
    {
        icon: BarChart3,
        title: "Analyses",
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
];
export default function FeaturesGridSection() {
    return (
        <section className="relative pt-24 pb-32 px-6 dark:bg-slate-800/20 bg-gray-100 overflow-hidden -mt-1">
            <TopWaveDivider />

            <div className="relative z-10 container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-600 dark:text-white">
                        Tout ce dont Vous Avez Besoin
                    </h2>
                    <p className="text-xl dark:text-slate-400 text-gray-600">
                        Des outils puissants conçus pour les professionnels des télécoms
                    </p>
                </div>

                <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <GridShape />
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            className="dark:bg-slate-800/30 bg-white dark:border-slate-700/50 border-border hover:dark:bg-slate-800/50 transition-colors shadow-sm hover:shadow-md"
                        >
                            <CardHeader>
                                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                                    <feature.icon className="h-6 w-6 text-blue-500 dark:text-blue-400" />
                                </div>
                                <CardTitle className="dark:text-white text-gray-900">
                                    {feature.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="dark:text-slate-400 text-gray-600">
                                    {feature.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}