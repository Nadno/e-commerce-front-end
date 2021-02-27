import React, { createContext, useCallback, useEffect, useState } from 'react';

import { StoreProvider, Account } from './interfaces/hooks';
import { getAccount, removeAccount } from './utils/account';
import { apiRefreshToken } from './utils/api';
import getSecondsToExpire from './utils/jwt';

export const ContextAccount = createContext<StoreProvider | null>(null);

const SIXTY_SECONDS = 60,
  TEN_SECONDS = 10;

const Store: React.FC = ({ children }) => {
  const [account, setAccount] = useState<Account>({
    id: null,
    avatar: '',
  });
  const [token, setToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [cart, setCart] = useState<string[]>([]);

  const [authorized, setAuthorized] = useState(true);

  const loginByStorage = useCallback(() => {
    const { account, token, refreshToken } = getAccount();
    const secondsToExpire = getSecondsToExpire(token);

    if (secondsToExpire > TEN_SECONDS) {
      setAccount(account);
      setRefreshToken(refreshToken);
      setToken(token);
      setAuthorized(true);
    } else if (token) {
      removeAccount();
      setAuthorized(false);
    }
  }, []);

  useEffect(loginByStorage, []);

  const expireTimer = useCallback(() => {
    const fiveSeconds = 5000,
      FIVE_SECONDS = 5;

    const secondsToExpire = getSecondsToExpire(token);
    if (secondsToExpire < TEN_SECONDS) return;

    let expireCount = secondsToExpire;
    let isRefreshingToken: boolean = false;

    const secondsToExpireInterval = setInterval(() => {
      expireCount -= FIVE_SECONDS;

      if (!isRefreshingToken && expireCount < SIXTY_SECONDS) {
        isRefreshingToken = true;
        apiRefreshToken(refreshToken)
          .then(({ data }) => {
            setToken(data.token);
            isRefreshingToken = false;
          })
          .catch(() => {
            isRefreshingToken = false;
          });
      } else if (expireCount < TEN_SECONDS) {
        setAuthorized(() => false);
        clearInterval(secondsToExpireInterval);
      }
    }, fiveSeconds);

    return () => clearInterval(secondsToExpireInterval);
  }, [token, refreshToken]);

  useEffect(expireTimer, [token]);

  return (
    <ContextAccount.Provider
      value={{
        account,
        setAccount,
        token,
        setToken,
        refreshToken,
        setRefreshToken,
        cart,
        setCart,
        authorized,
      }}
    >
      {children}
    </ContextAccount.Provider>
  );
};

export default Store;
