declare module '*.pdf' {
  const content: string;
  export default content;
}

declare module '*/components/pdf/PdfDocument' {
  import { FC } from 'react';
  
  interface PdfDocumentProps {
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
  }

  const PdfDocument: FC<PdfDocumentProps>;
  export default PdfDocument;
}
