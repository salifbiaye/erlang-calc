"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

interface ZoneData {
  lat: number;
  lon: number;
  display_name: string;
}

interface InteractiveMapProps {
  selectedZone: ZoneData | null;
  className?: string;
}

// Composant qui sera chargé dynamiquement
const Map = dynamic(
  () => import("./map").then((mod) => mod.Map),
  {
    ssr: false,
    loading: () => (
      <div className="animate-pulse bg-slate-200 dark:bg-slate-800 rounded-lg w-full h-full flex items-center justify-center">
        <p className="text-slate-500 dark:text-slate-400">Chargement de la carte...</p>
      </div>
    ),
  }
)

export function InteractiveMap({ selectedZone, className = "h-[400px]" }: InteractiveMapProps) {
  return (
    <div className={className}>
      <Map selectedZone={selectedZone} />
    </div>
  )
}
