import React, { memo, useEffect, useState } from 'react';
import Link from '../Link';

import useAccount from '../../Hooks/useAccount';
import StyledHeader from './style';
import Avatar from '../Avatar';

const Header: React.FC = () => {
  const { account, logout } = useAccount();
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    setAvatar(account.avatar);
  }, [account]);

  return (
    <StyledHeader as="header">
      <nav>
        <ul className="list">
          <li>
            <Link href="/cart">Carrinho</Link>
          </li>

          {!!avatar && (
            <>
              <li>
                <Link href="/account">
                  <Avatar src={avatar} />
                </Link>
              </li>
              <li onClick={logout}>
                <Link href="/">Sair</Link>
              </li>
            </>
          )}
          
          {!avatar && (
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
