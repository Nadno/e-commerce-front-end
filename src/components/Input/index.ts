import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  height: 4rem;
  border: 2px solid ${({theme})=>theme.colors.shadow};
  border-radius: 0.5rem;
  background-color: #fff;

  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 8px 16px ${({ theme }) => theme.colors.shadow};

  font-size: 1.6rem;
  color: ${({theme})=>theme.colors.text};

  &:focus {
    outline: none;
  }
`;