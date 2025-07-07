
import {SidebarTrigger} from "@/components/ui/sidebar";
import {
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import SearchCommand from "@/features/simulations/search-command";
import ThemeToggler from "@/components/theme-toggle";

export default function HeaderSettings() {
    return (
        <header className="flex h-16 shrink-0 dark:bg-gray-900/30 bg-muted items-center gap-4 border-border px-6">
            <SidebarTrigger className="-ml-1"/>

            <div className="flex-1 flex items-center justify-between">
                <BreadcrumbPage className={"truncate"}>
                    paramètres
                </BreadcrumbPage>
                <div className="flex items-center p-2 gap-2">
                    <SearchCommand/>

                </div>
            </div>
        </header>
    )
} 