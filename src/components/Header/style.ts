import styled from 'styled-components';
import Container from '../Container/style';

const StyledHeader = styled(Container)`
  width: 100%;
  height: 5.5rem;
  padding: 0;

  border-top: none;

  nav {
    height: 100%;
    width: 100%;
  }
  

  .list {
    height: inherit;
    width: inherit;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    font-size: 2rem;
  }
`;

export default StyledHeader;
