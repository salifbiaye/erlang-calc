"use client"

import {
    Plus,
    TrendingUp,
    Users,
    Radio,
    BarChart3,
    MapPin,
    Target,
} from "lucide-react"
import HeaderDashboard from "@/features/dashboard/header-dashboard";
import TitleDashboard from "@/features/dashboard/title-dashboard";
import StatsDashboard from "@/features/dashboard/stats-dashboard";
import ActionsDashboard from "@/features/dashboard/actions-dashboard";
import RecentsDashboard from "@/features/dashboard/recents-dashboard";

const stats = [
    {
        title: "Simulations totales",
        value: "24",
        change: "+12%",
        trend: "up",
        icon: Radio,
        color: "from-blue-500 to-cyan-500",
        bgColor: "bg-blue-50 dark:bg-blue-500/10",
        textColor: "text-blue-600 dark:text-blue-400",
    },
    {
        title: "Canaux optimisés",
        value: "1,247",
        change: "+8%",
        trend: "up",
        icon: TrendingUp,
        color: "from-emerald-500 to-teal-500",
        bgColor: "bg-emerald-50 dark:bg-emerald-500/10",
        textColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
        title: "Zones analysées",
        value: "18",
        change: "+3",
        trend: "up",
        icon: MapPin,
        color: "from-purple-500 to-pink-500",
        bgColor: "bg-purple-50 dark:bg-purple-500/10",
        textColor: "text-purple-600 dark:text-purple-400",
    },
    {
        title: "Efficacité moyenne",
        value: "94.2%",
        change: "+2.1%",
        trend: "up",
        icon: Target,
        color: "from-orange-500 to-red-500",
        bgColor: "bg-orange-50 dark:bg-orange-500/10",
        textColor: "text-orange-600 dark:text-orange-400",
    },
]

const recentSimulations = [
    {
        id: "1",
        name: "Centre-ville Paris",
        type: "Calcul de canaux",
        status: "completed",
        date: "Il y a 2h",
        channels: 52,
        blocking: 1.3,
        efficiency: 94.5,
        starred: true,
        zone: "Paris 1er",
    },
    {
        id: "2",
        name: "Quartier La Défense",
        type: "Trafic supporté",
        status: "running",
        date: "Il y a 5h",
        channels: 38,
        blocking: 2.1,
        efficiency: 87.2,
        starred: false,
        zone: "La Défense",
    },
    {
        id: "3",
        name: "Aéroport CDG Terminal 2",
        type: "Population",
        status: "completed",
        date: "Hier",
        channels: 78,
        blocking: 1.9,
        efficiency: 91.8,
        starred: true,
        zone: "CDG T2",
    },
    {
        id: "4",
        name: "Campus Université",
        type: "Taux de blocage",
        status: "completed",
        date: "Il y a 2 jours",
        channels: 24,
        blocking: 1.5,
        efficiency: 89.3,
        starred: false,
        zone: "Jussieu",
    },
]

const quickActions = [
    {
        title: "Nouveau calcul",
        description: "Démarrer une simulation",
        icon: Plus,
        href: "/calculate",
        gradient: "from-blue-500 to-cyan-500",
        iconBg: "bg-blue-500",
    },
    {
        title: "Mes simulations",
        description: "Voir toutes mes simulations",
        icon: BarChart3,
        href: "/simulations",
        gradient: "from-emerald-500 to-teal-500",
        iconBg: "bg-emerald-500",
    },
    {
        title: "Simulations partagées",
        description: "Collaborations d'équipe",
        icon: Users,
        href: "/simulations/shared",
        gradient: "from-purple-500 to-pink-500",
        iconBg: "bg-purple-500",
    },
]


export default function DashboardPage() {


    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed":
                return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
            case "running":
                return "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
            case "error":
                return "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
            default:
                return "bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400"
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case "completed":
                return "Terminé"
            case "running":
                return "En cours"
            case "error":
                return "Erreur"
            default:
                return "Inconnu"
        }
    }

    const getEfficiencyColor = (efficiency: number) => {
        if (efficiency >= 90) return "text-emerald-600 dark:text-emerald-400"
        if (efficiency >= 80) return "text-amber-600 dark:text-amber-400"
        return "text-red-600 dark:text-red-400"
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <div className="flex flex-col dark:bg-white/5">

                {/* En-tête avec le logo et le titre */}
                <HeaderDashboard/>

                <div className="flex-1 space-y-8 p-6 ">

                    {/* En-tête avec salutation */}
                    <TitleDashboard/>

                    {/* Statistiques avec design amélioré */}
                    <StatsDashboard stats={stats}/>

                    <div className="grid gap-6 lg:grid-cols-1">
                        {/* Actions rapides */}
                        <ActionsDashboard quickActions={quickActions} />

                        {/* Simulations récentes */}
                        <RecentsDashboard recentSimulations={recentSimulations} getStatusText={getStatusText} getStatusColor={getStatusColor} getEfficiencyColor={getEfficiencyColor} />
                    </div>


                </div>
            </div>
        </div>
    )
}
