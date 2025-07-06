'use client';

import PdfGenerator from './PdfGenerator';
import { notify } from '@/lib/notifications';

interface PdfExportButtonProps {
  simulation: {
    id: string;
    name?: string;
    type: 'CHANNELS' | 'BLOCKING' | 'TRAFFIC' | 'POPULATION';
    formData: Record<string, any>;
    result: any;
    chartData?: any[];
    aiAnalysis?: string;
    createdAt: string;
    updatedAt: string;
    zoneDisplayName?: string;
  };
  simulationName?: string;
}

export function PdfExportButton({ simulation, simulationName }: PdfExportButtonProps) {
  const handleClick = () => {
    notify.info('Préparation du PDF', {
      description: 'Le téléchargement va commencer...'
    });
  };

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      <PdfGenerator 
        simulation={{
          ...simulation,
          name: simulationName || simulation.name,
          zoneDisplayName: simulation.zoneDisplayName || simulation.formData?.zoneDisplayName,
        }}
      />
    </div>
  );
}
