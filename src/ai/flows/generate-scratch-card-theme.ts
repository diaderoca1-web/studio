'use server';
/**
 * @fileOverview Generates a scratch card theme based on a textual prompt.
 *
 * - generateScratchCardTheme - A function that generates a scratch card theme.
 * - ScratchCardThemeInput - The input type for the generateScratchCardTheme function.
 * - ScratchCardThemeOutput - The return type for the generateScratchCardTheme function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ScratchCardThemeInputSchema = z.object({
  themePrompt: z.string().describe('A textual description of the desired scratch card theme.'),
});
export type ScratchCardThemeInput = z.infer<typeof ScratchCardThemeInputSchema>;

const ScratchCardThemeOutputSchema = z.object({
  themeDescription: z.string().describe('A detailed description of the generated scratch card theme.'),
  imageUrl: z.string().describe('A URL of an image representing the generated scratch card theme.'),
});
export type ScratchCardThemeOutput = z.infer<typeof ScratchCardThemeOutputSchema>;

export async function generateScratchCardTheme(input: ScratchCardThemeInput): Promise<ScratchCardThemeOutput> {
  return generateScratchCardThemeFlow(input);
}

const themePrompt = ai.definePrompt({
  name: 'scratchCardThemePrompt',
  input: {schema: ScratchCardThemeInputSchema},
  output: {schema: ScratchCardThemeOutputSchema},
  prompt: `You are a creative theme generator for scratch card games. Based on the user's description, generate a detailed theme description and an image URL representing the theme.

User Theme Description: {{{themePrompt}}}

Output the theme as a JSON object that satisfies the following schema. The description from the schema will be used to guide the output, so pay close attention to it:
{{jsonSchema output}}`,
});

const generateScratchCardThemeFlow = ai.defineFlow(
  {
    name: 'generateScratchCardThemeFlow',
    inputSchema: ScratchCardThemeInputSchema,
    outputSchema: ScratchCardThemeOutputSchema,
  },
  async input => {
    const {output} = await themePrompt(input);
    return output!;
  }
);
