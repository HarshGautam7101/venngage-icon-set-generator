import { PRESET_STYLES, ICON_VARIATIONS } from '../types';

// Responsible for turning a base user prompt + style into concrete prompts
// that are sent to the model, and for doing some light validation.
export class PromptService {
  static generateIconPrompts(
    basePrompt: string,
    styleId: string,
    colors?: string[]
  ): string[] {
    const style = PRESET_STYLES[styleId as keyof typeof PRESET_STYLES];
    if (!style) {
      throw new Error('Invalid style selected');
    }

    const colorPalette = colors && colors.length > 0
      ? `using color palette: ${colors.join(', ')}`
      : '';

    // Build one slightly different variation per icon (subject, accessory, etc.)
    return ICON_VARIATIONS.map((variation) => {
      // Random seed helps avoid identical-looking images across runs
      const seed = Math.floor(Math.random() * 100000);
      
      return `A single ${basePrompt} ${variation} icon, ${style.modifier}, ${colorPalette}, simple icon design, white background, centered composition, 512x512 resolution, high quality, professional design, clean aesthetic, no text, no labels, seed:${seed}`.trim();
    });
  }

  // Keep prompts short enough for the model, but don't over‑police the text.
  static validatePrompt(prompt: string): boolean {
    return prompt.trim().length > 0 && prompt.trim().length < 200;
  }

  // Accept standard 3 or 6 digit HEX codes only.
  static validateColors(colors: string[]): boolean {
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return colors.every(color => hexRegex.test(color));
  }
}