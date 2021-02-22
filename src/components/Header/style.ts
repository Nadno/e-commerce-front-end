import styled from 'styled-components';
import Container from '../Container';

const StyledHeader = styled(Container)`
  width: 100%;
  height: 5rem;
  padding: 0;

  nav {
    height: 100%;
  }

  li {
    cursor: pointer;
    min-width: 10rem;
    height: 100%;

    a {
      height: 100%;
      text-decoration: none;
      color: ${({ theme }) => theme.colors.title};
      display: flex;
      justify-content: center;
      align-items: center;

      transition: background-color 0.5s ease;

      &:hover {
        background-color: ${({ theme }) => theme.colors.secondary};
        color: ${({ theme }) => theme.colors.white};
      }
    }
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
