"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import ReactMarkdown from "react-markdown";

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ResultsCalculateProps {
  result: number | null;
  chartData: Array<{ population: number; traffic: number }> | null;
  aiAnalysis?: string;
  isLoading: boolean;
  error: Error | null;
  population: number;
  callRate: number;
  avgDuration: number;
}

export function ResultsPopulationCalculate({
  result,
  chartData,
  aiAnalysis,
  isLoading,
  error,

}: ResultsCalculateProps) {

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Erreur</AlertTitle>
        <AlertDescription>
          Une erreur est survenue lors du calcul : {error.message}
        </AlertDescription>
      </Alert>
    );
  }

  if (!result || !chartData) {
    return (
      <div className="text-center text-muted-foreground">
        <p>Entrez les paramètres pour voir les résultats</p>
      </div>
    );
  }



  // Préparation des données pour le graphique
  const data: ChartData<"scatter", {x: number, y: number}[], unknown> = {
    datasets: [
      {
        label: 'Trafic (Erlangs)',
        data: (chartData || []).map(item => ({
          x: item.population,
          y: item.traffic
        })),
        borderColor: 'hsl(221.2 83.2% 53.3%)',
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderWidth: 2,
        pointBackgroundColor: 'hsl(221.2 83.2% 53.3%)',
        pointBorderColor: '#fff',
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'hsl(221.2 83.2% 53.3%)',
        pointHoverBorderColor: '#fff',
        pointHitRadius: 10,
        pointBorderWidth: 2,
        showLine: true,
        tension: 0.1,
      },
    ],
  };

  const options: ChartOptions<'scatter'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Trafic en fonction de la population',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const data = context.raw as {x: number, y: number};
            return `Population: ${data.x}, Trafic: ${data.y} Erlangs`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Population',
        },
        type: 'linear',
        position: 'bottom',
        min: 0,
        beginAtZero: true,
      },
      y: {
        title: {
          display: true,
          text: 'Trafic (Erlangs)',
        },
        min: 0,
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="space-y-6 dark:bg-gray-900-50">
      <Card className={"dark:bg-gray-900/50"}>
        <CardHeader>
          <CardTitle>Résultats du calcul</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Traffic erlang</p>
              <p className="text-2xl font-bold">
                {result}
              </p>
            </div>
          </div>


        </CardContent>
      </Card>

      <Card className={"dark:bg-gray-900/50"}>
        <CardHeader>
          <CardTitle>Courbe de trafic</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <Scatter options={options} data={data} />
          </div>
        </CardContent>
      </Card>

      {aiAnalysis && (
        <Card className="mt-6 dark:bg-gray-900/50">
          <CardHeader>
            <CardTitle>Analyse IA</CardTitle>
          </CardHeader>
          <CardContent className={"dark:bg-gray-900/50"}>

            <ReactMarkdown >{aiAnalysis}</ReactMarkdown>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
