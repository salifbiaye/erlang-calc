"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton,
} from "@/components/ui/sidebar"

export function NavMain({
                            items,
                        }: {
    items: {
        title: string
        url: string
        icon?: LucideIcon
        items?: {
            title: string
            url: string
        }[]
    }[]
}) {
    const pathname = usePathname()

    return (
        <SidebarGroup>
            <SidebarGroupLabel className={"text-white"}>Platforme</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const isActive = pathname === item.url || item.items?.some(subItem => subItem.url === pathname)
                    
                    return (
                    <Collapsible
                        key={item.title}
                        asChild
                            defaultOpen={isActive}
                        className="group/collapsible"
                    >
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton 
                                        tooltip={item.title} 
                                        className={`text-white hover:text-white hover:bg-white/10 ${
                                            isActive ? "bg-white/10 font-medium" : ""
                                        }`}
                                    >
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {item.items?.map((subItem) => {
                                            const isSubItemActive = pathname === subItem.url
                                            
                                            return (
                                                <SidebarMenuSubItem key={subItem.title}>
                                                    <SidebarMenuSubButton 
                                                        asChild 
                                                        className={`text-white hover:text-white hover:bg-white/10 ${
                                                            isSubItemActive ? "bg-white/10 font-medium" : ""
                                                        }`}
                                                    >
                                                        <Link href={subItem.url}>
                                                    <span>{subItem.title}</span>
                                                        </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                            )
                                        })}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                    )
                })}
            </SidebarMenu>
        </SidebarGroup>
    )
}
