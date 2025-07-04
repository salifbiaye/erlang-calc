"use client"

import * as React from "react"


import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader, SidebarMenuButton,
    SidebarRail,
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

const data = {
    user: {
        name: "salifbiaye",
        email: "salif@example.com",
        avatar: "/avatars/salif.jpg",
    },

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
                {
                    title: "Partager avec moi",
                    url: "/simulations/share",
                    icon: Share2,
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
                    url: "/settings",
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



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar className={"dark:border-gray-900/70 text-white "} collapsible="icon" {...props}>
            <SidebarHeader className={"dark:bg-gray-900/70 bg-brand-950"}>
                <SidebarMenuButton className="flex items-center bg-white/5 p-8 gap-2 hover:bg-white/5 hover:text-white">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg ">
                        <Signal className="h-5 w-5 text-white"/>
                    </div>
                    <span className="text-xl font-bold dark:text-white ">Erlang-Calc</span>
                </SidebarMenuButton>
            </SidebarHeader>
            <SidebarContent className={"dark:bg-gray-900/70 bg-brand-950 text-white"}>
                <NavMain items={data.navMain}/>
                <NavProjects projects={data.projects}/>
            </SidebarContent>
            <SidebarFooter className={"dark:bg-gray-900/70 bg-brand-950 text-white"}>
                <NavUser user={data.user}/>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
