import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {MapPin} from "lucide-react";
import {InteractiveMap} from "@/components/interactive-map";

interface ZoneData {
    lat: number;
    lon: number;
    display_name: string;
}

interface MapInteractiveCalculateProps {
    selectedZone: ZoneData | null;
}

export default function MapInteractiveCalculate({selectedZone}: MapInteractiveCalculateProps) {
    return (
        <div className="lg:col-span-1 xl:col-span-1 mb-8">
            <Card className="dark:bg-slate-800/30 dark:border-slate-700/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 dark:text-white">
                        <MapPin className="h-5 w-5"/>
                        Carte de la zone
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <InteractiveMap selectedZone={selectedZone} className="h-64 md:h-80"/>
                </CardContent>
            </Card>
        </div>
    );
}