import React from 'react';

interface ColorPickerProps {
  colors: string[]; // Array of color hex values
  onChange: (colors: string[]) => void; // Callback when colors change
  enabled: boolean; // Whether color picker is active
  onToggle: (enabled: boolean) => void; // Toggle color picker on/off
}

/**
 * ColorPicker component - Manage brand colors for icon generation
 */
export const ColorPicker: React.FC<ColorPickerProps> = ({
  colors,
  onChange,
  enabled,
  onToggle
}) => {
  /**
   * Update color at specific index
   */
  const handleColorChange = (index: number, newColor: string) => {
    const newColors = [...colors];
    newColors[index] = newColor;
    onChange(newColors);
  };

  /**
   * Add new color (max 5 colors)
   */
  const addColor = () => {
    if (colors.length < 5) {
      onChange([...colors, '#000000']);
    }
  };

  /**
   * Remove color at specific index (min 1 color)
   */
  const removeColor = (index: number) => {
    if (colors.length > 1) {
      const newColors = colors.filter((_, i) => i !== index);
      onChange(newColors);
    }
  };

  return (
    <div className="color-picker">
      {/* Toggle to enable/disable brand colors */}
      <div className="color-picker-header">
        <label>
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => onToggle(e.target.checked)}
          />
          <span>Use Brand Colors (Optional)</span>
        </label>
      </div>

      {/* Show color inputs if enabled */}
      {enabled && (
        <div className="color-inputs">
          {colors.map((color, index) => (
            <div key={index} className="color-input-group">
              {/* Color picker input */}
              <input
                type="color"
                value={color}
                onChange={(e) => handleColorChange(index, e.target.value)}
                className="color-input"
              />
              {/* Text input for hex code */}
              <input
                type="text"
                value={color}
                onChange={(e) => handleColorChange(index, e.target.value)}
                className="color-text-input"
                placeholder="#000000"
              />
              {/* Remove button if more than 1 color */}
              {colors.length > 1 && (
                <button
                  onClick={() => removeColor(index)}
                  className="remove-color-btn"
                  type="button"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          {/* Add new color button (max 5) */}
          {colors.length < 5 && (
            <button onClick={addColor} className="add-color-btn" type="button">
              + Add Color
            </button>
          )}
        </div>
      )}
    </div>
  );
};
