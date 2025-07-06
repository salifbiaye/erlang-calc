import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {Clock, BarChart3, Zap, Users} from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { simulationService } from "@/services/simulation.service"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

export interface SimulationItem {
  id: string;
  title: string;
  type: 'CHANNELS' | 'BLOCKING' | 'TRAFFIC' | 'POPULATION';
  date: string;
  result: string;
  status: 'completed' | 'pending' | 'failed';
}

interface RecentsDashboardProps {
  className?: string;
}

export default function RecentsDashboard({ className }: RecentsDashboardProps) {
  const { data: simulationsData, isLoading, isError } = useQuery({
    queryKey: ['recent-simulations'],
    queryFn: () => simulationService.getSimulations({ limit: 5, page: 1 }),
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const getSimulationResult = (simulation: any) => {
    switch (simulation.type) {
      case 'CHANNELS':
        return `${simulation.result} canaux`;
      case 'TRAFFIC':
        return `${simulation.result} Gbps`;
      case 'BLOCKING':
        return `${simulation.result}% blocage`;
      case 'POPULATION':
        return `${simulation.result} utilisateurs`;
      default:
        return 'N/A';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'CHANNELS':
        return <BarChart3 className="h-4 w-4 text-blue-500" />;
      case 'TRAFFIC':
        return <Zap className="h-4 w-4 text-purple-500" />;
      case 'BLOCKING':
        return <Zap className="h-4 w-4 text-amber-500" />;
      case 'POPULATION':
        return <Users className="h-4 w-4 text-emerald-500" />;
      default:
        return <BarChart3 className="h-4 w-4 text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
              <Clock className="h-5 w-5 text-primary" />
              Simulations récentes
            </CardTitle>
            <Link
              href="/simulations"
              className="text-sm font-medium text-primary hover:underline"
            >
              Voir tout
            </Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-lg">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (isError || !simulationsData?.data) {
    return (
      <Card className={className}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
              <Clock className="h-5 w-5 text-primary" />
              Simulations récentes
            </CardTitle>
            <Link
              href="/simulations"
              className="text-sm font-medium text-primary hover:underline"
            >
              Voir tout
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            Impossible de charger les simulations récentes
          </div>
        </CardContent>
      </Card>
    );
  }

  const simulations = simulationsData.data.map(sim => ({
    id: sim.id,
    title: sim.zoneDisplayName || 'Sans zone',
    type: sim.type,
    date: sim.createdAt,
    result: getSimulationResult(sim),
    status: 'completed',
  }));

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <Clock className="h-5 w-5 text-primary" />
            Simulations récentes
          </CardTitle>
          <Link
            href="/simulations"
            className="text-sm font-medium text-primary hover:underline"
          >
            Voir tout
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {simulations.length > 0 ? (
          simulations.map((simulation) => (
            <Link
              key={simulation.id}
              href={`/simulations/${simulation.id}`}
              className="group flex items-center gap-4 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary/30 dark:hover:border-primary/20 hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors"
            >
              <div className="h-10 w-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                {getTypeIcon(simulation.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 dark:text-white truncate">
                  {simulation.title}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="truncate">{simulation.result}</span>
                  <span>•</span>
                  <span>{formatDate(simulation.date)}</span>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(simulation.status)}`}>
                {simulation.status === 'completed' ? 'Terminé' : 
                 simulation.status === 'pending' ? 'En cours' : 'Échoué'}
              </span>
            </Link>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            Aucune simulation récente
          </div>
        )}
      </CardContent>
    </Card>
  );
}
