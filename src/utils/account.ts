import { setCookie, getCookie, removeCookie } from './storage';

const expires = new Date();
expires.setFullYear(expires.getFullYear() + 1);

const options = { expires };

export const COOKIE_ACCOUNT = 'acc';
export const COOKIE_TOKEN = 'tk';
export const COOKIE_REFRESH_TOKEN = 'rtk';

export const storeAccount = (
  account: object,
  token: string,
  refreshToken: string
) => {
  setCookie(COOKIE_ACCOUNT, account, options);
  setCookie(COOKIE_TOKEN, token, options);
  setCookie(COOKIE_REFRESH_TOKEN, refreshToken, options);
};

export const removeAccount = () => {
  removeCookie(COOKIE_ACCOUNT);
  removeCookie(COOKIE_TOKEN);
  removeCookie(COOKIE_REFRESH_TOKEN);
};

export const getAccount = () => ({
  account: getCookie(COOKIE_ACCOUNT),
  token: getCookie(COOKIE_TOKEN),
  refreshToken: getCookie(COOKIE_REFRESH_TOKEN),
});
