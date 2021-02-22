import React, { memo, useEffect, useState } from 'react';
import Link from 'next/link';

import useAccount from '../../useAccount';
import StyledHeader from './style';

const Header: React.FC = () => {
  const { account, logout } = useAccount();
  const [email, setEmail] = useState('');

  useEffect(() => {
    setEmail(account.email);
  }, [account]);

  return (
    <StyledHeader as="header">
      <nav>
        <ul className="list">
          <li>
            <Link href="/cart">Carrinho</Link>
          </li>

          {!!email && (
            <>
              <li>
                <Link href="/account">Conta</Link>
              </li>
              <li onClick={logout}>
                <Link href="/">Sair</Link>
              </li>
            </>
          )}
          
          {!email && (
            <>
              <li>
                <Link href="/sign-in">Login</Link>
              </li>
              <li>
                <Link href="/sign-up">Cadastrar</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </StyledHeader>
  );
};

export default memo(Header);
