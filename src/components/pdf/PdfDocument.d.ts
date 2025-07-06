import { FC } from 'react';

declare const PdfDocument: FC<{
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
}>;

export default PdfDocument;
