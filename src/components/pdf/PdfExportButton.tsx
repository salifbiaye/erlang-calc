'use client';

import { PDFDownloadLink } from '@react-pdf/renderer';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Simulation } from '@/services/simulation.service';
import SimulationPdf from './SimulationPdf';
import { notify } from '@/lib/notifications';

interface PdfExportButtonProps {
  simulation: {
    id: string;
    name?: string;
    type: 'CHANNELS' | 'BLOCKING' | 'TRAFFIC' | 'POPULATION';
    formData: Record<string, any>;
    result: any;
    chartData: any[];
    aiAnalysis?: string;
    createdAt: string;
    updatedAt: string;
    zoneDisplayName?: string;
  };
  simulationName?: string;
}

export function PdfExportButton({ simulation, simulationName }: PdfExportButtonProps) {
  const getPdfFileName = () => {
    const name = simulationName 
      ? simulationName.toLowerCase().replace(/\s+/g, '-')
      : 'simulation';
    return `simulation-${name}-${new Date().toISOString().split('T')[0]}.pdf`;
  };

  console.log('PdfExportButton - Données de simulation:', simulation);

  return (
    <PDFDownloadLink
      document={
        <SimulationPdf 
          simulation={{
            ...simulation,
            name: simulationName || simulation.name || 'Simulation',
            zoneDisplayName: simulation.zoneDisplayName || simulation.formData?.zoneDisplayName || 'Sans localisation',
          }}
        />
      }
      fileName={getPdfFileName()}
      onClick={() => {
        console.log('Début du téléchargement du PDF');
        notify.info('Préparation du PDF', {
          description: 'Le téléchargement va commencer...'
        });
      }}
    >
      {({ loading }) => (
        <Button disabled={loading}>
          {loading ? (
            <span>Génération...</span>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              <span>Télécharger PDF</span>
            </>
          )}
        </Button>
      )}
    </PDFDownloadLink>
  );
}
