import { apiClient, getToken, request } from './client';
import type {
  CreateStoryRequest,
  DraftResponse,
  InProgressStory,
  PaginatedStories,
  SelectAbstractRequest,
  Story,
} from './types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://lemongrass:8000';

export const storiesApi = {
  list: (limit = 20, offset = 0) =>
    apiClient.get<PaginatedStories>(`/api/v1/stories?limit=${limit}&offset=${offset}`),

  create: (data: CreateStoryRequest) =>
    apiClient.post<DraftResponse>('/api/v1/stories/', data),

  getById: (id: string) =>
    apiClient.get<Story>(`/api/v1/stories/${id}`),

  getInProgress: () =>
    apiClient.get<InProgressStory>('/api/v1/stories/in_progress'),

  /**
   * Returns abstracts array if ready (200), or null if still generating (202).
   */
  getAbstracts: async (id: string): Promise<string[] | null> => {
    const token = getToken();
    const res = await fetch(`${BASE_URL}/api/v1/stories/${id}/abstracts`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (res.status === 202) return null;
    if (res.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/login';
      throw new Error('Unauthorized');
    }
    if (!res.ok) throw new Error('Failed to fetch abstracts');
    return res.json();
  },

  selectAbstract: (id: string, data: SelectAbstractRequest) =>
    apiClient.post<DraftResponse>(`/api/v1/stories/${id}/select_abstract`, data),

  generateStory: (id: string) =>
    request<DraftResponse>(`/api/v1/stories/${id}/generate_story`, { method: 'POST' }),

  delete: (id: string) =>
    apiClient.delete<null>(`/api/v1/stories/${id}`),

  getAudioBlobUrl: async (id: string): Promise<string> => {
    const token = getToken();
    const res = await fetch(`${BASE_URL}/api/v1/stories/${id}/audio`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (res.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/login';
      throw new Error('Unauthorized');
    }
    if (!res.ok) throw new Error('Failed to fetch audio');
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  },
};
