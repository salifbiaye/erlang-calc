import { z } from 'zod';

// Schéma pour les valeurs du formulaire (toujours des chaînes)
export const calculateBlockingSchema = z.object({
    calculationType: z.literal('blocking'),
    num_channels: z.string()
        .min(1, "Le nombre de canaux est requis")
        .refine(val => !isNaN(Number(val)), {
            message: "Veuillez entrer un nombre valide"
        })
        .refine(val => Number(val) >= 0, {
            message: "L'intensité du trafic doit être positive"
        }),
    traffic_load: z.string()
        .min(1, "La charge de trafic est requise")
        .refine(val => !isNaN(Number(val)), {
            message: "Veuillez entrer un nombre valide"
        })
        .refine(val => {
            const num = Number(val);
            return num >= 0 && num <= 100;
        }, {
            message: "La charge de trafic doit être entre 0 et 100"
        })


});

// Type pour les valeurs du formulaire
export type FormValues = z.infer<typeof calculateBlockingSchema>;

// Type pour la requête de calcul (avec des nombres)
export type CalculateBlockingRequest = {
    calculationType: 'blocking';
    num_channels: number;
    traffic_load: number;

};
