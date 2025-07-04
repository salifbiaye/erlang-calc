"use client"

import { useState } from "react"
import HeaderSimulation from "@/features/simulations/header-simulation";
import FilterSimulation from "@/features/simulations/filter-simulation";
import ListSimulation from "@/features/simulations/list-simulation";
import PaginationSimulation from "@/features/simulations/pagination-simulation";
import LegendSimulation from "@/features/simulations/legend-simulation";
import TitleSimulation from "@/features/simulations/title-simulation";



// Fonction pour déterminer la couleur selon le taux de blocage
const getStatusColor = (blockingRate: number | null, error?: boolean) => {
    if (error || blockingRate === null) {
        return "fill-red-500 text-red-500"
    }
    if (blockingRate <= 2.0) {
        return "fill-green-500 text-green-500"
    }
    if (blockingRate <= 3.0) {
        return "fill-yellow-500 text-yellow-500"
    }
    return "fill-red-500 text-red-500"
}

// Fonction pour déterminer le statut textuel
const getStatusText = (blockingRate: number | null, error?: boolean) => {
    if (error || blockingRate === null) {
        return "Erreur"
    }
    if (blockingRate <= 2.0) {
        return "Optimal"
    }
    if (blockingRate <= 3.0) {
        return "Acceptable"
    }
    return "À optimiser"
}

// Fonction pour basculer l'état "starred" d'une simulation
const toggleStar = (id: string) => {
    // Cette fonction serait normalement connectée à votre état global ou API
    console.log(`Toggle star for simulation ${id}`)
}

export default function SimulationsPage() {

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 4
    const [starFilter, setStarFilter] = useState<string>("all")
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const simulations = [
        {
            id: "1",
            zone: "Manhattan Centre",
            simulationName: "Analyse Réseau Principal",
            blockingRate: 1.8,
            channels: 45,
            date: "Calculé il y a 1 minute",
            user: { name: "PA", initials: "PA" },
            starred: false,
        },
        {
            id: "2",
            zone: "Brooklyn Heights",
            simulationName: "Couverture Suburbaine",
            blockingRate: 2.5,
            channels: 32,
            date: "En cours depuis 5 minutes",
            user: { name: "KO", initials: "KO" },
            starred: false,
        },
        {
            id: "3",
            zone: "Aéroport JFK",
            simulationName: "Capacité Terminal",
            blockingRate: 5.2,
            channels: 78,
            date: "Calculé il y a 8 minutes",
            user: { name: "JE", initials: "JE" },
            starred: true,
        },
        {
            id: "4",
            zone: "Autoroute I-95",
            simulationName: "Corridor Routier",
            blockingRate: 2.3,
            channels: 38,
            date: "Calculé il y a 3 minutes",
            user: { name: "OB", initials: "OB" },
            starred: false,
        },
        {
            id: "5",
            zone: "Centre Commercial",
            simulationName: "Zone Commerciale",
            blockingRate: 1.5,
            channels: 28,
            date: "Calculé il y a 12 jours",
            user: { name: "JE", initials: "JE" },
            starred: true,
        },
        {
            id: "6",
            zone: "Campus Columbia",
            simulationName: "Réseau Universitaire",
            blockingRate: null,
            channels: 0,
            date: "Échec il y a 2 minutes",
            user: { name: "JE", initials: "JE" },
            starred: false,
            error: true,
        },
        {
            id: "7",
            zone: "Times Square",
            simulationName: "Zone Touristique",
            blockingRate: 3.1,
            channels: 65,
            date: "Calculé il y a 30 minutes",
            user: { name: "PA", initials: "PA" },
            starred: true,
        },
        {
            id: "8",
            zone: "Wall Street",
            simulationName: "District Financier",
            blockingRate: 1.2,
            channels: 52,
            date: "Calculé il y a 1 heure",
            user: { name: "KO", initials: "KO" },
            starred: false,
        },
    ]
    const filteredSimulations = simulations.filter((simulation) => {
        const starMatch =
            starFilter === "all" ||
            (starFilter === "starred" && simulation.starred) ||
            (starFilter === "unstarred" && !simulation.starred)

        const statusMatch =
            statusFilter === "all" ||
            (statusFilter === "optimal" &&
                !simulation.error &&
                simulation.blockingRate !== null &&
                simulation.blockingRate <= 2.0) ||
            (statusFilter === "acceptable" &&
                !simulation.error &&
                simulation.blockingRate !== null &&
                simulation.blockingRate > 2.0 &&
                simulation.blockingRate <= 3.0) ||
            (statusFilter === "problematic" &&
                !simulation.error &&
                simulation.blockingRate !== null &&
                simulation.blockingRate > 3.0) ||
            (statusFilter === "error" && simulation.error)

        return starMatch && statusMatch
    })
    const totalPages = Math.ceil(filteredSimulations.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedSimulations = filteredSimulations.slice(startIndex, startIndex + itemsPerPage)



    return (
        <div className="min-h-screen bg-white dark:bg-white/5 text-gray-900 dark:text-white">
            <div className="flex">
                <div className="flex-1">
                    <HeaderSimulation title={"simulations partagées"} />

                    <div className="flex">
                        <div className="flex-1 p-6">

                            {/* Titre de la page */}
                            <TitleSimulation/>

                            {/* Filtres */}
                            <FilterSimulation filteredSimulations={filteredSimulations} setStarFilter={setStarFilter} setStatusFilter={setStatusFilter} starFilter={starFilter} statusFilter={statusFilter}/>

                            {/* Liste des simulations */}
                            <ListSimulation paginatedSimulations={paginatedSimulations} toggleStar={toggleStar} getStatusColor={getStatusColor} getStatusText={getStatusText}/>

                            {/* Pagination */}
                            <PaginationSimulation totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} filteredSimulations={filteredSimulations}/>

                            {/* Légende des couleurs */}
                            <LegendSimulation/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
