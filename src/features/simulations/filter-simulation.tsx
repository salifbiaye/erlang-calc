import {Filter} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";


export default function FilterSimulation({starFilter, setStarFilter, statusFilter, setStatusFilter, filteredSimulations}: {starFilter: string, setStarFilter: (value: string) => void, statusFilter: string, setStatusFilter: (value: string) => void, filteredSimulations: any[]}) {

    return (
        <div className="flex items-center gap-4 mb-6 p-4 bg-muted/30 rounded-lg border border-border">
            <Filter className="w-4 h-4 text-muted-foreground"/>
            <span className="text-sm font-medium text-foreground">Filtres:</span>

            <Select value={starFilter} onValueChange={setStarFilter}>
                <SelectTrigger className="w-40">
                    <SelectValue placeholder="Favoris"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="starred">Favoris</SelectItem>
                    <SelectItem value="unstarred">Non favoris</SelectItem>
                </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                    <SelectValue placeholder="Statut"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="optimal">Optimal</SelectItem>
                    <SelectItem value="acceptable">Acceptable</SelectItem>
                    <SelectItem value="problematic">À optimiser</SelectItem>
                    <SelectItem value="error">Erreur</SelectItem>
                </SelectContent>
            </Select>

            <div className="ml-auto text-sm text-muted-foreground">
                {filteredSimulations.length} simulation{filteredSimulations.length !== 1 ? "s" : ""} trouvée
                {filteredSimulations.length !== 1 ? "s" : ""}
            </div>
        </div>
    )
}