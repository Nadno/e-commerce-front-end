import React, { memo } from 'react';
import Link from '../Link';

import useAccount from '../../hooks/useAccount';
import StyledHeader from './style';
import Avatar from '../Avatar';

const Header: React.FC = () => {
  const { account, logout } = useAccount();

  return (
    <StyledHeader as="header">
      <nav>
        <ul className="list">
          <li>
            <Link href="/cart">Carrinho</Link>
          </li>

          {!!account.id && (
            <>
              <li>
                <Link href="/account">
                  <Avatar src={account.avatar} />
                </Link>
              </li>
              <li onClick={logout}>
                <Link href="/">Sair</Link>
              </li>
            </>
          )}
          
          {!account.id && (
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
