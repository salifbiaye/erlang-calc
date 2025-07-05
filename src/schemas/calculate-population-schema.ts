import { z } from 'zod';

// Schéma pour les valeurs du formulaire (toujours des chaînes)
export const calculatePopulationSchema = z.object({
    calculationType: z.literal('population'),
    population: z.string()
        .min(1, "La population est requise")
        .refine(val => !isNaN(Number(val)) && Number(val) > 0, {
            message: "Veuillez entrer un nombre valide et positif"
        }),
    call_rate: z.string()
        .min(1, "Le taux d'appel est requis")
        .refine(val => {
            const num = Number(val);
            return !isNaN(num) && num >= 0 && num <= 10;
        }, {
            message: "Le taux d'appel doit être entre 0 et 10"
        }),
    avg_duration: z.string()
        .min(1, "La durée moyenne est requise")
        .refine(val => {
            const num = Number(val);
            return !isNaN(num) && num > 0 && num <= 60;
        }, {
            message: "La durée moyenne doit être entre 0 et 60 minutes"
        })
});

// Type pour les valeurs du formulaire
export type FormValues = z.infer<typeof calculatePopulationSchema>;

// Type pour la requête de calcul (avec des nombres)
export interface CalculatePopulationRequest {
    calculationType: 'population';
    population: number;
    call_rate: number;
    avg_duration: number;
    selectedZone?: {
        lat: number;
        lon: number;
        display_name: string;
    };
}
