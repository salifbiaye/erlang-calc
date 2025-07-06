import { Filter} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FilterSimulationProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  starFilter: string;
  onStarFilterChange: (value: string) => void;
  filteredSimulations: any[];
}

export default function FilterSimulation({
  starFilter,
  onStarFilterChange,
  filteredSimulations
}: FilterSimulationProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6 p-4 bg-muted/30 rounded-lg ">


      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
        <span className="text-sm font-medium text-foreground hidden md:inline">Filtres:</span>

        <Select value={starFilter} onValueChange={onStarFilterChange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Favoris" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="starred">Favoris</SelectItem>
            <SelectItem value="unstarred">Non favoris</SelectItem>
          </SelectContent>
        </Select>



        <div className="ml-auto text-sm text-muted-foreground">
          {filteredSimulations.length} simulation{filteredSimulations.length !== 1 ? 's' : ''} trouvée
          {filteredSimulations.length !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
}