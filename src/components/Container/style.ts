import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  padding: 1.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 2rem;

  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 0 16px 8px ${({ theme }) => theme.colors.shadow},
    0 2px 0 ${({ theme }) => theme.colors.secondary},
    0 -2px 0 ${({ theme }) => theme.colors.secondary};

  .title {
    font-size: 2.4rem;
    color: ${({ theme }) => theme.colors.title};
  }
`;

export default Container;
