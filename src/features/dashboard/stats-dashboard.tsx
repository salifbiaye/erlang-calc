import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Radio, MapPin, Target } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { dashboardService, SimulationStat } from "@/services/dashboard.service"
import { Skeleton } from "@/components/ui/skeleton"

const getStatConfig = (type: string) => {
  switch (type) {
    case 'CHANNELS':
      return {
        title: 'Simulations de canaux',
        icon: Radio,
        color: 'from-blue-500 to-cyan-500',
        bgColor: 'bg-blue-50 dark:bg-blue-500/10',
        textColor: 'text-blue-600 dark:text-blue-400',
      };
    case 'TRAFFIC':
      return {
        title: 'Analyses de trafic',
        icon: TrendingUp,
        color: 'from-purple-500 to-pink-500',
        bgColor: 'bg-purple-50 dark:bg-purple-500/10',
        textColor: 'text-purple-600 dark:text-purple-400',
      };
    case 'BLOCKING':
      return {
        title: 'Taux de blocage',
        icon: Target,
        color: 'from-amber-500 to-orange-500',
        bgColor: 'bg-amber-50 dark:bg-amber-500/10',
        textColor: 'text-amber-600 dark:text-amber-400',
      };
    case 'POPULATION':
      return {
        title: 'Analyses de population',
        icon: MapPin,
        color: 'from-emerald-500 to-teal-500',
        bgColor: 'bg-emerald-50 dark:bg-emerald-500/10',
        textColor: 'text-emerald-600 dark:text-emerald-400',
      };
    default:
      return {
        title: 'Inconnu',
        icon: Radio,
        color: 'from-gray-500 to-gray-600',
        bgColor: 'bg-gray-50 dark:bg-gray-800',
        textColor: 'text-gray-600 dark:text-gray-400',
      };
  }
};

export default function StatsDashboard() {
  const { data: statsResponse, isLoading, isError } = useQuery<ApiResponse>({
    queryKey: ['simulation-stats'],
    queryFn: () => dashboardService.getSimulationStats(),
  });

  // Récupérer les données de l'API ou utiliser un tableau vide
  const statsData = statsResponse?.data.data || [];
  
  // Créer un objet avec les statistiques par type
  const statsByType: Record<string, SimulationStat> = {};
  statsData.forEach((stat:SimulationStat) => {
    if (stat && stat.type) {
      statsByType[stat.type] = stat;
    }
  });

  // Valeurs par défaut pour chaque type de statistique
  const defaultStats: Record<string, SimulationStat> = {
    CHANNELS: { type: 'CHANNELS', count: 0 },
    TRAFFIC: { type: 'TRAFFIC', count: 0 },
    BLOCKING: { type: 'BLOCKING', count: 0 },
    POPULATION: { type: 'POPULATION', count: 0 },
  };

  // Fusionner avec les valeurs de l'API
  const stats = {
    CHANNELS: statsByType['CHANNELS'] || defaultStats.CHANNELS,
    TRAFFIC: statsByType['TRAFFIC'] || defaultStats.TRAFFIC,
    BLOCKING: statsByType['BLOCKING'] || defaultStats.BLOCKING,
    POPULATION: statsByType['POPULATION'] || defaultStats.POPULATION,
  };

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Object.keys(defaultStats).map((type) => (
          <Card key={type} className={"dark:bg-gray-900/20"}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 " />
              <Skeleton className="h-4 w-20 mt-1 " />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Object.entries(defaultStats).map(([type]) => {
          const config = getStatConfig(type);
          const Icon = config.icon;
          
          return (
            <Card key={type} className={"dark:bg-gray-900/20"}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {config.title}
                </CardTitle>
                <div className={`h-10 w-10 rounded-full ${config.bgColor} flex items-center justify-center`}>
                  <Icon className={`h-5 w-5 ${config.textColor}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">-</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Données non disponibles
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Object.entries(stats).map(([type, stat]) => {
        const config = getStatConfig(type);
        const Icon = config.icon;
        
        return (
          <Card key={type} className="dark:bg-gray-900/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {config.title}
              </CardTitle>
              <div className={`h-10 w-10 rounded-full ${config.bgColor} flex items-center justify-center`}>
                <Icon className={`h-5 w-5 ${config.textColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.count}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {stat.count === 1 ? 'simulation' : 'simulations'}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
