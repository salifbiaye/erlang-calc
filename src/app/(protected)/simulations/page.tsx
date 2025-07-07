"use client"

import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSimulations, type Simulation, useToggleFavorite } from "@/features/simulations/use-simulations";
import HeaderSimulation from "@/features/simulations/header-simulation";
import FilterSimulation from "@/features/simulations/filter-simulation";
import ListSimulation from "@/features/simulations/list-simulation";
import PaginationSimulation from "@/features/simulations/pagination-simulation";
import LegendSimulation from "@/features/simulations/legend-simulation";

export default function SimulationsPage() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "favorites">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [starFilter, setStarFilter] = useState<string>("all");
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Récupérer les simulations avec filtrage et pagination
  const { data: simulationsData, isLoading, isError } = useSimulations({
    page: currentPage,
    limit: itemsPerPage,
    favoritesOnly: activeTab === 'favorites',
    search: searchTerm
  });

  // Mettre à jour les totaux quand les données changent
  useEffect(() => {
    if (simulationsData?.pagination) {
      setTotalItems(simulationsData.pagination.total);
      setTotalPages(simulationsData.pagination.totalPages);
      
      // Si la page actuelle est supérieure au nombre total de pages, on se met sur la dernière page
      if (currentPage > simulationsData.pagination.totalPages) {
        setCurrentPage(simulationsData.pagination.totalPages || 1);
      }
    }
  }, [simulationsData, currentPage]);

  // Réinitialiser à la première page quand on change le nombre d'éléments par page
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  // Transformer les données pour correspondre à l'interface Simulation
  const formattedSimulations: Simulation[] = simulationsData?.data?.map(sim => ({
    ...sim,
    zoneDisplayName: sim.zoneDisplayName || 'Sans zone',
    formData: sim.formData || {},
    chartData: sim.chartData || [],
    aiAnalysis: sim.aiAnalysis || ''
  })) || [];

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };


  const { mutate: toggleFavorite } = useToggleFavorite();

  const handleToggleFavorite = async (simulation: Simulation): Promise<{ success: boolean }> => {
    return new Promise((resolve) => {
      // Inverser l'état actuel du favori
      const newFavoriteStatus = !simulation.isFavorite;
      
      // Mettre à jour l'état local immédiatement pour un retour visuel instantané
      queryClient.setQueryData(
        ['simulations', { page: currentPage, limit: itemsPerPage, favoritesOnly: activeTab === 'favorites', search: searchTerm }],
        (oldData: any) => {
          if (!oldData) return oldData;
          
          return {
            ...oldData,
            data: oldData.data.map((s: Simulation) => 
              s.id === simulation.id ? { ...s, isFavorite: newFavoriteStatus } : s
            )
          };
        }
      );
      
      // Appeler la mutation pour mettre à jour le favori
      toggleFavorite(
        { simulationId: simulation.id, isFavorite: newFavoriteStatus },
        {
          onSuccess: () => {
            resolve({ success: true });
          },
          onError: (error) => {
            console.error('Erreur lors de la mise à jour des favoris:', error);
            
            // En cas d'erreur, remettre l'état précédent
            queryClient.setQueryData(
              ['simulations', { page: currentPage, limit: itemsPerPage, favoritesOnly: activeTab === 'favorites', search: searchTerm }],
              (oldData: any) => {
                if (!oldData) return oldData;
                
                return {
                  ...oldData,
                  data: oldData.data.map((s: Simulation) => 
                    s.id === simulation.id ? { ...s, isFavorite: simulation.isFavorite } : s
                  )
                };
              }
            );
            
            resolve({ success: false });
          }
        }
      );
    });
  };

  // Filtrer les simulations selon les critères (côté client pour les filtres qui ne sont pas gérés par l'API)
  const filteredSimulations = formattedSimulations.filter((simulation) => {
    // Vérifier le filtre des favoris (si non géré par l'API)
    const matchesStarFilter = 
      starFilter === "all" || 
      (starFilter === "starred" && simulation.isFavorite) ||
      (starFilter === "unstarred" && !simulation.isFavorite);
    
    return matchesStarFilter;
  });

  if (isLoading) {
    return (
      <div className="flex flex-col w-full min-h-screen dark:bg-white/5 h-full">
        <HeaderSimulation />
        <div className="flex-1 p-6 overflow-auto">
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  if (isError) {
    return (
      <div className="flex flex-col dark:bg-white/5 min-h-screen h-full">
        <HeaderSimulation  />
        <div className="flex-1 p-6 overflow-auto">
          <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md">
            Une erreur est survenue lors du chargement des simulations. Veuillez réessayer plus tard.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col dark:bg-white/5 min-h-screen h-full">
      <HeaderSimulation  />
      
      <div className="flex-1 p-6 overflow-auto">
        <div className="space-y-6">
          <FilterSimulation 
            starFilter={starFilter}
            onStarFilterChange={setStarFilter}
            searchTerm={searchTerm}
            onSearchChange={handleSearch}
            filteredSimulations={filteredSimulations}
          />
          
          {filteredSimulations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucune simulation trouvée</p>
            </div>
          ) : (
            <>
              <ListSimulation 
                simulations={filteredSimulations} 
                onToggleFavorite={handleToggleFavorite}
              />
              

                <div className="mt-6">
                  <PaginationSimulation 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    itemsPerPage={itemsPerPage}
                    totalItems={totalItems}
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange}
                  />
                </div>

              
              <div className="mt-8">
                <LegendSimulation />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
