import React from 'react';
import { Download } from 'lucide-react';
import { GeneratedIcon } from '../types';
import { DownloadUtils } from '../utils/downloadUtils';

interface IconGridProps {
  icons: GeneratedIcon[]; // Array of generated icons
  basePrompt: string; // Original prompt for filename generation
}

/**
 * IconGrid component - Display and download generated icons
 */
export const IconGrid: React.FC<IconGridProps> = ({ icons, basePrompt }) => {
  /**
   * Download a single icon image
   */
  const handleDownload = async (url: string, index: number) => {
    const filename = `${DownloadUtils.sanitizeFilename(basePrompt)}-icon-${index + 1}.png`;
    await DownloadUtils.downloadImage(url, filename);
  };

  /**
   * Download all generated icons with staggered delays
   */
  const handleDownloadAll = async () => {
    const baseName = DownloadUtils.sanitizeFilename(basePrompt);
    const urls = icons.map(icon => icon.url);
    await DownloadUtils.downloadAllImages(urls, baseName);
  };

  // Hide grid if no icons generated
  if (icons.length === 0) return null;

  return (
    <div className="icon-grid-container">
      {/* Header with download all button */}
      <div className="icon-grid-header">
        <h2>Generated Icons</h2>
        <button onClick={handleDownloadAll} className="download-all-btn">
          <Download size={16} />
          Download All
        </button>
      </div>

      {/* Grid of icon cards */}
      <div className="icon-grid">
        {icons.map((icon, index) => (
          <div key={icon.id} className="icon-card">
            {/* Icon image */}
            <div className="icon-image-container">
              <img
                src={icon.url}
                alt={`Generated icon ${index + 1}`}
                className="icon-image"
              />
            </div>
            {/* Individual download button */}
            <button
              onClick={() => handleDownload(icon.url, index)}
              className="download-btn"
            >
              <Download size={14} />
              Download PNG
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};