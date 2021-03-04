import React from 'react';
import NextLink, { LinkProps } from 'next/link';
import router from 'next/router';

import styled from 'styled-components';

const StyledButton = styled.button`
 cursor: pointer;
  height: 4rem;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1.6rem;
  font-weight: bold;
  color: #f5f5f5;
  border: none;
`;

const Primary = styled(StyledButton)`
  width: 100%;
  max-width: 30rem;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const Secondary = styled(StyledButton)`
  color: ${({ theme }) => theme.colors.secondary};
  border: 2px solid ${({ theme }) => theme.colors.secondary};
`;

const Link: React.FC<LinkProps> = ({ children, href, ...props }) => {
  return (
    <NextLink href={href} passHref>
      <Primary {...props} as="a">
        {children}
      </Primary>
    </NextLink>
  );
};

interface BackProps {
  className?: string;
}

const Back: React.FC<BackProps> = ({ className = '' }) => {
  return (
    <Secondary
      style={{ width: '10rem' }}
      onClick={() => router.back()}
      className={className}
    >
      Voltar
    </Secondary>
  );
};

export default { Primary, Secondary, Link, Back };
