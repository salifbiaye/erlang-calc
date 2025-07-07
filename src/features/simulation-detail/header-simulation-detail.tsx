import { SidebarTrigger } from "@/components/ui/sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import SearchCommand from "@/features/simulations/search-command"
import ThemeToggler from "@/components/theme-toggle"
import Link from "next/link"
import {truncate} from "@/lib/utils";
import {useIsMobile} from "@/hooks/use-mobile";

interface HeaderSimulationDetailProps {
  simulationName: string
}

export default function HeaderSimulationDetail({ simulationName }: HeaderSimulationDetailProps) {

const isMobile = useIsMobile();
  return (
    <header className="flex h-16 shrink-0 dark:bg-gray-900/30 bg-muted items-center gap-4 border-border px-6">
      <SidebarTrigger className="-ml-1" />

      <div className="flex-1 flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href="/simulations" className="text-muted-foreground hover:text-foreground transition-colors">
                Simulations
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              {
                isMobile ? (
                    <BreadcrumbPage className="text-foreground truncate ">{truncate(simulationName, 5)}</BreadcrumbPage>
                ) : (
                    <BreadcrumbPage className="text-foreground truncate ">{truncate(simulationName, 90)}</BreadcrumbPage>
                )
              }

            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center p-2 gap-2">
          <SearchCommand />
          <ThemeToggler />
        </div>
      </div>
    </header>
  )
}