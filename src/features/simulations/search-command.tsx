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
import { Calculator, FileText, LayoutDashboard, MessageSquare, Settings2, Share2 } from "lucide-react"
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
            <Command className="rounded-lg bg-gray-800">
                <CommandInput 
                    placeholder="Rechercher ..." 
                    className="h-9 "
                    onFocus={() => setOpen(true)}
                />
            </Command>

            <CommandDialog open={open} onOpenChange={setOpen} className="dark:bg-gray-900">
                <CommandInput placeholder="Tapez une commande ou recherchez..." />
                <CommandList>
                    <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
                    <CommandGroup heading="Navigation">
                        {routes.map((route) => (
                            <CommandItem
                                key={route.url}
                                onSelect={() => {
                                    router.push(route.url)
                                    setOpen(false)
                                }}
                            >
                                <route.icon className="mr-2 h-4 w-4" />
                                <div>
                                    <div className="font-medium">{route.title}</div>
                                    <div className="text-sm text-muted-foreground">
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