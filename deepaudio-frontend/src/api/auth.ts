import { request } from './client';
import type { LoginRequest, LoginResponse, RefreshResponse } from './types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://lemongrass:8000';

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const body = new URLSearchParams({ username: data.username, password: data.password });
    const res = await fetch(`${BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });
    if (!res.ok) {
      const error = await res.json().catch(() => ({ detail: 'Login failed' }));
      throw new Error(error.detail ?? 'Login failed');
    }
    return res.json();
  },

  refresh: (refreshToken: string) =>
    request<RefreshResponse>('/api/v1/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: refreshToken }),
      skipAuth: true,
    }),

  logout: () =>
    request<{ message: string }>('/api/v1/auth/logout', { method: 'POST' }),
};
