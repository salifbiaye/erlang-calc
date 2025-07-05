// src/features/calculate/results-channel-calculate.tsx
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
  chartData: Array<{ channels: number; blockingRate: number }> | null;
  aiAnalysis: string;
  isLoading: boolean;
  error: Error | null;
}



export function ResultsChannelCalculate({
  result, 
  chartData, 
  aiAnalysis, 
  isLoading, 
  error 
}: ResultsCalculateProps) {
  const { data: chartConfig } = useChartData(chartData || undefined);


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
        Entrez les paramètres et cliquez sur &#34;Calculer&#34; pour voir les résultats
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className={"grid grid-cols-2 gap-8"}>
        <Card className={"dark:bg-gray-900/50"}>
          <CardHeader>
            <CardTitle>Résultats du calcul</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-medium">Nombre de canaux nécessaires</h3>
                <p className="text-4xl font-bold text-brand-600">{result}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={"dark:bg-gray-900/50"}>
          <CardHeader>
            <CardTitle>Graphique du taux de blocage</CardTitle>
          </CardHeader>
          <CardContent>
            {chartConfig && (
                <div className="h-80">
                  <Chart
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                          y: {
                            beginAtZero: true,
                            title: {
                              display: true,
                              text: 'Taux de blocage (%)'
                            }
                          },
                          x: {
                            title: {
                              display: true,
                              text: 'Nombre de canaux'
                            }
                          }
                        }
                      }}
                      data={chartConfig}
                      type="line"
                  />
                </div>
            )}
          </CardContent>
        </Card>
      </div>

      {aiAnalysis && (
        <Card className={"dark:bg-gray-900/50 bg-primary/10"}>
          <CardHeader>
            <CardTitle>Analyse IA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none dark:prose-invert">
              <ReactMarkdown>{aiAnalysis}</ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}