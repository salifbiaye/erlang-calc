'use client';

import { PDFDownloadLink } from '@react-pdf/renderer';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Import direct du composant
import PdfDocument from './PdfDocument';

interface PdfGeneratorProps {
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

const PdfGenerator = ({ simulation, simulationName }: PdfGeneratorProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <Button disabled>
        <Download className="h-4 w-4 mr-2" />
        Préparation du PDF...
      </Button>
    );
  }

  const fileName = `simulation-${simulationName || 'sans-nom'}-${new Date(simulation.createdAt).toISOString().split('T')[0]}.pdf`;

  return (
    <PDFDownloadLink
      document={<PdfDocument simulation={simulation} />}
      fileName={fileName}
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
};

export { PdfGenerator };
export default PdfGenerator;
