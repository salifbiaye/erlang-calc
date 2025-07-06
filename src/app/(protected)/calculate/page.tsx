"use client"

import {useState, useEffect, useCallback} from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, Radio, Zap, TrendingUp, Users, Save } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
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
import simulationLogger from "@/services/simulation.logger"
import { useCreateSimulation } from "@/services/simulation-create.service";

type CalculationType = 'channels' | 'blocking' | 'traffic' | 'population';

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
        setChartData([])
        setAiAnalysis("")
    }, [calculationType])

    const [showResults, setShowResults] = useState(false)

    // États pour les résultats du calcul
    const [result, setResult] = useState<number | null>(null)
    const [chartData, setChartData] = useState<any[]>([])
    const [aiAnalysis, setAiAnalysis] = useState<string>("")
    const [currentFormData, setCurrentFormData] = useState<Record<string, any>>({})
    const [currentCalculationType, setCurrentCalculationType] = useState<CalculationType>("channels")

    const currentCalculation = calculationTypes.find((calc) => calc.id === calculationType)
    const { mutate: calculate, isPending, error, isError } = useCalculateChannels()
    const { mutate: calculateBlocking, isPending: isBlockingPending, error: blockingError, isError: isBlockingError } = useCalculateBlocking()
    const { mutate: calculateTraffic, isPending: isTrafficPending, error: trafficError, isError: isTrafficError } = useCalculateTraffic()
    const { mutate: calculatePopulation, isPending: isPopulationPending, error: populationError, isError: isPopulationError } = useCalculatePopulation()

    const { mutate: createSimulation, isPending: isSaving } = useCreateSimulation()

    const handleCalculate = useCallback((data: {
      calculationType: string;
      traffic_intensity?: number | string;
      blocking_prob?: number | string;
      num_channels?: number | string;
      traffic_load?: number | string;
      population?: number | string;
      call_rate?: number | string;
      avg_duration?: number | string;
      available_channels?: number | string;
      target_blocking?: number | string;
      selectedZone?: ZoneData | undefined;
    }) => {
        console.log("Début du calcul avec les données:", data, "et zone sélectionnée:", selectedZone)
        if (data.calculationType === "channels") {
            console.log("Calcul des canaux avec les données suivantes:", {
                ...data,
                selectedZone: selectedZone || undefined
            });

            calculate(
                {
                    calculationType: "channels",
                    traffic_intensity: Number(data.traffic_intensity || 0),
                    blocking_prob: Number(data.blocking_prob || 0),
                    selectedZone: selectedZone || undefined
                },
                {
                    onSuccess: (response) => {
                        setResult(response.result)
                        setChartData(response.chartData)
                        setAiAnalysis(response.aiAnalysis)
                        setShowResults(true)
                        simulationLogger.log({
                            type: 'channels',
                            formData: data,
                            result: response.result,
                            chartData: response.chartData,
                            aiAnalysis: response.aiAnalysis || "",
                            zone: selectedZone
                        });
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
                    num_channels: Number(data.num_channels || 0),
                    traffic_load: Number(data.traffic_load || 0),
                    selectedZone: selectedZone || undefined
                },
                {
                    onSuccess: (response) => {
                        setResult(response.result)
                        setChartData(response.chartData)
                        setAiAnalysis(response.aiAnalysis)
                        setShowResults(true)
                        simulationLogger.log({
                            type: 'blocking',
                            formData: data,
                            result: response.result,
                            chartData: response.chartData,
                            aiAnalysis: response.aiAnalysis || "",
                            zone: selectedZone
                        });
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
                    available_channels: Number(data.available_channels || 0),
                    target_blocking: Number(data.target_blocking || 0),
                    selectedZone: selectedZone || undefined
                },
                {
                    onSuccess: (response) => {
                        setResult(response.result);
                        setChartData(response.chartData);
                        setAiAnalysis(response.aiAnalysis);
                        setShowResults(true);
                        simulationLogger.log({
                            type: 'traffic',
                            formData: data,
                            result: response.result,
                            chartData: response.chartData,
                            aiAnalysis: response.aiAnalysis || "",
                            zone: selectedZone
                        })
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
                        simulationLogger.log({
                            type: 'population',
                            formData: data,
                            result: response.result,
                            chartData: response.chartData,
                            aiAnalysis: response.aiAnalysis || "",
                            zone: selectedZone
                        })
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
    }, [selectedZone])

    const handleSubmit = useCallback((data: {
    calculationType: string;
    traffic_intensity?: string | number;
    blocking_prob?: string | number;
    num_channels?: string | number;
    traffic_load?: string | number;
    population?: string | number;
    call_rate?: string | number;
    avg_duration?: string | number;
    available_channels?: string | number;
    target_blocking?: string | number;
  }) => {
        setShowResults(false)
        setResult(null)
        setChartData([])
        setAiAnalysis("")
        setCurrentFormData(data)
        setCurrentCalculationType(data.calculationType as CalculationType)

        // On ne logue pas les soumissions de formulaire dans simulationLogger
        // car cela ne correspond pas au type SimulationLog attendu
        console.log('Formulaire soumis', data)

        // Création d'un objet avec les données du formulaire et la zone sélectionnée
        const formDataWithZone = {
            ...data,
            selectedZone: selectedZone || undefined
        };
        
        // Appel de handleCalculate avec les données combinées
        handleCalculate(formDataWithZone);
    }, [handleCalculate, selectedZone])

    const handleSaveSimulation = useCallback(() => {
        if (result === null || !showResults) return

        createSimulation({
            type: currentCalculationType.toUpperCase() as 'CHANNELS' | 'BLOCKING' | 'TRAFFIC' | 'POPULATION',
            formData: currentFormData,
            result,
            chartData,
            aiAnalysis: aiAnalysis || undefined,
            zone: selectedZone ? {
                lat: selectedZone.lat,
                lon: selectedZone.lon,
                display_name: selectedZone.display_name
            } : undefined
        })
    }, [result, chartData, aiAnalysis, currentFormData, currentCalculationType, selectedZone, createSimulation])

    const renderResults = () => {
        if (!showResults || result === null) return null

        const commonProps = {
            result,
            chartData,
            aiAnalysis,
            isLoading: false,
            error: null,
            // Propriétés supplémentaires requises par ResultsCalculateProps
            population: Number(currentFormData.population) || 0,
            callRate: Number(currentFormData.call_rate) || 0,
            avgDuration: Number(currentFormData.avg_duration) || 0,
            trafficIntensity: Number(currentFormData.traffic_intensity) || 0,
            blockingProbability: Number(currentFormData.blocking_prob) || 0,
            channels: Number(currentFormData.num_channels) || 0,
            calculationType: currentCalculationType
        }

        return (
            <div className="space-y-6">
                <div className="flex justify-end">
                    <Button 
                        onClick={handleSaveSimulation}
                        disabled={isSaving}
                        className="flex items-center gap-2"
                    >
                        <Save className="h-4 w-4" />
                        {isSaving ? 'Sauvegarde en cours...' : 'Sauvegarder la simulation'}
                    </Button>
                </div>
                
                {(() => {
                    switch (currentCalculationType) {
                        case "channels":
                            return <ResultsChannelCalculate {...commonProps} />
                        case "blocking":
                            return <ResultsBlockingCalculate {...commonProps} />
                        case "traffic":
                            return <ResultsTrafficCalculate {...commonProps} />
                        case "population":
                            return <ResultsPopulationCalculate {...commonProps} />
                        default:
                            return null
                    }
                })()}
            </div>
        )
    }

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

    return (
        <div className="min-h-screen  bg-white dark:bg-white/5 dark:text-white">
            <div className="flex   flex-col">
                {/* En-tête de la page */}
                <HeaderCalculate />

                <div className="flex-1 p-4 md:p-6   ">
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
                                            onCalculate={handleSubmit}
                                            isLoading={isPending}
                                            hasSelectedZone={!!selectedZone}
                                            defaultValues={formData}
                                        />
                                    )}

                                    {calculationType === "blocking" && (
                                        <FormulaireBlockingCalculate
                                            onCalculate={handleSubmit}
                                            isLoading={isBlockingPending}
                                            hasSelectedZone={!!selectedZone}
                                            defaultValues={formData}
                                        />
                                    )}

                                    {calculationType === "traffic" && (
                                        <FormulaireTrafficCalculate
                                            onCalculate={handleSubmit}
                                            isLoading={isTrafficPending}
                                            hasSelectedZone={!!selectedZone}
                                            defaultValues={formData}
                                        />
                                    )}

                                    {calculationType === "population" && (
                                        <FormulairePopulationCalculate
                                            onCalculate={handleSubmit}
                                            isLoading={isPopulationPending}
                                            hasSelectedZone={!!selectedZone}
                                            defaultValues={formData}
                                        />
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Affichage des résultats */}
                        {renderResults()}
                    </div>
                </div>
            </div>
        </div>
    )
}