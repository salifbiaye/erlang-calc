// src/features/calculate/results-channel-calculate.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

export function ResultsBlockingCalculate({
                                            result,
                                            chartData,
                                            aiAnalysis,
                                            isLoading,
                                            error
                                        }: ResultsCalculateProps) {
    // Préparer les données pour le graphique
    const chartConfig = {
      labels: chartData?.map(item => item.channels) || [],
      datasets: [
        {
          label: 'Taux de blocage',
          data: chartData?.map(item => item.blockingRate) || [],
          borderColor: 'hsl(221.2 83.2% 53.3%)',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          tension: 0.3,
          fill: true,
        },
      ],
    };

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
                                <h3 className="text-lg font-medium">taux de blockage</h3>
                                <p className="text-2xl font-bold text-brand-600">{result}</p>
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
                                                },
                                                ticks: {
                                                  callback: function(value: number | string) {
                                                    const numValue = typeof value === 'string' ? parseFloat(value) : value;
                                                    return (numValue).toFixed(2) + '%';
                                                  }
                                                }
                                            },
                                            x: {
                                                title: {
                                                    display: true,
                                                    text: 'Nombre de canaux'
                                                },
                                                ticks: {
                                                  stepSize: 1
                                                }
                                            }
                                        },
                                        plugins: {
                                          tooltip: {
                                            callbacks: {
                                              label: function(context) {
                                                const yValue = typeof context.parsed.y === 'string' ? parseFloat(context.parsed.y) : context.parsed.y;
                                                return `Taux de blocage: ${(yValue).toFixed(2)}%`;
                                              },
                                              title: function(tooltipItems) {
                                                const data = tooltipItems[0];
                                                return `${data.label} canaux`;
                                              }
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
                <Card className={"dark:bg-gray-900/20 dark:text-white "}>
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