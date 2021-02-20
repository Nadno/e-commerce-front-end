import styled from 'styled-components';
import Container from '../Container';

const StyledHeader = styled(Container)`
  width: 100vw;
  height: 5rem;
  max-width: var(--maxWidth);
  margin: 0 auto;

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
