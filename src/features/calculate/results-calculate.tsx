import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {BarChart3, Calculator, MapPin} from "lucide-react";

export default function ResultsCalculate({calculationType, selectedZone, showResults, currentCalculation, getResultValue, getResultUnit}: { calculationType: string, selectedZone: any, showResults: boolean, currentCalculation: any, getResultValue: () => string, getResultUnit: () => string}) {
    return (
        <div className="lg:col-span-2 xl:col-span-1">
            <Card className="dark:bg-slate-800/30 dark:border-slate-700/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 dark:text-white">
                        <BarChart3 className="h-5 w-5"/>
                        Résultats
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {!calculationType ? (
                        <div className="flex flex-col items-center justify-center h-64 dark:text-slate-400">
                            <Calculator className="h-12 w-12 mb-4 opacity-50"/>
                            <p className="text-center">Sélectionnez un type de calcul pour voir les résultats</p>
                        </div>
                    ) : !selectedZone ? (
                        <div className="flex flex-col items-center justify-center h-64 dark:text-slate-400">
                            <MapPin className="h-12 w-12 mb-4 opacity-50"/>
                            <p className="text-center">Sélectionnez une zone sur la carte pour continuer</p>
                        </div>
                    ) : !showResults ? (
                        <div className="flex flex-col items-center justify-center h-64 dark:text-slate-400">
                            <div className="animate-pulse">
                                {currentCalculation && <currentCalculation.icon className="h-12 w-12 mb-4"/>}
                            </div>
                            <p className="text-center">Cliquez sur &#34;Calculer&#34; pour voir les résultats</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Graphique simulé */}
                            <div
                                className="h-32 md:h-40 dark:bg-slate-700/20 rounded-lg flex items-center justify-center border dark:border-slate-600">
                                <div className="text-center">
                                    <div
                                        className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                                        {currentCalculation &&
                                            <currentCalculation.icon className="h-8 w-8 text-blue-400"/>}
                                    </div>
                                    <span className="dark:text-slate-400 text-sm">Graphique interactif</span>
                                </div>
                            </div>

                            {/* Grille de résultats */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-sm dark:text-slate-400">Valeur calculée</p>
                                    <p className="text-2xl font-bold dark:text-white">{getResultValue()}</p>
                                    <p className="text-xs dark:text-slate-500">{getResultUnit()}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm dark:text-slate-400">Efficacité</p>
                                    <p className="text-2xl font-bold text-green-400">89.3%</p>
                                    <p className="text-xs dark:text-slate-500">plage optimale</p>
                                </div>
                            </div>

                            {/* Informations sur la zone */}
                            <div className="p-3 dark:bg-slate-700/30 rounded-lg border dark:border-slate-600">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500"/>
                                    <span className="text-sm font-medium dark:text-white">
                            {selectedZone.display_name.split(",")[0]}
                          </span>
                                </div>
                                <p className="text-xs dark:text-slate-400">
                                    Zone sélectionnée pour le calcul {currentCalculation?.title.toLowerCase()}
                                </p>
                                <p className="text-xs dark:text-slate-500 mt-1">
                                    Coordonnées: {Number.parseFloat(selectedZone.lat).toFixed(4)},{" "}
                                    {Number.parseFloat(selectedZone.lon).toFixed(4)}
                                </p>
                            </div>

                            {/* Recommandations */}
                            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                <h4 className="text-sm font-medium text-blue-400 mb-1">💡 Recommandations</h4>
                                <p className="text-xs dark:text-slate-300">
                                    {calculationType === "channels" && "Le nombre de canaux calculé est optimal pour cette zone."}
                                    {calculationType === "blocking" && "Le taux de blocage est dans la plage acceptable."}
                                    {calculationType === "traffic" && "Le trafic supporté correspond aux besoins estimés."}
                                    {calculationType === "population" && "L'estimation basée sur la population semble réaliste."}
                                </p>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}