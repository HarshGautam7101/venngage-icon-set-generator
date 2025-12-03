import React, { useState, useEffect } from 'react';
import { Loader2, Palette, AlertCircle } from 'lucide-react';
import { ApiService } from '../services/apiService';
import { ColorPicker } from './ColorPicker';
import { IconGrid } from './IconGrid';
import { PRESET_STYLES } from '../types';

/**
 * IconGenerator component - Main UI for icon generation
 * Manages user input, API communication, and generated icon display
 */
export const IconGenerator: React.FC = () => {
  // State management
  const [prompt, setPrompt] = useState(''); // User's icon prompt
  const [selectedStyle, setSelectedStyle] = useState('1'); // Selected icon style
  const [colors, setColors] = useState(['#FF6B6B', '#4ECDC4', '#45B7D1']); // Brand colors
  const [useColors, setUseColors] = useState(false); // Toggle to use custom colors
  const [loading, setLoading] = useState(false); // Loading state during generation
  const [icons, setIcons] = useState<any[]>([]); // Generated icons
  const [error, setError] = useState(''); // Error messages
  const [apiHealthy, setApiHealthy] = useState(true); // Backend API health status

  // Check API health on component mount
  useEffect(() => {
    checkApiHealth();
  }, []);

  /**
   * Verify backend API is available
   */
  const checkApiHealth = async () => {
    const healthy = await ApiService.healthCheck();
    setApiHealthy(healthy);
    if (!healthy) {
      setError('Backend server is not responding. Please make sure it\'s running on port 5000.');
    }
  };

  /**
   * Handle icon generation request
   * Validates input, calls API, and updates state with results
   */
  const handleGenerate = async () => {
    // Validate prompt input
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    // Validate API availability
    if (!apiHealthy) {
      setError('Backend server is not available. Please start the server first.');
      return;
    }

    // Reset state for new generation
    setLoading(true);
    setError('');
    setIcons([]);

    try {
      // Call API with generation parameters
      const generatedIcons = await ApiService.generateIcons({
        prompt: prompt.trim(),
        styleId: selectedStyle,
        colors: useColors ? colors : undefined,
      });

      setIcons(generatedIcons);
    } catch (err) {
      console.error('Generation error:', err);
      setError(
        err instanceof Error 
          ? err.message 
          : 'Failed to generate icons. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="icon-generator">

      <div className="generator-card">
        <div className="input-group">
          <label htmlFor="prompt">Icon Set Prompt</label>
          <input
            id="prompt"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Toys, Food, Travel, Technology..."
            disabled={loading}
          />
        </div>

        <div className="input-group">
          <label>Preset Style</label>
          <div className="style-grid">
            {PRESET_STYLES.map(style => (
              <div
                key={style.id}
                onClick={() => !loading && setSelectedStyle(style.id)}
                className={`style-card ${selectedStyle === style.id ? 'selected' : ''} ${loading ? 'disabled' : ''}`}
              >
                <div className="style-name">{style.name}</div>
                <div className="style-description">{style.description}</div>
              </div>
            ))}
          </div>
        </div>

        <ColorPicker
          colors={colors}
          onChange={setColors}
          enabled={useColors}
          onToggle={setUseColors}
        />

        <button
          onClick={handleGenerate}
          disabled={loading || !prompt || !apiHealthy}
          className="generate-btn"
        >
          {loading ? (
            <>
              <Loader2 className="spinner" size={20} />
              Generating Icons... This may take 2-3 minutes
            </>
          ) : (
            <>
              <Palette size={20} />
              Generate Icon Set
            </>
          )}
        </button>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
      </div>

      <IconGrid icons={icons} basePrompt={prompt} />
    </div>
  );
};