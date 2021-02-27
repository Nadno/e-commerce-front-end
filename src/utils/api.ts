import axios, { AxiosResponse } from 'axios';

import { getCookie } from './storage';
import { COOKIE_TOKEN } from './account';

const api = axios.create({ baseURL: 'http://localhost:3333' });

const getHeaders = () => {
  const token = getCookie(COOKIE_TOKEN);
  if (!token) return {};

  return {
    Authorization: `Bearer ${token}`,
  };
};

export const apiRefreshToken = (refreshToken: string): Promise<AxiosResponse> => {
  const path = '/refresh';
  const options = {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  };

  return api.post(path, {}, options);
};

export const apiPost = (path: string, data = {}): Promise<AxiosResponse> => {
  const options = {
    headers: getHeaders(),
  };

  return api.post(path, data, options);
};

export const apiGet = (path: string): Promise<AxiosResponse> => {
  const options = {
    headers: getHeaders(),
  };

  return api.get(path, options);
};
