import {Card, CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card";
import {Radio, Settings2, MapPin, Users, Phone, Clock} from "lucide-react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

export default function EntreParametreSimulationDetail({simulationData}: {simulationData: any}) {

    return (
        <Card className="bg-white dark:bg-gray-900/70 border dark:border-gray-800">
            <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                    <Settings2 className="h-5 w-5" />
                    Paramètres d'entrée
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                    Configuration utilisée pour cette simulation
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div>
                        <Label className="text-gray-700 dark:text-gray-300">Zone géographique</Label>
                        <div className="mt-1.5 flex items-center gap-2 text-gray-900 dark:text-white">
                            <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <span>{simulationData.zone}</span>
                        </div>
                    </div>
                    <div>
                        <Label className="text-gray-700 dark:text-gray-300">Population</Label>
                        <div className="mt-1.5 flex items-center gap-2 text-gray-900 dark:text-white">
                            <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <span>{simulationData.parameters.population.toLocaleString()} habitants</span>
                        </div>
                    </div>
                    <div>
                        <Label className="text-gray-700 dark:text-gray-300">Taux d'appels</Label>
                        <div className="mt-1.5 flex items-center gap-2 text-gray-900 dark:text-white">
                            <Phone className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <span>{simulationData.parameters.callRate} appels/heure/personne</span>
                        </div>
                    </div>
                    <div>
                        <Label className="text-gray-700 dark:text-gray-300">Durée moyenne</Label>
                        <div className="mt-1.5 flex items-center gap-2 text-gray-900 dark:text-white">
                            <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <span>{simulationData.parameters.avgDuration} minutes</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}