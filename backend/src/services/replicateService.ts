import Replicate from 'replicate';

// Thin wrapper around the Replicate client so the rest of the codebase
// doesn't need to know about the SDK details.
export class ReplicateService {
  private replicate: Replicate;

  constructor() {
    this.replicate = new Replicate({
      // Keep the token in the environment, not in source control
      auth: 'r8_GhYzAuZpV8xJP2dNL83CYJUxyhAgyj93D4wbS',
    });
  }

  /**
   * Generate a single icon URL from a fully-formed prompt string.
   * Prompt construction (style, colors, etc.) happens in the PromptService.
   */
  async generateIcon(prompt: string): Promise<string> {
    try {
      console.log(`Generating icon with prompt: ${prompt.substring(0, 50)}...`);
      
      const output = await this.replicate.run(
        "black-forest-labs/flux-schnell",
        {
          input: {
            prompt: prompt,
            num_outputs: 1,
            aspect_ratio: "1:1",
            output_format: "png",
            output_quality: 100,
            disable_safety_checker: false
          }
        }
      );

      // The SDK returns an array; we only ever request a single image.
      if (Array.isArray(output) && output.length > 0) {
        // Handle both plain string URLs and objects with a .url() helper.
        const url = typeof output[0] === 'string' ? output[0] : output[0].url();
        console.log(`Icon generated successfully: ${url}`);
        return url;
      }

      throw new Error('No output received from Replicate');
    } catch (error) {
      console.error('Error generating icon:', error);
      throw error;
    }
  }

  /**
   * Helper to generate a small set of icons one after another.
   * Sequential calls are simpler and avoid hammering the API.
   */
  async generateIconSet(prompts: string[]): Promise<string[]> {
    const results: string[] = [];
    
    console.log(`Starting generation of ${prompts.length} icons...`);
    
    // Generate icons sequentially to avoid rate limiting
    for (let i = 0; i < prompts.length; i++) {
      try {
        const url = await this.generateIcon(prompts[i]);
        results.push(url);
        console.log(`Progress: ${i + 1}/${prompts.length} icons generated`);
      } catch (error) {
        console.error(`Failed to generate icon ${i + 1}:`, error);
        // Bubble up the first failure; the caller can decide how to react.
        throw error;
      }
    }

    console.log('All icons generated successfully!');
    return results;
  }
}