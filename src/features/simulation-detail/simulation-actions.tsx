'use client';

import { Button } from '@/components/ui/button';
import { Download, Loader2, Star, StarOff, Trash2 } from 'lucide-react';
import { useFavorites } from '@/hooks/use-favorites';
import { favoriteService } from '@/services/favorite-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { simulationService } from '@/services/simulation.service';
import { useRouter } from 'next/navigation';
import { notify } from '@/lib/notifications';
import { useCallback } from 'react';
import { PdfExportButton } from '@/components/pdf/PdfExportButton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';

interface SimulationActionsProps {
  simulationId: string;
  simulationName?: string;
  simulation?: any;
}

export function SimulationActions({ simulationId, simulationName, simulation }: SimulationActionsProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const isSimulationFavorite = isFavorite(simulationId);

  // Mutation pour supprimer une simulation
  const deleteMutation = useMutation({
    mutationFn: () => simulationService.deleteSimulation(simulationId),
    onSuccess: () => {
      // Invalider le cache des simulations
      queryClient.invalidateQueries({ queryKey: ['simulations'] });
      
      // Afficher une notification de succès
      notify.success('Simulation supprimée', {
        description: 'La simulation a été supprimée avec succès.'
      });
      
      // Rediriger vers la liste des simulations après un court délai
      setTimeout(() => {
        router.push('/simulations');
      }, 1000);
    },
    onError: (error: Error) => {
      notify.error('Erreur', {
        description: error.message || 'Une erreur est survenue lors de la suppression de la simulation.'
      });
    },
  });

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteMutation.mutate();
    setIsDeleteDialogOpen(false);
  };


  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-yellow-400 hover:bg-yellow-400/10 hover:text-yellow-300"
          onClick={() => simulation && toggleFavorite(simulation)}
          title={isSimulationFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        >
          {isSimulationFavorite ? (
            <Star className="h-5 w-5 fill-current" />
          ) : (
            <StarOff className="h-5 w-5" />
          )}
          <span className="sr-only">
            {isSimulationFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          </span>
        </Button>

        <PdfExportButton 
          simulation={{
            ...simulation,
            type: simulation?.type || 'CHANNELS',
            formData: simulation?.formData || {},
            result: simulation?.result || 0,
            chartData: simulation?.chartData || [],
            aiAnalysis: simulation?.aiAnalysis || '',
            createdAt: simulation?.createdAt || new Date().toISOString(),
            updatedAt: simulation?.updatedAt || new Date().toISOString(),
          }}
          simulationName={simulationName}
        />
      </div>
      
      <Button
        variant="destructive"
        size="sm"
        onClick={handleDeleteClick}
        disabled={deleteMutation.isPending}
        className="flex items-center gap-2"
      >
        {deleteMutation.isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Suppression...</span>
          </>
        ) : (
          <>
            <Trash2 className="h-4 w-4" />
            <span>Supprimer</span>
          </>
        )}
      </Button>

      <AlertDialog  open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className={"dark:bg-gray-900"}>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Voulez-vous vraiment supprimer la simulation "{simulationName}" ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteMutation.isPending}>
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmDelete}
              disabled={deleteMutation.isPending}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Suppression...
                </>
              ) : (
                'Supprimer définitivement'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
