import styled from 'styled-components';

const StyledProductList = styled.section`
  width: 100%;
  margin-top: 8rem;
  padding: 0 4rem;

  .title {
    font-size: 2.4rem;
    color: ${({ theme }) => theme.colors.title};
  }

  .list {
    list-style: none;
    padding-top: 4rem;
    display: grid;
    gap: 2rem;
  }
`;

export default StyledProductList;
