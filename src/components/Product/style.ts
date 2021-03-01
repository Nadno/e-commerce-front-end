import styled from 'styled-components';

const ListItem = styled.li`
  width: 100%;

  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  box-shadow: 0 -4px 0 ${({ theme }) => theme.colors.primary},
    0 0 16px 8px ${({ theme }) => theme.colors.shadow};
  background-color: white;

  gap: 2.5rem;

  .img {
    width: 100%;
    object-fit: cover;
    margin-bottom: 2rem;
  }

  &.cart {
    .img {
      height: 8rem;
      width: 8rem;
    }
  }
`;

export const ProductContent = styled.div.attrs(() => ({
  className: 'content'
}))`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 2rem;

  .info {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .title {
    font-size: 2rem;
  }

  .description {
    display: block;
    font-size: 1.6rem;
  }

  .price {
    font-size: 2.4rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export default ListItem;
