import styled from 'styled-components';

const Container = styled.section`
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 
    0 0 16px 8px ${({ theme }) => theme.colors.shadow},
    0 2px 0 ${({ theme }) => theme.colors.secondary},
    0 -2px 0 ${({ theme }) => theme.colors.secondary};
`;

export default Container;