import styled from 'styled-components';

const StyledProduct = styled.li`
  width: 28rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  gap: 2.5rem;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0px 0px 8px 1px ${({ theme }) => theme.colors.shadow};
  background-color: ${({ theme }) => theme.colors.white};

  .img {
    width: 100%;
    object-fit: cover;
    margin-bottom: 2rem;
  }

  .info {
    width: 100%;
    font-size: 1.4rem;
  }

  .title {
    font-size: 2rem;
  }

  .price {
    font-size: 2.4rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.secondary};
  }

  .more {
    margin-top: 2rem;
  }
`;

export default StyledProduct;
