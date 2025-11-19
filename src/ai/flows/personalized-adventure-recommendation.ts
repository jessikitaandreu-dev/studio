'use server';

/**
 * @fileOverview A personalized adventure recommendation AI agent.
 *
 * - personalizedAdventureRecommendation - A function that handles the adventure recommendation process.
 * - PersonalizedAdventureRecommendationInput - The input type for the personalizedAdventureRecommendation function.
 * - PersonalizedAdventureRecommendationOutput - The return type for the personalizedAdventureRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedAdventureRecommendationInputSchema = z.object({
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

const PersonalizedAdventureRecommendationOutputSchema = z.object({
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

export async function personalizedAdventureRecommendation(
  input: PersonalizedAdventureRecommendationInput
): Promise<PersonalizedAdventureRecommendationOutput> {
  return personalizedAdventureRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedAdventureRecommendationPrompt',
  input: {schema: PersonalizedAdventureRecommendationInputSchema},
  output: {schema: PersonalizedAdventureRecommendationOutputSchema},
  prompt: `Based on the traveler's preferences, recommend a specific excursion package.

Traveler Preferences:
Risk Level: {{{riskLevel}}}
Landscape Preferences: {{{landscapePreferences}}}
Included Equipment: {{{equipmentNeeds}}}
Group Dynamic: {{{groupDynamic}}}
Preferred Price: {{{priceRange}}}
Availability: {{{availability}}}

Excursion Recommendation:`,
});

const personalizedAdventureRecommendationFlow = ai.defineFlow(
  {
    name: 'personalizedAdventureRecommendationFlow',
    inputSchema: PersonalizedAdventureRecommendationInputSchema,
    outputSchema: PersonalizedAdventureRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
