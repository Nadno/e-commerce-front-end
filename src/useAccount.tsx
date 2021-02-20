import React, { createContext, useState } from 'react';

interface Account {
  id: number | null;
  email: string;
  token: string;
  refreshToken: string;
}

interface AccountProvider {
  account: {
    id: number | null;
    email: string;
    token: string;
    refreshToken: string;
  },
  setAccount: Function;
}

const ContextAccount = createContext<AccountProvider | null>(null);

export const accountProvider: React.FC = ({ children }) => {
  const [account, setAccount] = useState<Account>({
    id: null,
    email: '',
    token: '',
    refreshToken: '',
  });
  
  return (
    <ContextAccount.Provider
      value={{
        account,
        setAccount,
      }}
    >
      {children}
    </ContextAccount.Provider>
  );
};
