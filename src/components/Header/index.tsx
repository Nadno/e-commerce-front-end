import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="c-header">
      <nav>
        <ul className="c-header__nav">
          <li>
            Login
          </li>
          <li>
            Cadastrar
          </li>
          <li>
            Carrinho
          </li>
        </ul>
      </nav>
    </header>
  )
};

export default Header;