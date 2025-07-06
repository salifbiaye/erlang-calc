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




    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <div className="flex flex-col dark:bg-white/5">

                {/* En-tête avec le logo et le titre */}
                <HeaderDashboard/>

                <div className="flex-1 space-y-8 p-6 ">

                    {/* En-tête avec salutation */}
                    <TitleDashboard/>

                    {/* Statistiques avec design amélioré */}
                    <StatsDashboard />

                    <div className="grid gap-6 lg:grid-cols-1">
                        {/* Actions rapides */}
                        <ActionsDashboard quickActions={quickActions} />

                        {/* Simulations récentes */}
                        <RecentsDashboard   className={"dark:bg-gray-900/20"} />
                    </div>


                </div>
            </div>
        </div>
    )
}