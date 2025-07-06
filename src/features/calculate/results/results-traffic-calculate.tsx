"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useChartData } from "@/services/calculate.service";
import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ResultsCalculateProps {
  result: number | null;
  chartData: Array<{ traffic: number; blockingRate: number }> | null;
  aiAnalysis: string;
  isLoading: boolean;
  error: Error | null;
}

export function ResultsTrafficCalculate({
  result,
  chartData,
  aiAnalysis,
  isLoading,
  error
}: ResultsCalculateProps) {
  // Préparer les données pour le graphique
  const chartConfig = {
    labels: chartData?.map(item => item.traffic.toFixed(2)) || [],
    datasets: [
      {
        label: 'Taux de blocage (%)',
        data: chartData?.map(item => item.blockingRate) || [],
        borderColor: 'hsl(221.2 83.2% 53.3%)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.3,
        fill: true,
      },
    ],
  };
  console.log("Chart Data:", chartData, "Chart Config:", chartConfig)
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

  return (
    <div className="space-y-6">
      <Card className={"dark:bg-gray-900/50"}>
        <CardHeader>
          <CardTitle>Résultat du calcul</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-center">
            {result.toFixed(2)} <span className="text-lg font-normal">Erlangs</span>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-2">
            Trafic maximum supporté avec les paramètres donnés
          </p>
        </CardContent>
      </Card>

      {chartConfig && (
        <Card className={"dark:bg-gray-900/50"}>
          <CardHeader>
            <CardTitle>Courbe de trafic</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Chart
                type="line"
                data={chartConfig}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: 'Trafic (Erlangs)'
                      }
                    },
                    y: {
                      title: {
                        display: true,
                        text: 'Taux de blocage (%)'
                      },
                      min: 0,
                      max: 100,
                      ticks: {
                        callback: function(value) {
                          return value + '%';
                        }
                      }
                    }
                  },
                  plugins: {
                    legend: {
                      position: 'top' as const,
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          return `Taux de blocage: ${(context.parsed.y ).toFixed(2)}%`;
                        },
                        title: function(tooltipItems) {
                          const data = tooltipItems[0];
                          return `Trafic: ${data.label} Erlangs`;
                        }
                      }
                    }
                  }
                }}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {aiAnalysis && (
        <Card className={"dark:bg-gray-900/20 dark:text-white"}>
          <CardHeader>
            <CardTitle>Analyse des résultats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown>{aiAnalysis}</ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
