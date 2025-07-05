"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateTrafficSchema, type FormValues, type CalculateTrafficRequest } from "@/schemas/calculate-traffic-schema";
import { useCallback } from "react";

// Ce composant est un composant client uniquement
// Tous les gestionnaires d'événements sont correctement mémoïsés

interface FormulaireParametreCalculateProps {
  onCalculate: (data: CalculateTrafficRequest) => void;
  isLoading: boolean;
  hasSelectedZone: boolean;
  defaultValues?: {
    available_channels?: string | number;
    target_blocking?: string | number;
  };
}

export function FormulaireTrafficCalculate({
  onCalculate, 
  isLoading,
  hasSelectedZone,
  defaultValues = {}
}: FormulaireParametreCalculateProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(calculateTrafficSchema),
    defaultValues: {
      calculationType: 'traffic',
      available_channels: defaultValues.available_channels?.toString() || '',
      target_blocking: defaultValues.target_blocking?.toString() || '',
    },
  });

  const onSubmit = useCallback((data: FormValues) => {
    const requestData: CalculateTrafficRequest = {
      calculationType: 'traffic',
      available_channels: Number(data.available_channels),
      target_blocking: Number(data.target_blocking),
    };
    onCalculate(requestData);
  }, [onCalculate]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="available_channels">Nombre de canaux disponibles</Label>
        <Input
          id="available_channels"
          type="number"
          step="1"
          min="1"
          placeholder="ex: 20"
          {...register('available_channels')}
          className="mt-1"
        />
        {errors.available_channels && (
          <p className="mt-1 text-sm text-red-500">
            {errors.available_channels.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="target_blocking">Taux de blocage cible (%)</Label>
        <Input
          id="target_blocking"
          type="number"
          step="0.01"
          min="0"
          max="100"
          placeholder="ex: 1.5"
          {...register('target_blocking')}
          className="mt-1"
        />
        {errors.target_blocking && (
          <p className="mt-1 text-sm text-red-500">
            {errors.target_blocking.message}
          </p>
        )}
      </div>

      <Button 
        type="submit" 
        disabled={isLoading || !hasSelectedZone} 
        className="w-full"
        title={!hasSelectedZone ? "Veuillez sélectionner une zone sur la carte" : ""}
      >
        {isLoading ? 'Calcul en cours...' : 'Calculer le trafic supporté'}
      </Button>
    </form>
  );
}
