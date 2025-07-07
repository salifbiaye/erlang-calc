import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Simulation } from './use-simulations';
import { ResultsChannelCalculate } from '../calculate/results/results-channel-calculate';
import { ResultsTrafficCalculate } from '../calculate/results/results-traffic-calculate';
import { ResultsBlockingCalculate } from '../calculate/results/results-blocking-calculate';
import { ResultsPopulationCalculate } from '../calculate/results/results-population-calculate';
import { useState } from 'react';
import { SimulationActions } from '../simulation-detail/simulation-actions';

interface SimulationDetailProps {
  simulation: Simulation;
}

export function SimulationDetail({ simulation }: SimulationDetailProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const renderResults = () => {
    const commonProps = {
      result: simulation.result,
      chartData: simulation.chartData.data,
      aiAnalysis: simulation.aiAnalysis || '',
      isLoading,
      error,
      // Ajout des propriétés manquantes
      population: simulation.formData?.population || 0,
      callRate: simulation.formData?.call_rate || 0,
      avgDuration: simulation.formData?.avg_duration || 0,
      // Propriétés spécifiques pour chaque type de calcul
      trafficIntensity: simulation.formData?.traffic_intensity || 0,
      blockingProbability: simulation.formData?.blocking_prob || 0,
      channels: simulation.formData?.channels || 0,
      calculationType: simulation.formData?.calculationType || ''
    };

    switch (simulation.type) {
      case 'CHANNELS':
        return <ResultsChannelCalculate {...commonProps} />;
      case 'TRAFFIC':
        return <ResultsTrafficCalculate {...commonProps} />;
      case 'BLOCKING':
        return <ResultsBlockingCalculate {...commonProps} />;
      case 'POPULATION':
        return <ResultsPopulationCalculate {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Retour</span>
          </Button>
          <h2 className="lg:text-xl truncate font-semibold">Résultats de la simulation</h2>
        </div>
        
        <SimulationActions 
          simulationId={simulation.id} 
          simulationName={simulation.zoneDisplayName || 'sans-nom'}
          simulation={simulation}
        />
      </div>

      <div className=" rounded-none dark:bg-gray-900/20 p-6">
        {renderResults()}
      </div>
    </div>
  );
}
