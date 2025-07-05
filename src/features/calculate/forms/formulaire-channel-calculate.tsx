"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateChannelSchema, type FormValues, type CalculateChannelRequest } from "@/schemas/calculate-channel.schema";

interface FormulaireParametreCalculateProps {
  onCalculate: (data: CalculateChannelRequest) => void;
  isLoading: boolean;
  hasSelectedZone: boolean;
  defaultValues?: {
    traffic_intensity?: string | number;
    blocking_prob?: string | number;
  };
}

export function FormulaireChannelCalculate({
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
    resolver: zodResolver(calculateChannelSchema),
    defaultValues: {
      calculationType: 'channels',
      traffic_intensity: defaultValues.traffic_intensity?.toString() || '',
      blocking_prob: defaultValues.blocking_prob?.toString() || '',
    },
  });

  const onSubmit = (data: FormValues) => {
    onCalculate({
      calculationType: 'channels',
      traffic_intensity: Number(data.traffic_intensity),
      blocking_prob: Number(data.blocking_prob),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="traffic_intensity">Intensité du trafic (Erlangs)</Label>
        <Input
          id="traffic_intensity"
          type="number"
          step="0.1"
          min="0"
          {...register('traffic_intensity')}
        />
        {errors.traffic_intensity && (
          <p className="mt-1 text-sm text-red-500">
            {errors.traffic_intensity.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="blocking_prob">Probabilité de blocage (%)</Label>
        <Input
          id="blocking_prob"
          type="number"
          step="0.1"
          min="0"
          max="100"
          {...register('blocking_prob')}
        />
        {errors.blocking_prob && (
          <p className="mt-1 text-sm text-red-500">
            {errors.blocking_prob.message}
          </p>
        )}
      </div>

      <Button 
        type="submit" 
        className="w-full" 
        disabled={isLoading || !hasSelectedZone}
        aria-busy={isLoading}
        title={!hasSelectedZone ? "Veuillez sélectionner une zone sur la carte" : ""}
      >
        {isLoading ? "Calcul en cours..." : "Calculer"}
      </Button>
    </form>
  );
}