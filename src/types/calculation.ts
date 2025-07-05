export type CalculationType = 'channels' | 'blocking' | 'traffic' | 'population';

export interface ResultsCalculateProps {
  result: number;
  chartData: any[];
  aiAnalysis: string;
  isLoading?: boolean;
  error?: Error | null;
  population?: number;
  callRate?: number;
  avgDuration?: number;
  trafficIntensity?: number;
  blockingProbability?: number;
  channels?: number;
  calculationType?: string;
}
