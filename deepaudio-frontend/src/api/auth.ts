import { apiClient } from './client';
import type { LoginRequest, LoginResponse, RefreshResponse } from './types';

export const authApi = {
  login: (data: LoginRequest) =>
    apiClient.post<LoginResponse>('/api/v1/auth/login', data, { skipAuth: true }),

  refresh: (refreshToken: string) =>
    apiClient.post<RefreshResponse>('/api/v1/auth/refresh', { refresh_token: refreshToken }, { skipAuth: true }),

  logout: () =>
    apiClient.post<{ message: string }>('/api/v1/auth/logout'),
};
