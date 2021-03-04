import axios, { AxiosResponse } from 'axios';

import { getCookie } from './storage';
import { COOKIE_TOKEN } from './account';

const signal = axios.CancelToken.source();

const api = axios.create({
  baseURL: 'http://localhost:3333',
  cancelToken: signal.token,
});

type ApiObject = { cancelRequest: () => void; response: Promise<AxiosResponse> };

const cancelRequest = () => signal.cancel("canceled");

const getHeaders = () => {
  const token = getCookie(COOKIE_TOKEN);
  if (!token) return {};

  return {
    Authorization: `Bearer ${token}`,
  };
};

export const apiRefreshToken = (refreshToken: string) => {
  const path = '/refresh';
  const options = {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  };

  return api.post(path, {}, options);
};

export const apiPost = (path: string, data = {}): ApiObject => {
  const options = {
    headers: getHeaders(),
  };

  return {
    cancelRequest,
    response: api.post(path, data, options),
  };
};

export const apiGet = (path: string): ApiObject => {
  const options = {
    headers: getHeaders(),
  };
  return {
    cancelRequest,
    response: api.get(path, options),
  };
};
