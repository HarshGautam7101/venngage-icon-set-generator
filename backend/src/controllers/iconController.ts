import { Request, Response } from 'express';
import { ReplicateService } from '../services/replicateService';
import { PromptService } from '../services/promptService';
import { GenerateIconRequest } from '../types';

// Controller keeps all the request/response handling logic in one place,
// and delegates the heavy lifting to services.
export class IconController {
  private replicateService: ReplicateService;

  constructor() {
    // A single service instance is fine here – each request is still handled independently
    this.replicateService = new ReplicateService();
  }

  // POST /api/icons/generate
  // Validates input, builds prompts, calls the Replicate service and normalises the response.
  async generateIcons(req: Request, res: Response): Promise<void> {
    try {
      const { prompt, styleId, colors }: GenerateIconRequest = req.body;

      // Basic shape validation
      if (!prompt || !styleId) {
        res.status(400).json({ 
          error: 'Missing required fields: prompt and styleId' 
        });
        return;
      }

      // Keep the prompt reasonably sized for the model
      if (!PromptService.validatePrompt(prompt)) {
        res.status(400).json({ 
          error: 'Invalid prompt. Must be between 1-200 characters' 
        });
        return;
      }

      // Only accept proper HEX color values if colors are provided
      if (colors && !PromptService.validateColors(colors)) {
        res.status(400).json({ 
          error: 'Invalid color format. Use HEX codes (e.g., #FF6B6B)' 
        });
        return;
      }

      // Build one prompt per icon, based on the base prompt + style + variations
      const iconPrompts = PromptService.generateIconPrompts(
        prompt,
        styleId,
        colors
      );

      console.log(`Generating ${iconPrompts.length} icons for prompt: "${prompt}"`);

      // Hand off to the Replicate service to actually generate the images
      const iconUrls = await this.replicateService.generateIconSet(iconPrompts);

      // Shape the response for the frontend
      res.json({
        success: true,
        icons: iconUrls.map((url, index) => ({
          url,
          index,
          prompt: iconPrompts[index]
        }))
      });

    } catch (error) {
      console.error('Error in generateIcons:', error);
      res.status(500).json({ 
        error: 'Failed to generate icons',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Simple health check used by the React app on load
  async healthCheck(req: Request, res: Response): Promise<void> {
    res.json({ 
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'Icon Generator API'
    });
  }
}