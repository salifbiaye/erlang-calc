"use client"

import {useState, useEffect, useCallback} from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, Radio, Zap, TrendingUp, Users, } from "lucide-react"
import { Label } from "@/components/ui/label"
import HeaderCalculate from "@/features/calculate/header-calculate"
import TitleCalculate from "@/features/calculate/title-calculate"
import ZoneSearchCalculate from "@/features/calculate/zone-search-calculate"
import { FormulaireChannelCalculate } from "@/features/calculate/forms/formulaire-channel-calculate"
import MapInteractiveCalculate from "@/features/calculate/map-interactive-calculate"
import { ResultsChannelCalculate } from "@/features/calculate/results/results-channel-calculate"
import {useCalculateBlocking, useCalculateChannels, useCalculateTraffic, useCalculatePopulation} from "@/services/calculate.service"
import {FormulaireBlockingCalculate} from "@/features/calculate/forms/formulaire-blocking-calculate";
import {ResultsBlockingCalculate} from "@/features/calculate/results/results-blocking-calculate";
import { FormulaireTrafficCalculate } from "@/features/calculate/forms/formulaire-traffic-calculate";
import { ResultsTrafficCalculate } from "@/features/calculate/results/results-traffic-calculate";
import { FormulairePopulationCalculate } from "@/features/calculate/forms/formulaire-population-calculate";
import { ResultsPopulationCalculate } from "@/features/calculate/results/results-population-calculate";

interface ZoneData {
    display_name: string
    lat: number
    lon: number
}

const calculationTypes = [
    {
        id: "channels",
        title: "Nombre de canaux requis",
        description: "Calculer le nombre de canaux nécessaires",
        icon: Radio,
        fields: [
            { id: "traffic_intensity", label: "Intensité du trafic (Erlangs)", placeholder: "ex: 25.5", type: "number" },
            { id: "blocking_prob", label: "Probabilité de blocage (%)", placeholder: "ex: 2.0", type: "number" },
        ],
    },
    {
        id: "blocking",
        title: "Taux de blocage",
        description: "Calculer le taux de blocage du réseau",
        icon: Zap,
        fields: [
            { id: "num_channels", label: "Nombre de canaux", placeholder: "ex: 30", type: "number" },
            { id: "traffic_load", label: "Charge de trafic (Erlangs)", placeholder: "ex: 20.5", type: "number" },
        ],
    },
    {
        id: "traffic",
        title: "Trafic supporté",
        description: "Calculer le trafic maximum supporté",
        icon: TrendingUp,
        fields: [
            { id: "available_channels", label: "Canaux disponibles", placeholder: "ex: 45", type: "number" },
            { id: "target_blocking", label: "Taux de blocage cible (%)", placeholder: "ex: 1.5", type: "number" },
        ],
    },
    {
        id: "population",
        title: "Estimation basée sur la population",
        description: "Calculer selon les données démographiques",
        icon: Users,
        fields: [
            { id: "population", label: "Population", placeholder: "ex: 50000", type: "number" },
            { id: "call_rate", label: "Appels par personne/heure", placeholder: "ex: 0.5", type: "number" },
            { id: "avg_duration", label: "Durée moyenne d'appel (min)", placeholder: "ex: 3.5", type: "number" },
        ],
    },
]

// Données préremplies selon la zone
const zonePresets: Record<string, any> = {
    paris: {
        population: 2161000,
        call_rate: 0.8,
        avg_duration: 4.2,
        traffic_intensity: 45.2,
        blocking_prob: 1.5,
    },
    lyon: {
        population: 515695,
        call_rate: 0.7,
        avg_duration: 3.8,
        traffic_intensity: 28.5,
        blocking_prob: 2.0,
    },
    marseille: {
        population: 861635,
        call_rate: 0.6,
        avg_duration: 3.5,
        traffic_intensity: 32.1,
        blocking_prob: 2.2,
    },
    default: {
        population: 100000,
        call_rate: 0.5,
        avg_duration: 3.0,
        traffic_intensity: 25.0,
        blocking_prob: 2.0,
    },
}

