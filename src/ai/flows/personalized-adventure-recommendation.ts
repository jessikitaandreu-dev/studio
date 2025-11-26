'use server';

/**
 * @fileOverview A personalized adventure recommendation AI agent.
 *
 * - personalizedAdventureRecommendation - A function that handles the adventure recommendation process.
 */

import {ai} from '@/ai/genkit';
import {
  PersonalizedAdventureRecommendationInputSchema,
  PersonalizedAdventureRecommendationOutputSchema,
  type PersonalizedAdventureRecommendationInput,
  type PersonalizedAdventureRecommendationOutput,
} from './personalized-adventure-recommendation.types';

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
