import { useContext } from 'react';
import router from 'next/router';

import { Login } from '../types/hooks';
import { ContextAccount } from '../StoreProvider';
import { storeAccount, removeAccount } from '../utils/account';

const useAccount = () => {
  const ctx = useContext(ContextAccount);
  if (!ctx) throw new Error('useAccount must be used within AccountProvider');

  const { account, setAccount, setToken, setRefreshToken, authorized } = ctx;

  const refreshAuth = () => {};
  const login: Login = ({ id, avatar, token, refreshToken }, path) => {
    if (id && token && refreshToken) {
      removeAccount();

      storeAccount({
        account: { id, avatar: avatar || '' },
        token,
        refreshToken,
      });
      setRefreshToken(refreshToken);
      setAccount({ id, avatar });
      setToken(token);
    }

    router.push(path);
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
    login,
    logout,
    refreshAuth,
    authorized,
  };
};

export default useAccount;
