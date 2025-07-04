import {CheckCircle} from "lucide-react";
import {Card} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import React from "react";

const benefits = [
    "Réduisez le temps de planification réseau de 70%",
    "Optimisez l'efficacité d'allocation des canaux",
    "Minimisez les taux de blocage et améliorez la QoS",
    "Générez des rapports professionnels instantanément",
    "Collaborez avec vos équipes ",
]
export default function BenefitsSection() {
    return (
        <section className="py-20 px-6">
            <div className="container mx-auto max-w-4xl">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-white text-slate-800">Pourquoi
                            Choisir
                            Erlang Calc ?</h2>
                        <p className="text-lg dark:text-slate-400 text-slate-600 mb-8">
                            Conçu par des ingénieurs télécom pour des ingénieurs télécom. Notre plateforme combine
                            l&apos;expertise
                            industrielle avec la technologie moderne pour des résultats fiables.
                        </p>

                        <div className="space-y-4">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 flex-shrink-0"/>
                                    <span className="dark:text-slate-300 text-slate-700">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <Card
                            className="dark:bg-slate-800/30 bg-white dark:border-slate-700/50 border-slate-200 p-6 shadow-sm">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="dark:text-slate-400 text-slate-600">Analyse Manhattan</span>
                                    <Badge
                                        className="bg-green-500/10 dark:text-green-400 text-green-600 border-green-500/20">Terminé</Badge>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="dark:text-white text-slate-800">Canaux Requis</span>
                                        <span className="dark:text-white text-slate-800 font-bold">45</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="dark:text-white text-slate-800">Taux de Blocage</span>
                                        <span className="text-green-500 dark:text-green-400 font-bold">1,8%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="dark:text-white text-slate-800">Efficacité</span>
                                        <span className="text-blue-500 dark:text-blue-400 font-bold">87,2%</span>
                                    </div>
                                </div>
                                <div className="h-2 dark:bg-slate-700 bg-slate-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full w-4/5 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"></div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}