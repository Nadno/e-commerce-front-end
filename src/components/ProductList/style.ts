import styled from 'styled-components';
import Container from '../Container';

const StyledProductList = styled(Container)`
  width: 100%;
  padding: 4rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    font-size: 2.4rem;
    color: ${({ theme }) => theme.colors.title};
    margin: 2rem 0;
  }

  .list {
    width: 100%;
    list-style: none;
    padding-top: 4rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 24rem));
    justify-content: center;
    gap: 2rem;
  }
`;

export default StyledProductList;
