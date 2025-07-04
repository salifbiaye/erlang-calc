import {Circle} from "lucide-react";

export default function LegendSimulation() {
    return (
        <div className="mt-8 p-4 bg-muted/30 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-foreground mb-3">Légende des indicateurs de performance</h3>
            <div className="flex flex-wrap gap-6 text-xs">
                <div className="flex items-center gap-2">
                    <Circle className="w-2 h-2 fill-green-500 text-green-500"/>
                    <span className="text-muted-foreground">Optimal (≤ 2% de blocage)</span>
                </div>
                <div className="flex items-center gap-2">
                    <Circle className="w-2 h-2 fill-yellow-500 text-yellow-500"/>
                    <span className="text-muted-foreground">Acceptable (2-3% de blocage)</span>
                </div>
                <div className="flex items-center gap-2">
                    <Circle className="w-2 h-2 fill-red-500 text-red-500"/>
                    <span className="text-muted-foreground">À optimiser (&gt; 3% de blocage) ou Erreur</span>
                </div>
            </div>
        </div>
    )
}