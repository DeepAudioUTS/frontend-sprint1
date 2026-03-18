import { apiClient } from './client';
import type { LoginRequest, LoginResponse } from './types';

export const authApi = {
  login: (data: LoginRequest) =>
    apiClient.post<LoginResponse>('/api/v1/auth/login', data, { skipAuth: true }),

  logout: () =>
    apiClient.post<{ message: string }>('/api/v1/auth/logout'),
};
