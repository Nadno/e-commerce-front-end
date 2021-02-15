import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="c-header">
      <nav>
        <ul className="c-header__nav">
          <li>
            Ínicio
          </li>
          <li>
            Categorias
          </li>
          <li>
            Filtrar
          </li>
        </ul>
      </nav>
    </header>
  )
};

export default Header;