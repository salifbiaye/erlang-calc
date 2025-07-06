"use client"

import { useEffect, useRef } from "react"
import { MapPin } from "lucide-react"

interface Zone {
    display_name: string
    lat: string
    lon: string
    place_id: string
    type: string
    importance: number
}

interface InteractiveMapProps {
    className?: string
}

export function InteractiveMap({  className }: InteractiveMapProps) {
    const mapRef = useRef<HTMLDivElement>(null)
    const mapInstanceRef = useRef<any>(null)


    useEffect(() => {
        // Simulation d'une carte interactive avec OpenStreetMap
        // En production, vous utiliseriez react-leaflet ici
        if (mapRef.current && !mapInstanceRef.current) {
            // Initialisation de la carte simulée
            mapInstanceRef.current = true
        }
    }, [])

    return (
        <div className={`relative ${className}`}>
            <div
                ref={mapRef}
                className="w-full h-full dark:bg-slate-700/30 rounded-lg border dark:border-slate-600 overflow-hidden relative"
            >
                {/* Simulation de la carte avec un fond de grille */}
                <div className="absolute inset-0 bg-gradient-to-br dark:from-slate-600/20 dark:to-slate-800/40 from-gray-100 to-white">
                    {/* Grille de fond pour simuler une carte */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
                            {Array.from({ length: 96 }).map((_, i) => (
                                <div key={i} className="border border-slate-500/20" />
                            ))}
                        </div>
                    </div>

                    {/* Overlay avec des "routes" simulées */}
                    <svg className="absolute inset-0 w-full h-full opacity-20">
                        <path d="M 0 50 Q 100 30 200 50 T 400 50" stroke="#64748b" strokeWidth="2" fill="none" />
                        <path d="M 50 0 Q 70 100 50 200 T 50 400" stroke="#64748b" strokeWidth="2" fill="none" />
                        <path d="M 150 0 Q 170 100 150 200 T 150 400" stroke="#64748b" strokeWidth="2" fill="none" />
                    </svg>


                        <div
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                            style={{
                                left: "50%",
                                top: "50%",
                            }}
                        >

                        </div>


                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center text-slate-400">
                                <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">Sélectionnez une zone pour voir sa position</p>
                            </div>
                        </div>

                </div>


                <div className="absolute bottom-2 right-2 dark:bg-slate-800/80 text-xs dark:text-slate-300 px-2 py-1 rounded">
                    Bienvenue sur la carte interactive
                </div>
            </div>
        </div>
    )
}
