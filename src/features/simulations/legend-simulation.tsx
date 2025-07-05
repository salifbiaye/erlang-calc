import { Circle } from "lucide-react";
import { getSimulationTypeInfo } from "./use-simulations";

export default function LegendSimulation() {
    const types = ['CHANNELS', 'BLOCKING', 'TRAFFIC', 'POPULATION'] as const;
    
    return (
        <div className="mt-8 p-4 bg-muted/30 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-foreground mb-3">Légende des types de calcul</h3>
            <div className="flex flex-wrap gap-6 text-xs">
                {types.map(type => {
                    const typeInfo = getSimulationTypeInfo(type);
                    return (
                        <div key={type} className="flex items-center gap-2">
                            <Circle className={`w-2 h-2 ${typeInfo.color}`}/>
                            <span className="text-muted-foreground">{typeInfo.name}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
