import React, { createContext, useCallback, useEffect, useState } from 'react';

import getSecondsToExpire from '../utils/jwt';
import { apiRefreshToken } from '../utils/api';
import { getAccount, removeAccount, storeAccount } from '../utils/account';
import { StoreProvider, Account } from '../types/hooks';

export const ContextAccount = createContext<StoreProvider | null>(null);

const ONE_MINUTE = 60,
  TEN_SECONDS = 10;

const Store: React.FC = ({ children }) => {
  const NO_ACCOUNT = {
    id: null,
    name: '',
    avatar: '',
  };

  const [account, setAccount] = useState<Account>(NO_ACCOUNT);
  const [token, setToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  const [authorized, setAuthorized] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [cart, setCart] = useState<string[]>([]);

  const getStorage = useCallback(() => {
    const { account, token, refreshToken } = getAccount();
    if (account) setAccount(account);
    setToken(token);
    setRefreshToken(refreshToken);
  }, []);

  const refreshAccount = useCallback(() => {
    if (isRefreshing) return;

    setIsRefreshing(() => true);
    apiRefreshToken(refreshToken)
      .then(({ data }) => {
        setToken(data.token);
        setIsRefreshing(() => false);
        storeAccount({ token: data.token });
      })
      .catch(() => {
        setIsRefreshing(() => false);
      });
  }, [refreshToken]);

  const expireTimer = useCallback(() => {
    const fiveSeconds = 5000,
      FIVE_SECONDS = 5;

    const secondsToExpire = getSecondsToExpire(token);
    if (secondsToExpire < ONE_MINUTE) return;

    let expireCount = secondsToExpire;

    const secondsToExpireInterval = setInterval(() => {
      expireCount -= FIVE_SECONDS;

      if (!isRefreshing && expireCount < ONE_MINUTE) {
        refreshAccount();
      } else if (expireCount < TEN_SECONDS) {
        setAuthorized(() => false);
        clearInterval(secondsToExpireInterval);
      }
    }, fiveSeconds);

    return () => clearInterval(secondsToExpireInterval);
  }, [token]);

  const authorizeAccount = useCallback(() => {
    const secondsToExpire = getSecondsToExpire(token);
    
    if (secondsToExpire > ONE_MINUTE) {
      setAuthorized(() => true);
      return;
    }

    if (!refreshToken) return;
    const secondsToExpireRefresh = getSecondsToExpire(refreshToken);

    if (secondsToExpireRefresh > TEN_SECONDS) {
      refreshAccount();
    } else {
      removeAccount();
      setAccount(NO_ACCOUNT);
    }
  }, [token, refreshToken]);

  useEffect(getStorage, []);
  useEffect(expireTimer, [token]);
  useEffect(authorizeAccount, [token, refreshToken]);

  return (
    <ContextAccount.Provider
      value={{
        account,
        setAccount,
        setToken,
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
