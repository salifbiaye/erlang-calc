import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Activity, Eye, MoreHorizontal, Plus, Radio, Users} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

interface RecentsDashboardProps {
    recentSimulations: Array<{
        id: string
        name: string
        type: string
        zone: string
        channels: number
        blocking: number
        efficiency: number
        status: string
        date: string
    }>
    getStatusText: (status: string) => string
    getStatusColor: (status: string) => string
    getEfficiencyColor: (efficiency: number) => string
}

export default function RecentsDashboard({ 
    recentSimulations,
    getStatusText,
    getStatusColor,
    getEfficiencyColor
}: RecentsDashboardProps) {
    return (
        <Card className="border bg-white dark:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                    <Activity className="h-5 w-5 text-primary dark:text-primary/80"/>
                    Simulations récentes
                </CardTitle>
                <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="bg-transparent hover:bg-primary/5 dark:hover:bg-primary/10"
                >
                    <a href="/simulations">Voir tout</a>
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {recentSimulations.map((simulation) => (
                        <div
                            key={simulation.id}
                            className="group flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary/30 dark:hover:border-primary/20 hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                                    <Radio className="h-6 w-6 text-primary dark:text-primary/80"/>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <p className="font-semibold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary/90">
                                            {simulation.name}
                                        </p>
                                        <Badge variant="secondary" className="text-xs bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary/80">
                                            {simulation.zone}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                        {simulation.type}
                                    </p>
                                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full"/>
                                            {simulation.channels} canaux
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full"/>
                                            {simulation.blocking}% blocage
                                        </span>
                                        <span className={`flex items-center gap-1 font-medium ${getEfficiencyColor(simulation.efficiency)}`}>
                                            {simulation.efficiency}% efficacité
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-right">
                                    <Badge className={`${getStatusColor(simulation.status)} border-0`}>
                                        {getStatusText(simulation.status)}
                                    </Badge>
                                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                        {simulation.date}
                                    </p>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <MoreHorizontal className="h-4 w-4"/>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48">
                                        <DropdownMenuItem className="flex items-center gap-2">
                                            <Eye className="h-4 w-4"/>
                                            Voir les détails
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="flex items-center gap-2">
                                            <Plus className="h-4 w-4"/>
                                            Dupliquer
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="flex items-center gap-2">
                                            <Users className="h-4 w-4"/>
                                            Partager
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}