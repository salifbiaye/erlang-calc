import { SidebarProvider,  } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className={"w-full h-full dark:bg-gray-900  "}>
                    {children}
            </main>
        </SidebarProvider>
    )
}