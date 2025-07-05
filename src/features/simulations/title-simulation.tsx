import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface TitleSimulationProps {
  title?: string;
}

export default function TitleSimulation({ title = "Simulations" }: TitleSimulationProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
        <p className="text-muted-foreground text-sm">Gérez vos calculs de trafic télécom</p>
      </div>
      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
        <Plus className="mr-2 h-4 w-4" />
        Nouvelle Simulation
      </Button>
    </div>
  );
}