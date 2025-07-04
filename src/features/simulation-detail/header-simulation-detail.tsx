import {SidebarTrigger} from "@/components/ui/sidebar";
import {Separator} from "@/components/ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import SearchCommand from "@/features/simulations/search-command";
import ThemeToggler from "@/components/theme-toggle";

export default function HeaderSimulationDetail({    simulationData}:{ simulationData: { name: string } }) {
    return (
    <header className="flex h-16 shrink-0 dark:bg-gray-900/30 bg-muted items-center gap-4 border-border px-6">
        <SidebarTrigger className="-ml-1"/>

        <div className="flex-1 flex items-center justify-between">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/simulations" className="text-slate-400 hover:text-white">
                            Simulations
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbPage className="dark:text-white">{simulationData.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-2">
                <SearchCommand/>
                <ThemeToggler/>
            </div>
        </div>
    </header>
)
}