import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  padding: 1.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 2rem;

  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 0 16px 8px ${({ theme }) => theme.colors.shadow};

  border-top: 4px solid ${({ theme }) => theme.colors.secondary};
  border-bottom: 4px solid ${({ theme }) => theme.colors.secondary};

  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .title {
    font-size: 2.4rem;
    color: ${({ theme }) => theme.colors.title};
  }

  .back-to {
    align-self: flex-start;
  }
`;

export default Container;
