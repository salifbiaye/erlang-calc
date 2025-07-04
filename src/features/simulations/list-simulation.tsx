import {ChevronRight, Circle, Star} from "lucide-react";

export default function ListSimulation({paginatedSimulations, toggleStar, getStatusColor, getStatusText}: {paginatedSimulations: any[], toggleStar: (id: string) => void, getStatusColor: (blockingRate: number, error: boolean) => string, getStatusText: (blockingRate: number, error: boolean) => string}) {
    return (
        <div className="space-y-3">
            {paginatedSimulations.map((simulation) => (
                <div
                    key={simulation.id}
                    className="bg-muted/30 dark:bg-slate-800/30 border dark:border-slate-700/50 rounded-lg p-4 hover:bg-muted/50 dark:hover:bg-slate-800/50 transition-colors"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                            <div className="flex items-center gap-3">
                                <Circle
                                    className={`w-2 h-2 ${getStatusColor(simulation.blockingRate, simulation.error)}`}/>
                                <span className="text-foreground font-medium">{simulation.zone}</span>
                                <span className="text-muted-foreground">/</span>
                                <span className="text-muted-foreground">{simulation.simulationName}</span>
                                <button
                                    onClick={() => toggleStar(simulation.id)}
                                    className="hover:scale-110 transition-transform"
                                >
                                    <Star
                                        className={`w-4 h-4 ${
                                            simulation.starred
                                                ? "fill-yellow-500 text-yellow-500"
                                                : "text-muted-foreground hover:text-yellow-500"
                                        }`}
                                    />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <ChevronRight className="w-4 h-4 text-muted-foreground"/>

                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center border">
                                    <span
                                        className="text-xs font-medium text-foreground">{simulation.user.initials}</span>
                                </div>
                                <span className="text-xs text-muted-foreground">
                            {getStatusText(simulation.blockingRate, simulation.error)}
                          </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-2 ml-6">
                        <p className="text-xs text-muted-foreground">
                            {simulation.date}
                            {!simulation.error && (
                                <>
                                    {" • "}
                                    {simulation.channels} canaux
                                    {" • "}
                                    {simulation.blockingRate}% de blocage
                                </>
                            )}
                            {simulation.error && " • Erreur dans les paramètres"}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}