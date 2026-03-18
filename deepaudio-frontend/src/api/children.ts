import { apiClient } from './client';
import type { Child } from './types';

export const childrenApi = {
  list: () => apiClient.get<Child[]>('/api/v1/children/'),
};
