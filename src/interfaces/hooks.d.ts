import React, { SetStateAction, Dispatch } from 'react';

export interface Account {
  id: number | null;
  avatar: string;
}

interface Token {
  token: string;
  refreshToken: string;
}

export interface StoreProvider extends Token {
  account: Account;
  cart: string[];
  setAccount: Dispatch<SetStateAction<Account>>;
  setToken: Dispatch<SetStateAction<string>>;
  setRefreshToken: Dispatch<SetStateAction<string>>;
  setCart: Dispatch<SetStateAction<string[]>>;
}

interface LoginData extends Account {};
interface LoginData extends Token {};

export type Login = ({}: LoginData) => void;

export type CartAction = (id: string) => void;
