import {Card, CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card";
import {BarChart3, Download, TrendingUp, LineChart} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function GraphiqueSimulationDetail() {
    return (
        <Card className="bg-white dark:bg-gray-900/70 border dark:border-gray-800">
            <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                    <LineChart className="h-5 w-5" />
                    Graphiques
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                    Visualisation des résultats
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                Évolution du trafic
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Trafic par heure sur 24h
                            </p>
                        </div>
                        <Button variant="outline" size="sm" className="text-gray-700 dark:text-gray-300">
                            <Download className="h-4 w-4 mr-2" />
                            Exporter
                        </Button>
                    </div>
                    <div className="h-[200px] w-full bg-gray-100 dark:bg-gray-800 rounded-lg" />
                </div>
            </CardContent>
        </Card>
    )
}