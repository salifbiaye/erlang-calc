"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, Radio, Zap, TrendingUp, Users, BarChart3, MapPin } from "lucide-react"

import { InteractiveMap } from "@/components/interactive-map"
import HeaderCalculate from "@/features/calculate/header-calculate";
import TitleCalculate from "@/features/calculate/title-calculate";
import ZoneSearchCalculate from "@/features/calculate/zone-search-calculate";
import FormulaireParametreCalculate from "@/features/calculate/formulaire-parametre-calculate";
import MapInteractiveCalculate from "@/features/calculate/map-interactive-calculate";
import ResultsCalculate from "@/features/calculate/results-calculate";

interface ZoneData {
    display_name: string;
    lat: number;
    lon: number;
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
    const [showResults, setShowResults] = useState(false)

    const currentCalculation = calculationTypes.find((calc) => calc.id === calculationType)

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

    const handleInputChange = (fieldId: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [fieldId]: value,
        }))
    }

    const handleCalculate = () => {
        setShowResults(true)
    }

    const getResultValue = () => {
        switch (calculationType) {
            case "channels":
                return "42"
            case "blocking":
                return "1.8%"
            case "traffic":
                return "38.5"
            case "population":
                return "35"
            default:
                return "--"
        }
    }

    const getResultUnit = () => {
        switch (calculationType) {
            case "channels":
                return "canaux"
            case "blocking":
                return "taux de blocage"
            case "traffic":
                return "erlangs"
            case "population":
                return "canaux"
            default:
                return ""
        }
    }

    return (
        <div className="min-h-screen bg-white dark:bg-white/5 dark:text-white">
            <div className="flex flex-col">

                {/* En-tête de la page */}
                <HeaderCalculate/>

                <div className="flex-1 p-4 md:p-6">

                    {/* Titre de la page */}
                   <TitleCalculate/>

                    {/* Sélection de zone en haut */}
                    <ZoneSearchCalculate 
                        initialZone={selectedZone}
                        onZoneChange={setSelectedZone}
                    />

                    {/* Carte interactive */}
                    <MapInteractiveCalculate selectedZone={selectedZone} />

                    <div className="grid gap-6 lg:grid-cols-2  ">

                        {/* Formulaire de paramètres */}
                        <FormulaireParametreCalculate calculationTypes={calculationTypes} calculationType={calculationType} setCalculationType={setCalculationType} currentCalculation={currentCalculation} formData={formData} setFormData={setFormData} handleInputChange={handleInputChange} handleCalculate={handleCalculate} selectedZone={selectedZone} />



                        {/* Aperçu des résultats */}
                        <ResultsCalculate calculationType={calculationType} selectedZone={selectedZone} showResults={showResults} currentCalculation={currentCalculation} getResultValue={getResultValue} getResultUnit={getResultUnit} />

                    </div>
                </div>
            </div>
        </div>
    )
}
