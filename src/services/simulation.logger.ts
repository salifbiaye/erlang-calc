"use client";

interface SimulationLog {
  type: 'channels' | 'blocking' | 'traffic' | 'population';
  timestamp: string;
  formData: Record<string, any>;
  result: any;
  chartData: any[] | null;
  aiAnalysis: string;
  zone: {
    display_name: string;
    lat: number;
    lon: number;
  } | null;
}

export const simulationLogger = {
  log: (data: Omit<SimulationLog, 'timestamp'>) => {
    const logEntry: SimulationLog = {
      ...data,
      timestamp: new Date().toISOString(),
    };
    
    // Récupérer les logs existants ou initialiser un tableau vide
    const existingLogs = JSON.parse(localStorage.getItem('simulationLogs') || '[]');
    
    // Ajouter le nouveau log
    const updatedLogs = [...existingLogs, logEntry];
    
    // Sauvegarder dans le localStorage (limité à 100 entrées max)
    localStorage.setItem('simulationLogs', JSON.stringify(updatedLogs.slice(-100)));
    
    // Afficher dans la console pour le débogage
    console.log('[Simulation Log]', logEntry);
    
    return logEntry;
  },
  
  getLogs: (): SimulationLog[] => {
    if (typeof window === 'undefined') return [];
    return JSON.parse(localStorage.getItem('simulationLogs') || '[]');
  },
  
  clearLogs: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('simulationLogs');
    }
  }
};

export default simulationLogger;
