import { useQuery } from '@tanstack/react-query';
import { simulationService } from '@/services/simulation.service';
import { Simulation } from './use-simulations';

export const useSimulationDetail = (id: string | undefined) => {
  return useQuery<Simulation, Error>({
    queryKey: ['simulation', id],
    queryFn: () => simulationService.getSimulationById(id || ''),
    enabled: !!id, // Ne lance la requête que si l'ID est défini
  });
};
