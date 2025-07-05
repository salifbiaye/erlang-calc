"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {CalculateBlockingRequest, calculateBlockingSchema} from "@/schemas/calculate-blocking-schema";
import {FormValues} from "@/schemas/calculate-blocking-schema";

interface FormulaireParametreCalculateProps {
    onCalculate: (data: CalculateBlockingRequest) => void;
    isLoading: boolean;
    hasSelectedZone: boolean;
    defaultValues?: {
        num_channels?: string | number;
        traffic_load?: string | number;

    };
}

export function FormulaireBlockingCalculate({
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
        resolver: zodResolver(calculateBlockingSchema),
        defaultValues: {
            calculationType: 'blocking',
            num_channels: defaultValues.num_channels?.toString() || '',
            traffic_load: defaultValues.traffic_load?.toString() || '',

        },
    });

    const onSubmit = (data: FormValues) => {
        onCalculate({
            calculationType: 'blocking',
            num_channels: Number(data.num_channels),
            traffic_load: Number(data.traffic_load),
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <Label htmlFor="num_channels">Nombre de canaux</Label>
                <Input
                    id="num_channels"
                    type="number"
                    step="0.1"
                    min="0"
                    {...register('num_channels')}
                />
                {errors.num_channels && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.num_channels.message}
                    </p>
                )}
            </div>

            <div>
                <Label htmlFor="traffic_load">Traffic erlang</Label>
                <Input
                    id="traffic_load"
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    {...register('traffic_load')}
                />
                {errors.traffic_load && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.traffic_load.message}
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