import { useState, useEffect } from "react"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {MapPin} from "lucide-react";
import {ZoneSearch} from "@/components/zone-search";

interface ZoneData {
    lat: number;
    lon: number;
    display_name: string;
}

interface ZoneSearchCalculateProps {
    initialZone: ZoneData | null;
    onZoneChange: (zone: ZoneData | null) => void;
}

export default function ZoneSearchCalculate({initialZone, onZoneChange}: ZoneSearchCalculateProps) {
    const [selectedZone, setSelectedZone] = useState<ZoneData | null>(initialZone);

    useEffect(() => {
        onZoneChange(selectedZone);
    }, [selectedZone, onZoneChange]);

    return (
        <Card className="dark:bg-slate-800/30 dark:border-slate-700/50 mb-6">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                    <MapPin className="h-5 w-5" />
                    Sélection de la zone
                </CardTitle>
            </CardHeader>
            <CardContent className={"dark:text-white text-gray-900"}>
                <ZoneSearch onZoneSelect={setSelectedZone} selectedZone={selectedZone}  />
                {selectedZone && (
                    <div className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Coordonnées: {selectedZone.lat.toFixed(4)}, {selectedZone.lon.toFixed(4)}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}