import styled from 'styled-components';
import Container from '../Container/style';

const StyledHeader = styled(Container)`
  width: 100%;
  padding: 0.8rem;

  border-top: none;

  nav {
    height: 100%;
    width: 100%;
  }

  a {
    height: 3.5rem;
    padding: 0.4em;
  }

  .list {
    height: inherit;
    width: inherit;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    font-size: 1.8rem;
  }
`;

export default StyledHeader;
