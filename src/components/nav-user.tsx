"use client"

import { BadgeCheck, Bell, ChevronsUpDown, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { useAuthStore } from "@/store/auth.store"

export function NavUser() {
    const { user, isAuthenticated } = useAuthStore()
    const router = useRouter()
    const { isMobile } = useSidebar()
    
    if (!isAuthenticated || !user) {
        return null
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="hover:bg-white/10 hover:text-white data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg bg-white/10">
                                <AvatarImage src={user.image || ''} alt={user.name || 'User'} />
                                <AvatarFallback className="rounded-lg bg-white/10">
                                    {user.name ? 
                                      (() => {
                                        const names = user.name.split(" ");
                                        const firstInitial = names[0]?.charAt(0)?.toUpperCase() || '';
                                        const secondInitial = names[1]?.charAt(0)?.toUpperCase() || '';
                                        return firstInitial + (secondInitial || firstInitial);
                                      })() 
                                      : user.email?.charAt(0).toUpperCase() || 'U'
                                    }
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{user.name || user.email}</span>
                                <span className="truncate text-xs">{user.email}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg bg-white/10">
                                <AvatarImage src={user.image || ''} alt={user.name || 'User'} />
                                    <AvatarFallback className="rounded-lg bg-white/10">
                                        {user.name ? 
                                          (() => {
                                            const names = user.name.split(" ");
                                            const firstInitial = names[0]?.charAt(0)?.toUpperCase() || '';
                                            const secondInitial = names[1]?.charAt(0)?.toUpperCase() || '';
                                            return firstInitial + (secondInitial || firstInitial);
                                          })() 
                                          : user.email?.charAt(0).toUpperCase() || 'U'
                                        }
                                    </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium text-gray-900 dark:text-white">
                                    {user.name || user.email}
                                </span>
                                <span className="truncate text-xs text-gray-500 dark:text-gray-400">
                                    {user.email}
                                </span>
                            </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-800" />

                        <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-800" />
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="text-gray-700 dark:text-gray-300 focus:bg-gray-100 dark:focus:bg-gray-800">
                                <BadgeCheck className="mr-2 h-4 w-4" />
                                Account
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-gray-700 dark:text-gray-300 focus:bg-gray-100 dark:focus:bg-gray-800">
                                <Bell className="mr-2 h-4 w-4" />
                                Notifications
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-800" />
                        <DropdownMenuItem 
                            className="text-gray-700 dark:text-gray-300 focus:bg-gray-100 dark:focus:bg-gray-800"
                            onClick={() => router.push('/logout')}
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Déconnexion
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
