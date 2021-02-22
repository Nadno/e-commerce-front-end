import React, { memo, useEffect, useState } from 'react';
import Link from 'next/link';

import useAccount from '../../useAccount';
import StyledHeader from './style';


const Header: React.FC = () => {
  const { account } = useAccount();
  const [email, setEmail] = useState('');

  useEffect(() => {
    setEmail(account.email);
  }, [account]);

  return (
    <StyledHeader as="header">
      <nav>
        <ul className="list">
          {!!email && <li>Conta</li>}
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
          <li>Carrinho</li>
        </ul>
      </nav>
    </StyledHeader>
  );
};

export default memo(Header);
