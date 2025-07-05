import {Radio, TrendingUp, Users, Zap} from "lucide-react";

export interface ZoneData {
    display_name: string
    lat: number
    lon: number
}

export const calculationTypes = [
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


export const zonePresets: Record<string, any> = {
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