"use client"

import { useRouter } from "next/navigation"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Calculator, FileText, LayoutDashboard, Settings2, Share2, Search } from "lucide-react"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"

const routes = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        description: "Vue d'ensemble de l'application",
        category: "Navigation",
    },
    {
        title: "Calculer",
        url: "/calculate",
        icon: Calculator,
        description: "Calculer un coût",
        category: "Navigation",
    },
    {
        title: "Simulations",
        url: "/simulations",
        icon: FileText,
        description: "Gérer mes simulations",
        category: "Navigation",
    },
    {
        title: "Simulations partagées",
        url: "/simulations/shared",
        icon: Share2,
        description: "Voir les simulations partagées",
        category: "Navigation",
    },
    {
        title: "Paramètres",
        url: "/settings",
        icon: Settings2,
        description: "Gérer mon profil et mes préférences",
        category: "Navigation",
    },
]

const quickActions = [
    {
        title: "Nouvelle simulation",
        url: "/calculate",
        description: "Créer une nouvelle simulation",
        category: "Actions rapides",
    },
    {
        title: "Voir les résultats récents",
        url: "/dashboard",
        description: "Accéder aux derniers calculs",
        category: "Actions rapides",
    },
]

export default function SearchCommand() {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState("")

    // Fermer avec Escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setOpen(false)
            }
            // Ouvrir avec Ctrl+K ou Cmd+K
            if ((e.ctrlKey || e.metaKey) && e.key === "k") {
                e.preventDefault()
                setOpen(true)
            }
        }

        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [])

    const allItems = [...routes, ...quickActions]

    return (
        <div className="relative w-full max-w-md">
            {/* Search Input */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 dark:text-slate-400" />
                <input
                    type="text"
                    placeholder="Search documentation..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setOpen(true)}
                    className="w-full h-10 pl-10 pr-16 dark:bg-slate-800/50 border dark:border-slate-700/50 rounded-lg dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 text-xs font-mono dark:bg-slate-700/50 dark:text-slate-400 rounded border dark:border-slate-600">
                        Ctrl
                    </kbd>
                    <kbd className="px-1.5 py-0.5 text-xs font-mono dark:bg-slate-700/50 dark:text-slate-400 rounded border dark:border-slate-600">
                        K
                    </kbd>
                </div>
            </div>

            {/* Dropdown Results */}
            {open && (
                <>
                    {/* Overlay pour fermer en cliquant à l'extérieur */}
                    <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

                    {/* Results Panel */}
                    <Card className="absolute top-full left-0 right-0 mt-2 z-50 dark:bg-slate-800/95 backdrop-blur-sm dark:border-slate-700/50 shadow-xl max-h-96 overflow-hidden">
                        <Command className="dark:bg-transparent">
                            <CommandList className="max-h-80 overflow-y-auto">
                                {query === "" ? (
                                    <>
                                        <CommandGroup heading="Navigation" className="dark:text-slate-400 text-xs font-medium px-3 py-2">
                                            {routes.map((route) => (
                                                <CommandItem
                                                    key={route.url}
                                                    onSelect={() => {
                                                        router.push(route.url)
                                                        setOpen(false)
                                                        setQuery("")
                                                    }}
                                                    className="flex items-center gap-3 px-3 py-2 dark:hover:bg-slate-700/50 cursor-pointer dark:text-white rounded-md mx-2"
                                                >
                                                    <route.icon className="h-4 w-4 text-slate-400" />
                                                    <div className="flex-1">
                                                        <div className="font-medium dark:text-white">{route.title}</div>
                                                        <div className="text-sm dark:text-slate-400">{route.description}</div>
                                                    </div>
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>

                                        <CommandGroup
                                            heading="Actions rapides"
                                            className="text-slate-400 text-xs font-medium px-3 py-2 border-t dark:border-slate-700/50"
                                        >
                                            {quickActions.map((action, index) => (
                                                <CommandItem
                                                    key={index}
                                                    onSelect={() => {
                                                        router.push(action.url)
                                                        setOpen(false)
                                                        setQuery("")
                                                    }}
                                                    className="flex items-center gap-3 px-3 py-2 dark:hover:bg-slate-700/50 cursor-pointer dark:text-white rounded-md mx-2"
                                                >
                                                    <div className="w-4 h-4 rounded bg-blue-500/20 flex items-center justify-center">
                                                        <div className="w-2 h-2 rounded-full bg-blue-400" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="font-medium dark:text-white">{action.title}</div>
                                                        <div className="text-sm dark:text-slate-400">{action.description}</div>
                                                    </div>
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </>
                                ) : (
                                    <>
                                        <CommandEmpty className="py-6 text-center dark:text-slate-400">
                                            Aucun résultat trouvé pour "{query}"
                                        </CommandEmpty>
                                        <CommandGroup>
                                            {allItems
                                                .filter(
                                                    (item) =>
                                                        item.title.toLowerCase().includes(query.toLowerCase()) ||
                                                        item.description.toLowerCase().includes(query.toLowerCase()),
                                                )
                                                .map((item) => (
                                                    <CommandItem
                                                        key={item.url}
                                                        onSelect={() => {
                                                            router.push(item.url)
                                                            setOpen(false)
                                                            setQuery("")
                                                        }}
                                                        className="flex items-center gap-3 px-3 py-2 dark:hover:bg-slate-700/50 cursor-pointer dark:text-white rounded-md mx-2"
                                                    >
                                                        {"icon" in item ? (
                                                            <item.icon className="h-4 w-4 dark:text-slate-400" />
                                                        ) : (
                                                            <div className="w-4 h-4 rounded bg-blue-500/20 flex items-center justify-center">
                                                                <div className="w-2 h-2 rounded-full bg-blue-400" />
                                                            </div>
                                                        )}
                                                        <div className="flex-1">
                                                            <div className="font-medium dark:text-white">{item.title}</div>
                                                            <div className="text-sm dark:text-slate-400">{item.description}</div>
                                                        </div>
                                                    </CommandItem>
                                                ))}
                                        </CommandGroup>
                                    </>
                                )}

                                {/* Go to Page option */}
                                <div className="border-t dark:border-slate-700/50 p-2">
                                    <div className="flex items-center gap-2 px-3 py-2 dark:text-slate-400 text-sm">
                                        <div className="flex items-center gap-1">
                                            <kbd className="px-1 py-0.5 text-xs dark:bg-slate-700/50 rounded">↵</kbd>
                                            <span>pour naviguer</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <kbd className="px-1 py-0.5 text-xs dark:bg-slate-700/50 rounded">esc</kbd>
                                            <span>pour fermer</span>
                                        </div>
                                    </div>
                                </div>
                            </CommandList>
                        </Command>
                    </Card>
                </>
            )}
        </div>
    )
}
