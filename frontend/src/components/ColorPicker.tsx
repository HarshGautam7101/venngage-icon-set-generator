import React from 'react';

interface ColorPickerProps {
  colors: string[];
  onChange: (colors: string[]) => void;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  colors,
  onChange,
  enabled,
  onToggle
}) => {
  const handleColorChange = (index: number, newColor: string) => {
    const newColors = [...colors];
    newColors[index] = newColor;
    onChange(newColors);
  };

  const addColor = () => {
    if (colors.length < 5) {
      onChange([...colors, '#000000']);
    }
  };

  const removeColor = (index: number) => {
    if (colors.length > 1) {
      const newColors = colors.filter((_, i) => i !== index);
      onChange(newColors);
    }
  };

  return (
    <div className="color-picker">
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

      {enabled && (
        <div className="color-inputs">
          {colors.map((color, index) => (
            <div key={index} className="color-input-group">
              <input
                type="color"
                value={color}
                onChange={(e) => handleColorChange(index, e.target.value)}
                className="color-input"
              />
              <input
                type="text"
                value={color}
                onChange={(e) => handleColorChange(index, e.target.value)}
                className="color-text-input"
                placeholder="#000000"
              />
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