export default function CalculatePage() {
    const [selectedZone, setSelectedZone] = useState<ZoneData | null>(null)
    const [calculationType, setCalculationType] = useState("")
    const [formData, setFormData] = useState<Record<string, string>>({})
    
    // Réinitialiser les données du formulaire lorsque le type de calcul change
    useEffect(() => {
        setFormData({})
        setShowResults(false)
        setResult(null)
        setChartData(null)
        setAiAnalysis("")
    }, [calculationType])
    const [showResults, setShowResults] = useState(false)
    
    // États pour les résultats du calcul
    const [result, setResult] = useState<number | null>(null)
    const [chartData, setChartData] = useState<any[] | null>(null)
    const [aiAnalysis, setAiAnalysis] = useState<string>("")

    const currentCalculation = calculationTypes.find((calc) => calc.id === calculationType)
    const { mutate: calculate, isPending, error, isError } = useCalculateChannels()
    const { mutate: calculateBlocking, isPending: isBlockingPending, error: blockingError, isError: isBlockingError } = useCalculateBlocking()
    const { mutate: calculateTraffic, isPending: isTrafficPending, error: trafficError, isError: isTrafficError } = useCalculateTraffic()
    const { mutate: calculatePopulation, isPending: isPopulationPending, error: populationError, isError: isPopulationError } = useCalculatePopulation()

    // Préremplir les champs selon la zone sélectionnée
    useEffect(() => {
        if (selectedZone && calculationType) {
            const zoneName = selectedZone.display_name.toLowerCase()
            let presetKey = "default"

            if (zoneName.includes("paris")) presetKey = "paris"
            else if (zoneName.includes("lyon")) presetKey = "lyon"
            else if (zoneName.includes("marseille")) presetKey = "marseille"

            const preset = zonePresets[presetKey]
            const newFormData: Record<string, string> = {}

            currentCalculation?.fields.forEach((field) => {
                if (preset[field.id]) {
                    newFormData[field.id] = preset[field.id].toString()
                }
            })

            setFormData(newFormData)
        }
    }, [selectedZone, calculationType, currentCalculation])


    const handleCalculate = useCallback((data: any) => {
        console.log("Début du calcul avec les données:", data, "et zone sélectionnée:", selectedZone)
        if (data.calculationType === "channels") {
            console.log("Calcul des canaux avec les données suivantes:", {
                ...data,
                selectedZone: selectedZone || undefined
            });

            calculate(
                {
                    calculationType: "channels",
                    traffic_intensity: data.traffic_intensity,
                    blocking_prob: data.blocking_prob,
                    selectedZone: selectedZone || undefined
                },
                {
                    onSuccess: (response) => {
                        setResult(response.result)
                        setChartData(response.chartData)
                        setAiAnalysis(response.aiAnalysis)
                        setShowResults(true)
                    },
                    onError: (error) => {
                        console.error("Erreur lors du calcul:", error)
                    },
                    onSettled: () => {
                        // S'exécute dans tous les cas (succès ou erreur)
                    }
                }
            )
        } else if (data.calculationType === "blocking") {

            calculateBlocking(
                {
                    calculationType: "blocking",
                    num_channels: parseFloat(data.num_channels || "0"),
                    traffic_load: parseFloat(data.traffic_load || "0"),
                    selectedZone: selectedZone || undefined
                },
                {
                    onSuccess: (response) => {
                        setResult(response.result)
                        setChartData(response.chartData)
                        setAiAnalysis(response.aiAnalysis)
                        setShowResults(true)
                    },
                    onError: (error) => {
                        console.error("Erreur lors du calcul:", error)
                    },
                    onSettled: () => {
                        // S'exécute dans tous les cas (succès ou erreur)
                    }
                }
            )


        } else if (data.calculationType === "traffic") {
            console.log("Calcul du trafic avec les données suivantes:", {
                ...data,
                selectedZone: selectedZone || undefined
            });

            calculateTraffic(
                {
                    calculationType: "traffic",
                    available_channels: Number(data.available_channels),
                    target_blocking: Number(data.target_blocking),
                    selectedZone: selectedZone || undefined
                },
                {
                    onSuccess: (response) => {
                        setResult(response.result);
                        setChartData(response.chartData);
                        setAiAnalysis(response.aiAnalysis);
                        setShowResults(true);
                    },
                    onError: (error) => {
                        console.error("Erreur lors du calcul du trafic:", error);
                    },
                    onSettled: () => {
                        // S'exécute dans tous les cas (succès ou erreur)
                    }
                }
            );
        } else if (data.calculationType === "population") {
            console.log("Calcul basé sur la population avec les données suivantes:", {
                ...data,
                selectedZone: selectedZone || undefined
            });

            calculatePopulation(
                {
                    calculationType: "population",
                    population: Number(data.population),
                    call_rate: Number(data.call_rate),
                    avg_duration: Number(data.avg_duration),
                    selectedZone: selectedZone || undefined
                },
                {
                    onSuccess: (response) => {
                        setResult(response.result);
                        setChartData(response.chartData);
                        setAiAnalysis(response.aiAnalysis);
                        setShowResults(true);
                    },
                    onError: (error) => {
                        console.error("Erreur lors du calcul basé sur la population:", error);
                    },
                    onSettled: () => {
                        // S'exécute dans tous les cas (succès ou erreur)
                    }
                }
            );
        } else {
            setShowResults(true)
        }
    })

        return (
        <div className="min-h-screen bg-white dark:bg-white/5 dark:text-white">
            <div className="flex flex-col">
                {/* En-tête de la page */}
                <HeaderCalculate />

                <div className="flex-1 p-4 md:p-6">
                    {/* Titre de la page */}
                    <TitleCalculate />

                    {/* Sélection de zone en haut */}
                    <ZoneSearchCalculate
                        initialZone={selectedZone}
                        onZoneChange={setSelectedZone}
                    />

                    {/* Carte interactive */}
                    <MapInteractiveCalculate selectedZone={selectedZone} />

                    <div className="grid gap-6 lg:grid-cols-1">
                        {/* Formulaire de paramètres */}
                        <div>
                            <Card className="dark:bg-slate-800/30 dark:border-slate-700/50">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 dark:text-white">
                                        <Calculator className="h-5 w-5" />
                                        Paramètres de calcul
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2 mb-4">
                                        <Label htmlFor="calc-type" className="dark:text-slate-300">
                                            Type de calcul
                                        </Label>
                                        <select
                                            value={calculationType}
                                            onChange={(e) => setCalculationType(e.target.value)}
                                            className="w-full p-2 rounded-md border dark:bg-slate-700/50 dark:border-slate-600 dark:text-white"
                                        >
                                            <option value="">Sélectionnez un type de calcul</option>
                                            {calculationTypes.map((calc) => (
                                                <option key={calc.id} value={calc.id}>
                                                    {calc.title}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {calculationType === "channels" && (
                                        <FormulaireChannelCalculate
                                            onCalculate={handleCalculate}
                                            isLoading={isPending}
                                            hasSelectedZone={!!selectedZone}
                                            defaultValues={formData}
                                        />
                                    )}

                                    {calculationType === "blocking" && (
                                        <FormulaireBlockingCalculate
                                            onCalculate={handleCalculate}
                                            isLoading={isBlockingPending}
                                            hasSelectedZone={!!selectedZone}
                                            defaultValues={formData}
                                        />
                                    )}

                                    {calculationType === "traffic" && (
                                        <FormulaireTrafficCalculate
                                            onCalculate={handleCalculate}
                                            isLoading={isTrafficPending}
                                            hasSelectedZone={!!selectedZone}
                                            defaultValues={formData}
                                        />
                                    )}

                                    {calculationType === "population" && (
                                        <FormulairePopulationCalculate
                                            onCalculate={handleCalculate}
                                            isLoading={isPopulationPending}
                                            hasSelectedZone={!!selectedZone}
                                            defaultValues={formData}
                                        />
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Affichage des résultats */}
                        {showResults && calculationType === "channels" && (
                            <ResultsChannelCalculate
                                result={result}
                                chartData={chartData}
                                aiAnalysis={aiAnalysis}
                                isLoading={isPending}
                                error={isError ? (error as Error) : null}
                            />
                        )}

                        {showResults && calculationType === "blocking" && (
                            <ResultsBlockingCalculate
                                result={result}
                                chartData={chartData}
                                aiAnalysis={aiAnalysis}
                                isLoading={isBlockingPending}
                                error={blockingError}
                            />
                        )}

                        {showResults && calculationType === "traffic" && (
                            <ResultsTrafficCalculate
                                result={result}
                                chartData={chartData}
                                aiAnalysis={aiAnalysis}
                                isLoading={isTrafficPending}
                                error={trafficError}
                            />
                        )}

                        {showResults && calculationType === "population" && (
                            <ResultsPopulationCalculate
                                result={result}
                                chartData={chartData}
                                aiAnalysis={aiAnalysis}
                                isLoading={isPopulationPending}
                                error={populationError}
                                population={Number(formData.population) || 0}
                                callRate={Number(formData.call_rate) || 0}
                                avgDuration={Number(formData.avg_duration) || 0}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}