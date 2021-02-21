import axios from 'axios';

import { getCookie } from './storage';
import { COOKIE_TOKEN } from './account';

export const getApiUrl = (path: string) => `http://localhost:3333${path}`;

const getHeaders = () => {
  const token = getCookie(COOKIE_TOKEN);
  if (!token) return {};

  return {
    Authorization: `Bearer ${token}`,
  }
}

export const apiPost = (path: string, data = {}) => {
  const url = getApiUrl(path);
  const options = {
    headers: getHeaders(),
  };

  return axios.post(url, data, options);
}

export const apiGet = (path: string) => {
  const url = getApiUrl(path);
  const options = {
    headers: getHeaders(),
  }

  return axios.get(url, options);
}