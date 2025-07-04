import { useRouter } from "next/navigation"
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command"
import { Calculator, FileText, LayoutDashboard,  Settings2, Share2 } from "lucide-react"
import { useState } from "react"

const routes = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        description: "Vue d'ensemble de l'application"
    },
    {
        title: "Calculer",
        url: "/calculate",
        icon: Calculator,
        description: "Calculer un coût"
    },
    {
        title: "Simulations",
        url: "/simulations",
        icon: FileText,
        description: "Gérer mes simulations"
    },
    {
        title: "Simulations partagées",
        url: "/simulations/share",
        icon: Share2,
        description: "Voir les simulations partagées"
    },
    {
        title: "Paramètres",
        url: "/settings",
        icon: Settings2,
        description: "Gérer mon profil et mes préférences"
    }
]

export default function SearchCommand() {
    const router = useRouter()
    const [open, setOpen] = useState(false)

    return (
        <>
            <Command className="rounded-lg bg-gray-100 dark:bg-gray-800">
                <CommandInput 
                    placeholder="Rechercher ..." 
                    className="h-9 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                    onFocus={() => setOpen(true)}
                />
            </Command>

            <CommandDialog open={open} onOpenChange={setOpen} className="bg-white dark:bg-gray-900">
                <CommandInput 
                    placeholder="Tapez une commande ou recherchez..." 
                    className="text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
                <CommandList className="text-gray-900 dark:text-white">
                    <CommandEmpty className="text-gray-500 dark:text-gray-400">
                        Aucun résultat trouvé.
                    </CommandEmpty>
                    <CommandGroup heading="Navigation" className="text-gray-700 dark:text-gray-300">
                        {routes.map((route) => (
                            <CommandItem
                                key={route.url}
                                onSelect={() => {
                                    router.push(route.url)
                                    setOpen(false)
                                }}
                                className="focus:bg-gray-100 dark:focus:bg-gray-800"
                            >
                                <route.icon className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                                <div>
                                    <div className="font-medium text-gray-900 dark:text-white">
                                        {route.title}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        {route.description}
                                    </div>
                                </div>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}