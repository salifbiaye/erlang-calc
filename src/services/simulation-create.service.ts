import { useMutation } from '@tanstack/react-query';
import { simulationService } from './simulation.service';
import { useRouter } from 'next/navigation';
import { notify } from '@/lib/notifications';

export const useCreateSimulation = () => {
  const router = useRouter();
  
  return useMutation({
    mutationFn: async (data: {
      type: 'channels' | 'blocking' | 'traffic' | 'population';
      formData: Record<string, any>;
      result: number;
      chartData: Record<string, any>;
      aiAnalysis?: string;
      zone?: {
        lat: number;
        lon: number;
        display_name: string;
      } | null;
    }) => {
      // Convertir le type en minuscules pour correspondre aux attentes du backend
  const type = data.type.toLowerCase() as 'channels' | 'blocking' | 'traffic' | 'population';
  
  // S'assurer que chartData est un objet
  const chartData = Array.isArray(data.chartData) ? { data: data.chartData } : data.chartData;
  
  return simulationService.createSimulation({
    type,
    formData: data.formData,
    result: data.result,
    chartData,
    aiAnalysis: data.aiAnalysis,
    zone: data.zone ? {
      lat: data.zone.lat,
      lon: data.zone.lon,
      display_name: data.zone.display_name
    } : null
  });
    },
    onSuccess: (data) => {
      notify.success('Simulation enregistrée avec succès');
      router.push(`/simulations/${data.id}`);
    },
    onError: (error: Error) => {
      console.error('Erreur lors de la sauvegarde de la simulation:', error);
      notify.error('Erreur lors de la sauvegarde de la simulation');
    }
  });
}
