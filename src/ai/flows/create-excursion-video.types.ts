/**
 * @fileOverview Type definitions for the createExcursionVideo flow.
 */
import { z } from 'genkit';

export const CreateExcursionVideoInputSchema = z.null();
export type CreateExcursionVideoInput = z.infer<typeof CreateExcursionVideoInputSchema>;

export const CreateExcursionVideoOutputSchema = z.object({
  video: z.string().describe('The generated video as a data URI.'),
});
export type CreateExcursionVideoOutput = z.infer<typeof CreateExcursionVideoOutputSchema>;
