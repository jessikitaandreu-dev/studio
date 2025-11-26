/**
 * @fileOverview Type definitions for the personalizedAdventureRecommendation flow.
 */
import { z } from 'genkit';

export const PersonalizedAdventureRecommendationInputSchema = z.object({
  riskLevel: z
    .string()
    .describe('The preferred risk level of the excursion (e.g., low, medium, high).'),
  landscapePreferences: z
    .string()
    .describe('The preferred types of landscapes (e.g., mountains, beaches, forests).'),
  equipmentNeeds: z
    .string()
    .describe('The preferred equipment included in the excursion (e.g., hiking gear, snorkeling gear).'),
  groupDynamic: z
    .string()
    .describe('The preferred group dynamic (e.g., family-friendly, singles, accessible).'),
  priceRange: z.string().describe('The preferred price range for the excursion.'),
  availability: z.string().describe('The preferred dates or timeframe for the excursion.'),
});
export type PersonalizedAdventureRecommendationInput = z.infer<
  typeof PersonalizedAdventureRecommendationInputSchema
>;

export const PersonalizedAdventureRecommendationOutputSchema = z.object({
  excursionName: z.string().describe('The name of the recommended excursion.'),
  excursionDescription: z
    .string()
    .describe('A brief description of the recommended excursion.'),
  excursionItinerary: z.string().describe('A detailed itinerary of the excursion.'),
  excursionLocation: z.string().describe('The location of the excursion.'),
});
export type PersonalizedAdventureRecommendationOutput = z.infer<
  typeof PersonalizedAdventureRecommendationOutputSchema
>;
