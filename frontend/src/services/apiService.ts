import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

export interface GenerateIconsRequest {
  prompt: string;
  styleId: string;
  colors?: string[];
}

export interface GeneratedIcon {
  url: string;
  index: number;
  prompt: string;
}

export interface GenerateIconsResponse {
  success: boolean;
  icons: GeneratedIcon[];
}

export class ApiService {
  static async generateIcons(
    request: GenerateIconsRequest
  ): Promise<GeneratedIcon[]> {
    try {
      const response = await axios.post<GenerateIconsResponse>(
        `${API_BASE_URL}/icons/generate`,
        request,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 300000, // 5 minutes timeout
        }
      );

      if (response.data.success) {
        return response.data.icons;
      }

      throw new Error('Failed to generate icons');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || 
          error.message || 
          'Failed to generate icons'
        );
      }
      throw error;
    }
  }

  static async healthCheck(): Promise<boolean> {
    try {
      const response = await axios.get(`${API_BASE_URL}/icons/health`);
      console.log("Health check response:", response.data);
      return response.data.status === 'ok';
    } catch (error) {
      return false;
    }
  }
}