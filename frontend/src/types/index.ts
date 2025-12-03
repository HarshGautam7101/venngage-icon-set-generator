export interface GeneratedIcon {
    id: string;
    url: string;
    prompt: string;
    index: number;
  }
  
  export interface Style {
    id: string;
    name: string;
    description: string;
    promptModifier: string;
  }
  
  export const PRESET_STYLES: Style[] = [
    {
      id: '1',
      name: 'Pastels',
      description: 'Soft, dreamy pastel colors',
      promptModifier: 'soft pastel colors, dreamy aesthetic, gentle lighting, smooth gradients, watercolor style'
    },
    {
      id: '2',
      name: 'Bubbles',
      description: 'Rounded, bubbly shapes',
      promptModifier: 'rounded bubbly shapes, glossy finish, playful style, 3D bubbles, shiny surface'
    },
    {
      id: '3',
      name: 'Minimalist',
      description: 'Clean, simple lines',
      promptModifier: 'minimalist design, clean lines, simple shapes, modern aesthetic, flat illustration'
    },
    {
      id: '4',
      name: 'Gradient',
      description: 'Vibrant gradient colors',
      promptModifier: 'vibrant gradients, colorful transitions, dynamic colors, smooth color blends, modern gradient style'
    },
    {
      id: '5',
      name: 'Flat',
      description: 'Bold flat design',
      promptModifier: 'flat design, bold colors, geometric shapes, modern illustration, vector style'
    }
  ];
  
  export const ICON_VARIATIONS = [
    'main subject',
    'related item',
    'complementary accessory',
    'alternative perspective'
  ];