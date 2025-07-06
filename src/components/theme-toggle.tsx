"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export default function ThemeToggler() {
    const [mounted, setMounted] = React.useState(false)
    const { theme, setTheme } = useTheme()

    // Effet pour indiquer que le composant est monté (côté client uniquement)
    React.useEffect(() => {
        setMounted(true)
    }, [])

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    // Ne rien afficher pendant le rendu côté serveur pour éviter les erreurs d'hydratation
    if (!mounted) {
        return (
            <Button
                variant="default"
                size="icon"
                className="rounded-full p-4 relative overflow-hidden"
                aria-label="Changer de thème"
            >
                <div className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Changer de thème</span>
            </Button>
        )
    }

    return (
        <div className="flex items-center justify-center">
            <Button
                variant="default"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full p-4 relative overflow-hidden"
                aria-label="Changer de thème"
            >
                {theme === "dark" ? (
                    <div key="moon" className="absolute">
                        <Moon className="h-[1.2rem] w-[1.2rem]" />
                    </div>
                ) : (
                    <div key="sun" className="absolute">
                        <Sun className="h-[1.2rem] w-[1.2rem]" />
                    </div>
                )}
                <span className="sr-only">Changer de thème</span>
            </Button>
        </div>
    )
}