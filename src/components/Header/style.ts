import styled from 'styled-components';

const StyledHeader = styled.header`
  width: 100vw;
  height: 5rem;
  max-width: 750px;
  margin: 0 auto;

  box-shadow: 0 0 8px 1px ${({ theme }) => theme.colors.shadow};
  border-radius: 0 0 4rem 4rem;
  background-color: var(--color-white);

  nav {
    height: 100%;
  }

  .list {
    display: block;
    height: 100%;
    list-style: none;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 2rem;
  }
`;

export default StyledHeader;
