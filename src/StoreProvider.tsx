import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import router from 'next/router';
import { getAccount, removeAccount, storeAccount } from './utils/account';
import getSecondsToExpire from './utils/jwt';
interface Account {
  id: number | null;
  avatar: string;
}

interface AccountProvider {
  account: Account;
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
    avatar: '',
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
    } else if (token) {
      removeAccount();
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


const useAccount = () => {
  const ctx = useContext<AccountProvider | null>(ContextAccount);
  if (!ctx) throw new Error('useAccount must be used within AccountProvider');

  const {
    account,
    setAccount,
    token,
    setToken,
    refreshToken,
    setRefreshToken,
  } = ctx;

  const login = ({ id, avatar, token, refreshToken }: any) => {
    if (id && avatar && token && refreshToken) {
      storeAccount({ id, avatar }, token, refreshToken);
      setRefreshToken(refreshToken);
      setAccount({ id, avatar });
      setToken(token);
    }

    router.push('/');
  };

  const logout = () => {
    setAccount({});
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