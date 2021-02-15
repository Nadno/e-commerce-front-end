import React from 'react';
import NextLink, { LinkProps } from 'next/link';
import styled from 'styled-components';

const StyledButton = styled.div`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};

  a {
    font-size: 1.6rem;
    font-weight: bold;
    color: #f5f5f5;
    text-decoration: none;
  }
`;

const Link: React.FC<LinkProps> = ({ children, href, ...props }) => {
  return (
    <StyledButton>
      <NextLink href={href} passHref>
        <a {...props}>{children}</a>
      </NextLink>
    </StyledButton>
  );
};

export default Link;
