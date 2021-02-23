import { useContext } from 'react';
import router from 'next/router';

import { Login } from "../hooks";
import { ContextAccount } from "../StoreProvider";
import { storeAccount, removeAccount } from '../utils/account';

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

  const login: Login = ({ id, avatar, token, refreshToken }) => {
    if (id && avatar && token && refreshToken) {
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