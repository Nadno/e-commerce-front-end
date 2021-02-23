import React, {
  createContext,
  useEffect,
  useState,
} from 'react';


import { getAccount, removeAccount } from './utils/account';
import getSecondsToExpire from './utils/jwt';

import { StoreProvider, Account } from './hooks';

export const ContextAccount = createContext<StoreProvider | null>(null);

const Store: React.FC = ({ children }) => {
  const [account, setAccount] = useState<Account>({
    id: null,
    avatar: '',
  });
  const [token, setToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [cart, setCart] = useState<string[]>([]);

  const loginByStorage = () => {
    const { account, token, refreshToken } = getAccount();
    const secondsToExpire = getSecondsToExpire(token);
    
    if (secondsToExpire >= 1) {
      console.log('***login')
      setAccount(account);
      setToken(token);
      setRefreshToken(refreshToken);
    } else if (token) {
      removeAccount();
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
      }}
    >
      {children}
    </ContextAccount.Provider>
  );
};

export default Store;
