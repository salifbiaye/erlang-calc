"use client"

import { Clock, Share2, BarChart3, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import HeaderSimulation from "@/features/simulations/header-simulation";

export default function SharedSimulationPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-white/5">
            <HeaderSimulation title={"mes simulations partagées"} />
            <div className="container mx-auto px-4 py-16">
                <div className=" text-center space-y-8">
                    <div className="space-y-4">
                        <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                            <Zap className="h-4 w-4 mr-2" />
                            Nouveauté à venir
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                            Simulations partagées
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Partagez facilement vos simulations avec vos collègues et collaborez en temps réel.
                        </p>
                    </div>

                    <div className="relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow">
                        <div className="absolute inset-0 bg-black/20 dark:bg-gray-900/50 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-8 text-center">
                            <div className="bg-primary/90 text-white text-sm font-medium px-4 py-2 rounded-full flex items-center gap-2 mb-4">
                                <Clock className="h-4 w-4" />
                                Bientôt disponible
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Fonctionnalité en cours de développement</h3>
                            <p className="text-muted-foreground max-w-md">
                                Nous travaillons activement sur cette fonctionnalité pour vous offrir la meilleure expérience de partage de simulations.
                            </p>
                        </div>
                        
                        <div className="relative opacity-30 pointer-events-none">
                            <div className="grid md:grid-cols-2 gap-6 p-8">
                                <Card className="h-full">
                                    <CardHeader>
                                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                                            <Share2 className="h-6 w-6 text-primary" />
                                        </div>
                                        <CardTitle>Partage simplifié</CardTitle>
                                        <CardDescription>
                                            Partagez vos simulations en un seul clic
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">
                                            Générez un lien de partage ou envoyez des invitations par email.
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="h-full">
                                    <CardHeader>
                                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                                            <Users className="h-6 w-6 text-primary" />
                                        </div>
                                        <CardTitle>Collaboration en temps réel</CardTitle>
                                        <CardDescription>
                                            Travaillez à plusieurs sur la même simulation
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">
                                            Visualisez les modifications de vos collaborateurs en direct.
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="md:col-span-2">
                                    <CardHeader>
                                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4 mx-auto">
                                            <BarChart3 className="h-6 w-6 text-primary" />
                                        </div>
                                        <CardTitle className="text-center">Suivi des modifications</CardTitle>
                                        <CardDescription className="text-center">
                                            Consultez l'historique des modifications
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground text-center max-w-2xl mx-auto">
                                            Retracez l'évolution de vos simulations et revenez à n'importe quelle version précédente.
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
