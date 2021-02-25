import React, { createContext, useCallback, useEffect, useState } from 'react';

import { StoreProvider, Account } from './interfaces/hooks';
import { getAccount, removeAccount } from './utils/account';
import getSecondsToExpire from './utils/jwt';

export const ContextAccount = createContext<StoreProvider | null>(null);

const Store: React.FC = ({ children }) => {
  const [account, setAccount] = useState<Account>({
    id: null,
    avatar: '',
  });
  const [token, setToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [cart, setCart] = useState<string[]>([]);

  const [authorized, setAuthorized] = useState(true);

  const startCountDown = useCallback(
    (count) => {
      const twoSeconds = 2000,
        THIRTY_SECONDS = 30,
        ONE_SECOND = 1;

      if (count < ONE_SECOND) return 0;
      let expireCount = count;

      const secondsToExpireInterval: any = setInterval(() => {
        expireCount--;

        if (expireCount < THIRTY_SECONDS) {
          setAuthorized(() => false);
          clearInterval(secondsToExpireInterval);
        } else if (expireCount < ONE_SECOND) {
        }
      }, twoSeconds);

      return secondsToExpireInterval;
    },
    [token]
  );

  const loginByStorage = () => {
    const { account, token, refreshToken } = getAccount();

    const secondsToExpire = getSecondsToExpire(token);
    const countDownID: any = startCountDown(secondsToExpire);

    if (countDownID) {
      setRefreshToken(refreshToken);
      setAccount(account);
      setToken(token);
      setAuthorized(true);

      return () => clearInterval(countDownID);
    } else if (token) {
      removeAccount();
      setAuthorized(false);
    }
  };

  useEffect(loginByStorage, [token]);

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
