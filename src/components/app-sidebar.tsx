"use client"

import * as React from "react"


import { NavMain } from "@/components/nav-main"
import { NavFavorites } from "@/components/nav-favorites"
import { NavUser } from "@/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader, SidebarMenuButton,
    SidebarRail, useSidebar,
} from "@/components/ui/sidebar"

// This is sample data.


import {
    LayoutDashboard,
    Calculator,
    FileText,
    Settings2,
    Share2,
    MessageSquare,
    MapPinned, Signal,
} from "lucide-react"
import {cn} from "@/lib/utils";






export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { state } = useSidebar()
    const isCollapsed = state === "collapsed"
    const data = {


        navMain: [
            {
                title: "Dashboard",
                url: "/dashboard",
                icon: LayoutDashboard,
                items: [
                    {
                        title: "Vue d'ensemble",
                        url: "/dashboard",
                    },
                ],
            },
            {
                title: "Calculer",
                url: "/calculate",
                icon: Calculator,
                items: [
                    {
                        title: "Calculer un coût",
                        url: "/calculate",
                    },
                ],
            },
            {
                title: "Simulations",
                url: "/simulations",
                icon: FileText,
                items: [
                    {
                        title: "Mes simulations",
                        url: "/simulations",
                    },

                ],
            },
            {
                title: "Paramètres",
                url: "/settings",
                icon: Settings2,
                items: [
                    {
                        title: "Mon profil",
                        url: "/settings/profile",
                    },
                    {
                        title: "Sécurité",
                        url: "/settings/security",
                    },
                    {
                        title: "Préférences",
                        url: "/settings/preferences",
                    },
                ],
            },
        ],
        projects: [
            {
                name: "Simulation Pikine",
                url: "/simulations/abc123",
                icon: MapPinned,
            },
            {
                name: "Simulation Rufisque",
                url: "/simulations/xyz456",
                icon: MessageSquare,
            },
        ],
    }

    return (
        <Sidebar className={"dark:border-gray-900/70 text-white "} collapsible="icon" {...props}>
            <SidebarHeader className={"dark:bg-gray-900/70 bg-brand-950"}>
                <SidebarMenuButton className={cn("flex items-center border-b border-gray-700  p-8 gap-2 hover:bg-white/5 hover:text-white", !isCollapsed ? "rounded-none" :"rounded-lg border-none bg-primary")}>
                    <div className={cn("flex h-8 w-8 items-center  justify-center rounded-lg ",!isCollapsed ? " bg-primary" : "bg-transparent")}>
                        <Signal className="h-5 w-5 text-white"/>
                    </div>
                    <div className={"flex flex-col"}>
                        <span className="text-lg font-bold dark:text-white  ">Erlang-Calc</span>
                        <span className="text-xs text-gray-400 hidden md:inline-block"> simulations & calculs</span>
                    </div>
                </SidebarMenuButton>
            </SidebarHeader>
            <SidebarContent className={"dark:bg-gray-900/70 bg-brand-950 text-white"}>
                <NavMain items={data.navMain}/>
                <NavFavorites />
            </SidebarContent>
            <SidebarFooter className={"dark:bg-gray-900/70 bg-brand-950 text-white"}>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
