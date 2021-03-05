import axios, { AxiosResponse, CancelTokenSource } from 'axios';

import { getCookie } from './storage';
import { COOKIE_TOKEN } from './account';

const api = axios.create({
  baseURL: 'http://192.168.1.2:3333',
});

type ApiObject = { cancelRequest: () => void; response: Promise<AxiosResponse> };

const cancel = (signal: CancelTokenSource) => 
  () => signal.cancel('canceled');

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
  const signal = axios.CancelToken.source();
  const options = {
    headers: getHeaders(),
    cancelToken: signal.token,
  };

  return {
    cancelRequest: cancel(signal),
    response: api.post(path, data, options),
  };
};

export const apiGet = (path: string): ApiObject => {
  const signal = axios.CancelToken.source();
  const options = {
    headers: getHeaders(),
    cancelToken: signal.token,
  };
  return {
    cancelRequest: cancel(signal),
    response: api.get(path, options),
  };
};
