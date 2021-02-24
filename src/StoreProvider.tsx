import React, {
  createContext,
  useState,
} from 'react';

import { StoreProvider, Account } from './interfaces/hooks';

export const ContextAccount = createContext<StoreProvider | null>(null);

const Store: React.FC = ({ children }) => {
  const [account, setAccount] = useState<Account>({
    id: null,
    avatar: '',
  });
  const [token, setToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [cart, setCart] = useState<string[]>([]);

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
