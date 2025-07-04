import {Card, CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card";
import {AlertCircle, Brain, CheckCircle, FileText, Lightbulb, Info, AlertTriangle} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Label} from "@/components/ui/label";

export default function AnalyseSimulationDetail({simulationData , getRiskColor}: {simulationData: any, getRiskColor: (riskLevel: string) => string}) {

    return (
        <Card className="bg-white dark:bg-gray-900/70 border dark:border-gray-800">
            <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Analyse
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                    Insights et recommandations
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="rounded-lg border dark:border-gray-800 p-4">
                        <div className="flex items-start gap-4">
                            <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-2">
                                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-500" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    Configuration optimale
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Le nombre de canaux calculé est optimal pour le trafic attendu
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg border dark:border-gray-800 p-4">
                        <div className="flex items-start gap-4">
                            <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-2">
                                <Info className="h-4 w-4 text-blue-600 dark:text-blue-500" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    Pic de trafic
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Le pic de trafic est observé entre 10h et 12h
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg border dark:border-gray-800 p-4">
                        <div className="flex items-start gap-4">
                            <div className="rounded-full bg-yellow-100 dark:bg-yellow-900/30 p-2">
                                <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    Recommandation
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Envisager d'ajouter 2-3 canaux pour anticiper la croissance
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}