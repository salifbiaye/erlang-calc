export interface Simulation {
  id: string;
  name: string;
  type: 'CHANNELS' | 'BLOCKING' | 'TRAFFIC' | 'POPULATION';
  formData: Record<string, any>;
  result: any;
  chartData?: any[];
  aiAnalysis?: string;
  zone?: {
    lat: number;
    lon: number;
    display_name: string;
  };
  createdAt: string;
  updatedAt: string;
}
