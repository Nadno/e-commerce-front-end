import React from 'react';
import StyledHeader from './style';

const Header: React.FC = () => {
  return (
    <StyledHeader as="header">
      <nav>
        <ul className="list">
          <li>Login</li>
          <li>Cadastrar</li>
          <li>Carrinho</li>
        </ul>
      </nav>
    </StyledHeader>
  );
};

export default Header;
