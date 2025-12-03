import React from 'react';
import { Download } from 'lucide-react';
import { GeneratedIcon } from '../types';
import { DownloadUtils } from '../utils/downloadUtils';

interface IconGridProps {
  icons: GeneratedIcon[];
  basePrompt: string;
}

export const IconGrid: React.FC<IconGridProps> = ({ icons, basePrompt }) => {
  const handleDownload = async (url: string, index: number) => {
    const filename = `${DownloadUtils.sanitizeFilename(basePrompt)}-icon-${index + 1}.png`;
    await DownloadUtils.downloadImage(url, filename);
  };

  const handleDownloadAll = async () => {
    const baseName = DownloadUtils.sanitizeFilename(basePrompt);
    const urls = icons.map(icon => icon.url);
    await DownloadUtils.downloadAllImages(urls, baseName);
  };

  if (icons.length === 0) return null;

  return (
    <div className="icon-grid-container">
      <div className="icon-grid-header">
        <h2>Generated Icons</h2>
        <button onClick={handleDownloadAll} className="download-all-btn">
          <Download size={16} />
          Download All
        </button>
      </div>

      <div className="icon-grid">
        {icons.map((icon, index) => (
          <div key={icon.id} className="icon-card">
            <div className="icon-image-container">
              <img
                src={icon.url}
                alt={`Generated icon ${index + 1}`}
                className="icon-image"
              />
            </div>
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