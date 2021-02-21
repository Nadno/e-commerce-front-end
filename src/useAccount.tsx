import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { getAccount, removeAccount, storeAccount } from './utils/account';
import getSecondsToExpire from './utils/jwt';
interface Account {
  id: number | null;
  email: string;
}

interface AccountProvider {
  account: {
    id: number | null;
    email: string;
  };
  token: string;
  refreshToken: string;
  setAccount: Function;
  setToken: Function;
  setRefreshToken: Function;
}

const ContextAccount = createContext<AccountProvider | null>(null);

export const AccountProvider: React.FC = ({ children }) => {
  const [account, setAccount] = useState<Account>({
    id: null,
    email: '',
  });
  const [token, setToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  const loginByStorage = () => {
    const { account, token, refreshToken } = getAccount();
    const secondsToExpire = getSecondsToExpire(token);
    
    if (secondsToExpire >= 1) {
      setAccount(account);
      setToken(token);
      setRefreshToken(refreshToken);
    } else {

    }
  };

  useEffect(loginByStorage, []);

  return (
    <ContextAccount.Provider
      value={{
        account,
        setAccount,
        token,
        setToken,
        refreshToken,
        setRefreshToken,
      }}
    >
      {children}
    </ContextAccount.Provider>
  );
};