import {Card, CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card";
import {BarChart3, CheckCircle,} from "lucide-react";
import {Label} from "@/components/ui/label";


interface SimulationResults {
  requiredChannels: number;
  actualBlockingRate: number;
  efficiency: number;
  peakTrafficCapacity: number;
}

interface SimulationData {
  results: SimulationResults;
}

interface ResultsSimulationDetailProps {
  simulationData: SimulationData;
}

export default function ResultsSimulationDetail({ simulationData }: ResultsSimulationDetailProps) {

    return (
        <Card className="bg-white dark:bg-gray-900/70 border dark:border-gray-800">
            <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Résultats
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                    Résultats calculés pour cette simulation
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 dark:bg-slate-700/20 bg-gray-100 rounded-lg">
                        <p className="text-3xl font-bold text-blue-400">{simulationData.results.requiredChannels}</p>
                        <p className="text-sm text-slate-400">Canaux requis</p>
                    </div>
                    <div className="text-center p-4 dark:bg-slate-700/20 bg-gray-100 rounded-lg">
                        <p className="text-3xl font-bold text-green-400">
                            {simulationData.results.actualBlockingRate}%
                        </p>
                        <p className="text-sm text-slate-400">Taux de blocage réel</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label className="dark:text-slate-400 text-sm">Efficacité</Label>
                        <p className="text-xl font-bold text-white">{simulationData.results.efficiency}%</p>
                    </div>
                    <div>
                        <Label className="dark:text-slate-400 text-sm">Capacité de pointe</Label>
                        <p className="text-xl font-bold text-white">
                            {simulationData.results.peakTrafficCapacity} Erlangs
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-green-400 font-medium">Configuration optimale</span>
                </div>
            </CardContent>
        </Card>
    )
}