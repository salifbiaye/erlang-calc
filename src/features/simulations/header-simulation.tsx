import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import SearchCommand from "@/features/simulations/search-command";
import ThemeToggler from "@/components/theme-toggle";

interface HeaderSimulationProps {
    title?: string;
}

export default function HeaderSimulation({title = "Mes simulations "}: HeaderSimulationProps) {
  return (
    <header className="flex h-16 shrink-0 dark:bg-gray-900/30 bg-muted items-center gap-4 border-border px-6">
      <SidebarTrigger className="-ml-1" />

      <div className="flex-1 flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-foreground truncate">
                 Simulations
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center p-2 gap-2">
          <SearchCommand />

        </div>
      </div>
    </header>
  );
}
