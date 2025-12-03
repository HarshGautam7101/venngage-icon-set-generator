// Shared shapes between the controller, services and (optionally) frontend.
export interface GenerateIconRequest {
  prompt: string;
  styleId: string;
  colors?: string[];
}

export interface IconPrompt {
  prompt: string;
  index: number;
}

export interface GeneratedIcon {
  url: string;
  index: number;
}

// Styles here roughly mirror what the frontend exposes in the UI.
export const PRESET_STYLES = {
  '1': {
    name: 'Pastels',
    modifier: 'soft pastel colors, dreamy aesthetic, gentle lighting, smooth gradients, watercolor style'
  },
  '2': {
    name: 'Bubbles',
    modifier: 'rounded bubbly shapes, glossy finish, playful style, 3D bubbles, shiny surface'
  },
  '3': {
    name: 'Minimalist',
    modifier: 'minimalist design, clean lines, simple shapes, modern aesthetic, flat illustration'
  },
  '4': {
    name: 'Gradient',
    modifier: 'vibrant gradients, colorful transitions, dynamic colors, smooth color blends, modern gradient style'
  },
  '5': {
    name: 'Flat',
    modifier: 'flat design, bold colors, geometric shapes, modern illustration, vector style'
  }
};

// Each variation gives the model a slightly different angle on the same theme.
export const ICON_VARIATIONS = [
  'main subject',
  'related item',
  'complementary accessory',
  'alternative perspective'
];