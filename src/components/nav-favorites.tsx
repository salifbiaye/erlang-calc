"use client"

import { Star, StarOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { useFavorites } from "@/hooks/use-favorites"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

export function NavFavorites() {
  const { favorites, isLoading, toggleFavorite } = useFavorites()
  const router = useRouter()
  const { isMobile } = useSidebar()

  if (isLoading) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel className="text-white">Favoris</SidebarGroupLabel>
        <div className="flex justify-center p-4">
          <Loader2 className="h-4 w-4 animate-spin text-white" />
        </div>
      </SidebarGroup>
    )
  }

  if (favorites.length === 0) {
    return null
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="text-white">Favoris</SidebarGroupLabel>
      <SidebarMenu>
        {favorites.map((simulation) => (
          <SidebarMenuItem key={simulation.id}>
            <SidebarMenuButton
              className="group flex w-full items-center justify-between text-white hover:bg-white/10"
              onClick={() => router.push(`/simulations/${simulation.id}`)}
            >
              <span className="truncate">
                {simulation.zoneDisplayName || simulation.name || '...'}
              </span>
              <span
                role="button"
                tabIndex={0}
                className="inline-flex h-6 w-6 items-center justify-center rounded-md text-yellow-400 hover:bg-transparent hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleFavorite(simulation)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    toggleFavorite(simulation)
                  }
                }}
              >
                <Star className="h-4 w-4 fill-current" />
                <span className="sr-only">Retirer des favoris</span>
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
