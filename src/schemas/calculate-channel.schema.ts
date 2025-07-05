import { z } from 'zod';

// Schéma pour les valeurs du formulaire (toujours des chaînes)
export const calculateChannelSchema = z.object({
  calculationType: z.literal('channels'),
  traffic_intensity: z.string()
    .min(1, "L'intensité du trafic est requise")
    .refine(val => !isNaN(Number(val)), {
      message: "Veuillez entrer un nombre valide"
    })
    .refine(val => Number(val) >= 0, {
      message: "L'intensité du trafic doit être positive"
    }),
  
  blocking_prob: z.string()
    .min(1, "La probabilité de blocage est requise")
    .refine(val => !isNaN(Number(val)), {
      message: "Veuillez entrer un nombre valide"
    })
    .refine(val => {
      const num = Number(val);
      return num >= 0 && num <= 100;
    }, {
      message: "La probabilité de blocage doit être entre 0 et 100"
    })
});

// Type pour les valeurs du formulaire
export type FormValues = z.infer<typeof calculateChannelSchema>;

// Type pour la requête de calcul (avec des nombres)
export type CalculateChannelRequest = {
  calculationType: 'channels';
  traffic_intensity: number;
  blocking_prob: number;
  selectedZone?: {
    lat: number;
    lon: number;
    display_name: string;
  } | undefined;
};
