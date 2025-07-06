"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculatePopulationSchema, type FormValues, type CalculatePopulationRequest } from "@/schemas/calculate-population-schema";
import { useCallback } from "react";

// Ce composant est un composant client uniquement
// Tous les gestionnaires d'événements sont correctement mémoïsés

interface FormulairePopulationCalculateProps {
  onCalculate: (data: CalculatePopulationRequest) => void;
  isLoading: boolean;
  hasSelectedZone: boolean;
  defaultValues?: {
    population?: string | number;
    call_rate?: string | number;
    avg_duration?: string | number;
  };
}

export function FormulairePopulationCalculate({
  onCalculate, 
  isLoading,
  hasSelectedZone,
  defaultValues = {}
}: FormulairePopulationCalculateProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(calculatePopulationSchema),
    defaultValues: {
      calculationType: 'population',
      population: defaultValues.population?.toString() || '',
      call_rate: defaultValues.call_rate?.toString() || '0.3',
      avg_duration: defaultValues.avg_duration?.toString() || '2.5',
    },
  });

  const onSubmit = useCallback((data: FormValues) => {
    onCalculate({
      calculationType: 'population',
      population: Number(data.population),
      call_rate: Number(data.call_rate),
      avg_duration: Number(data.avg_duration),
    });
  }, [onCalculate]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label className={"py-4"}  htmlFor="population">Population</Label>
        <Input
          id="population"
          type="number"
          step="1000"
          min="0"
          placeholder="ex: 25000"
          {...register('population')}
          className="mt-1"
        />
        {errors.population && (
          <p className="mt-1 text-sm text-red-500">
            {errors.population.message}
          </p>
        )}
      </div>

      <div>
        <Label className={"py-4"}  htmlFor="call_rate">Taux d'appel (appels/personne/heure)</Label>
        <Input
          id="call_rate"
          type="number"
          step="0.1"
          min="0"
          max="10"
          placeholder="ex: 0.3"
          {...register('call_rate')}
          className="mt-1"
        />
        {errors.call_rate && (
          <p className="mt-1 text-sm text-red-500">
            {errors.call_rate.message}
          </p>
        )}
      </div>

      <div>
        <Label className={"py-4"}  htmlFor="avg_duration">Durée moyenne d'appel (minutes)</Label>
        <Input
          id="avg_duration"
          type="number"
          step="0.1"
          min="0.1"
          max="60"
          placeholder="ex: 2.5"
          {...register('avg_duration')}
          className="mt-1"
        />
        {errors.avg_duration && (
          <p className="mt-1 text-sm text-red-500">
            {errors.avg_duration.message}
          </p>
        )}
      </div>

      <Button 
        type="submit" 
        disabled={isLoading || !hasSelectedZone} 
        className="w-full"
        title={!hasSelectedZone ? "Veuillez sélectionner une zone sur la carte" : ""}
      >
        {isLoading ? 'Calcul en cours...' : 'Calculer la charge de trafic'}
      </Button>
    </form>
  );
}
