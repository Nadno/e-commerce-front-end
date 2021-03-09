import React from 'react';
import NextLink, { LinkProps } from 'next/link';
import router from 'next/router';

import styled from 'styled-components';

const StyledButton = styled.button`
  cursor: pointer;
  height: 4rem;
  padding: 0.4em 1em;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1.6rem;
  font-weight: bold;
  transition: transform 0.2s ease;

  &:active {
    transform: scale(0.95) !important;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const Primary = styled(StyledButton)`
  width: 100%;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary};

  &:hover {
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.background},
      0 0 0 4px ${({ theme }) => theme.colors.primary};
  }
`;

const Secondary = styled(StyledButton)`
  position: relative;
  transform-style: preserve-3d;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.secondary};
  border: 2px solid ${({ theme }) => theme.colors.secondary};

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.secondary};

    z-index: -1;
    transform: translateY(100%);
    transition: transform 250ms ease;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.white};

    &::before {
      transform: translateX(0);
    }
  }


  &:focus {
    outline: none;
    color: ${({ theme }) => theme.colors.white};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.background},
      0 0 0 4px ${({ theme }) => theme.colors.secondary};

    &::before {
      transform: translateX(0);
    }
  }
`;

const Link: React.FC<LinkProps> = ({ children, href, ...props }) => {
  return (
    <NextLink href={href} passHref>
      <Secondary {...props} as="a">
        {children}
      </Secondary>
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
