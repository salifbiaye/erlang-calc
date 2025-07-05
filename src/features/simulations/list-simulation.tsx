import { ChevronRight, Circle, Star } from "lucide-react";
import { Simulation, getSimulationTypeInfo } from "./use-simulations";
import { useAuthStore } from "@/store/auth.store";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ListSimulationProps {
  simulations: Simulation[];
  onToggleFavorite: (simulation: Simulation) => Promise<{ success: boolean }>;
}

export default function ListSimulation({ 
  simulations, 
  onToggleFavorite
}: ListSimulationProps) {
  const currentUser = useAuthStore((state) => state.user);
  const router = useRouter();
  
  // Fonction pour obtenir les initiales d'un nom
  const getInitials = (name?: string) => {
    if (!name) return 'US';
    const parts = name.trim().split(' ');
    if (parts.length === 0) return 'US';
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
  };

  // Fonction pour obtenir l'image ou les initiales d'un utilisateur
  const getUserAvatar = (simulation: Simulation) => {
    const isCurrentUser = currentUser?.id === simulation.userId;
    
    // Si c'est l'utilisateur courant, utiliser ses informations
    if (isCurrentUser && currentUser) {
      return {
        image: currentUser.image,
        initials: getInitials(currentUser.name || currentUser.email),
        name: 'Vous',
        isCurrentUser: true
      };
    }
    
    // Sinon, utiliser les informations de l'utilisateur de la simulation
    return {
      image: simulation.user?.image || null,
      initials: getInitials(simulation.user?.name || simulation.userId),
      name: simulation.user?.name || simulation.userId,
      isCurrentUser: false
    };
  };

  return (
    <div className="space-y-3">
      {simulations.map((simulation) => {
        const typeInfo = getSimulationTypeInfo(simulation.type);
        const { image, initials, name, isCurrentUser } = getUserAvatar(simulation);
        
        return (
          <div
            key={simulation.id}
            className="bg-muted/30 dark:bg-slate-800/30 border dark:border-slate-700/50 rounded-lg p-4 hover:bg-muted/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
            onClick={() => router.push(`/simulations/${simulation.id}`)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="flex items-center gap-3">
                  <Circle className={`w-2 h-2 ${typeInfo.color}`}/>
                  <span className="text-foreground font-medium">{simulation.zoneDisplayName || 'Sans zone'}</span>
                  <span className="text-muted-foreground">/</span>
                  <span className="text-muted-foreground capitalize">{simulation.type.toLowerCase()}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(simulation);
                    }}
                    className="hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        simulation.isFavorite
                          ? "fill-yellow-500 text-yellow-500"
                          : "text-muted-foreground hover:text-yellow-500"
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div 
                className="flex items-center gap-4"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/simulations/${simulation.id}`);
                }}
              >
                <ChevronRight className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors"/>

                <div className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center overflow-hidden border bg-muted"
                    title={name}
                  >
                    {image ? (
                      <Image 
                        src={image} 
                        alt={initials} 
                        width={24} 
                        height={24}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs font-medium text-foreground">
                        {initials}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {isCurrentUser ? 'Vous' : name}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-2 ml-6">
              <p className="text-xs text-muted-foreground">
                {new Date(simulation.createdAt).toLocaleDateString()}
                {" • "}
                {simulation.type === 'CHANNELS' 
                  ? `${simulation.formData?.traffic_intensity?.toFixed(2) || 'N/A'} Erlangs`
                  : simulation.type === 'BLOCKING'
                  ? `${simulation.formData?.channels || 'N/A'} canaux`
                  : simulation.type === 'TRAFFIC'
                  ? `${simulation.formData?.blocking_prob || 'N/A'}% de blocage`
                  : 'Calcul de population'}
                {" • "}
                {simulation.result}% de {simulation.type === 'CHANNELS' ? 'canaux requis' : simulation.type === 'BLOCKING' ? 'blocage' : 'trafic'}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
