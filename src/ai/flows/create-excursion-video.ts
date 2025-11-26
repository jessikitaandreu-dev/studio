'use server';
/**
 * @fileOverview A flow for creating a video montage of excursions.
 *
 * - createExcursionVideo - A function that handles the video creation process.
 */

import { ai } from '@/ai/genkit';
import { excursions } from '@/lib/excursions';
import { googleAI } from '@genkit-ai/google-genai';
import {
  CreateExcursionVideoInputSchema,
  CreateExcursionVideoOutputSchema,
  type CreateExcursionVideoInput,
  type CreateExcursionVideoOutput,
} from './create-excursion-video.types';

async function toBase64(url: string): Promise<string> {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(`${url}&key=${process.env.GEMINI_API_KEY}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch video: ${response.statusText}`);
    }
    const buffer = await response.buffer();
    return buffer.toString('base64');
}

export async function createExcursionVideo(
  input: CreateExcursionVideoInput
): Promise<CreateExcursionVideoOutput> {
  const videoFlow = ai.defineFlow(
    {
      name: 'createExcursionVideoFlow',
      inputSchema: CreateExcursionVideoInputSchema,
      outputSchema: CreateExcursionVideoOutputSchema,
    },
    async (flowInput) => {
      const excursionDescriptions = excursions
        .map(e => `${e.title}: ${e.description}`)
        .join('\n');

      let { operation } = await ai.generate({
        model: googleAI.model('veo-2.0-generate-001'),
        prompt: `Create a cinematic and exciting video montage showcasing a variety of adventure excursions. Here are some of the excursions offered:
${excursionDescriptions}
The video should be visually stunning, fast-paced, and inspiring, with a sense of adventure and fun. Show people enjoying these activities in beautiful landscapes. Use dynamic camera angles and smooth transitions. The tone should be upbeat and professional.`,
        config: {
          durationSeconds: 8,
          aspectRatio: '16:9',
        },
      });

      if (!operation) {
        throw new Error('Expected the model to return an operation');
      }

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.checkOperation(operation);
      }

      if (operation.error) {
        throw new Error('failed to generate video: ' + operation.error.message);
      }

      const videoPart = operation.output?.message?.content.find(p => !!p.media);
      if (!videoPart || !videoPart.media?.url) {
        throw new Error('Failed to find the generated video');
      }

      const base64Video = await toBase64(videoPart.media.url);
      const videoDataUri = `data:${videoPart.media.contentType || 'video/mp4'};base64,${base64Video}`;

      return {
        video: videoDataUri,
      };
    }
  );

  return videoFlow(input);
}
