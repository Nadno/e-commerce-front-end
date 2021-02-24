import { useContext, useEffect } from 'react';
import router from 'next/router';

import { Login } from "../interfaces/hooks";
import { ContextAccount } from "../StoreProvider";
import { storeAccount, removeAccount, getAccount } from '../utils/account';
import getSecondsToExpire from '../utils/jwt';

const useAccount = () => {
  const ctx = useContext(ContextAccount);
  if (!ctx) throw new Error('useAccount must be used within AccountProvider');

  const {
    account,
    setAccount,
    token,
    setToken,
    refreshToken,
    setRefreshToken,
  } = ctx;

  const loginByStorage = () => {
    const { account, token, refreshToken } = getAccount();
    const secondsToExpire = getSecondsToExpire(token);
    
    if (secondsToExpire >= 1) {
      setAccount(account);
      setToken(token);
      setRefreshToken(refreshToken);
    } else if (token) {
      removeAccount();
    }
  };

  useEffect(loginByStorage, [token]);

  const login: Login = ({ id, avatar, token, refreshToken }) => {
    if (id && token && refreshToken) {
      storeAccount({ id, avatar }, token, refreshToken);
      setRefreshToken(refreshToken);
      setAccount({ id, avatar });
      setToken(token);
    }

    router.push('/');
  };

  const logout = () => {
    setAccount({ id: null, avatar: '' });
    setToken('');
    setRefreshToken('');
    removeAccount();

    router.push('/');
  };

  return {
    account,
    token,
    refreshToken,
    login,
    logout,
  };
};

export default useAccount;