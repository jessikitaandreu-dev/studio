'use server';

import { personalizedAdventureRecommendation } from '@/ai/flows/personalized-adventure-recommendation';
import type { PersonalizedAdventureRecommendationInput, PersonalizedAdventureRecommendationOutput } from '@/ai/flows/personalized-adventure-recommendation';
import { z } from 'zod';

const formSchema = z.object({
  riskLevel: z.string(),
  landscapePreferences: z.string(),
  equipmentNeeds: z.string(),
  groupDynamic: z.string(),
  priceRange: z.string(),
  availability: z.string(),
});

type RecommendationState = {
  data: PersonalizedAdventureRecommendationOutput | null;
  error: string | null;
};

export async function personalizedAdventureRecommendationAction(
  prevState: RecommendationState,
  formData: PersonalizedAdventureRecommendationInput
): Promise<RecommendationState> {
  
  const validatedFields = formSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      data: null,
      error: 'Datos del formulario no válidos. Por favor, inténtalo de nuevo.',
    };
  }

  try {
    const result = await personalizedAdventureRecommendation(validatedFields.data);
    return { data: result, error: null };
  } catch (error) {
    console.error('Error getting personalized recommendation:', error);
    return {
      data: null,
      error: 'No se pudo obtener una recomendación. Por favor, inténtalo más tarde.',
    };
  }
}
