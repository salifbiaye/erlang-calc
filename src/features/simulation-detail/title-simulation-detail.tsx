import {Calendar, Copy, Download, MapPin, Share2, User} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";

export default function TitleSimulationDetail({simulationData,getStatusColor}:{ simulationData: { name: string, zone: string, createdAt: string, author: string, status: string } , getStatusColor: (status: string) => string}) {
    return (
        <div className="flex items-start justify-between mb-6">
            <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight dark:text-white">{simulationData.name}</h1>
                <div className="flex items-center gap-4 text-sm dark:text-slate-400">
                    <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4"/>
                        <span>{simulationData.zone}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4"/>
                        <span>Créé le {simulationData.createdAt}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                        <User className="h-4 w-4"/>
                        <span>{simulationData.author}</span>
                    </div>
                    <Badge className={getStatusColor(simulationData.status)}>
                        {simulationData.status === "completed" ? "Terminé" : simulationData.status}
                    </Badge>
                </div>
            </div>
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700 bg-transparent"
                >
                    <Share2 className="mr-2 h-4 w-4"/>
                    Partager
                </Button>

                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Download className="mr-2 h-4 w-4"/>
                    Exporter PDF
                </Button>
            </div>
        </div>
    );
}