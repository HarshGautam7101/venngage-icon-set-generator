export class DownloadUtils {
    static async downloadImage(url: string, filename: string): Promise<void> {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
  
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
  
        // Clean up
        URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error('Error downloading image:', error);
        throw error;
      }
    }
  
    static async downloadAllImages(urls: string[], baseName: string): Promise<void> {
      for (let i = 0; i < urls.length; i++) {
        const filename = `${baseName}-icon-${i + 1}.png`;
        await this.downloadImage(urls[i], filename);
        // Add small delay between downloads
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
  
    static sanitizeFilename(filename: string): string {
      return filename
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    }
  }