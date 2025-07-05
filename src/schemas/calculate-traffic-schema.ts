import { z } from 'zod';

// Schéma pour les valeurs du formulaire (toujours des chaînes)
export const calculateTrafficSchema = z.object({
    calculationType: z.literal('traffic'),
    available_channels: z.string()
        .min(1, "Le nombre de canaux disponibles est requis")
        .refine(val => !isNaN(Number(val)), {
            message: "Veuillez entrer un nombre valide"
        })
        .refine(val => Number(val) > 0, {
            message: "Le nombre de canaux doit être positif"
        }),
    target_blocking: z.string()
        .min(1, "Le taux de blocage cible est requis")
        .refine(val => !isNaN(Number(val)), {
            message: "Veuillez entrer un nombre valide"
        })
        .refine(val => {
            const num = Number(val);
            return num >= 0 && num <= 100;
        }, {
            message: "Le taux de blocage doit être entre 0 et 100"
        })
});

// Type pour les valeurs du formulaire
export type FormValues = z.infer<typeof calculateTrafficSchema>;

// Type pour la requête de calcul (avec des nombres)
export interface CalculateTrafficRequest {
    calculationType: 'traffic';
    available_channels: number;
    target_blocking: number;
}
