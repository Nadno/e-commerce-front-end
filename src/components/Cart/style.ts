import styled from 'styled-components';
import { Input } from '../Input';

export const Section = styled.section`
  .list {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 2.5rem;
  }

  .content {
    align-items: center;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
  }

  @media screen and (min-width: 350px) {
    .buttons {
      flex-direction: row;
    }

    @media screen and (min-width: 600px) {
      .cart {
        flex-direction: row;
        align-items: flex-start;
      }

      .buttons {
        max-width: 100px;
        flex-direction: column;
      }

      .content {
        flex-direction: row;
        align-items: flex-start;
      }
    }
  }
`;

export const ProductCount = styled(Input).attrs(() => ({
  type: 'number',
  placeholder: 'Quantidade',
}))`
  border-radius: 0;
  border-top-color: ${({ theme }) => theme.colors.primary};
`;

export const FinalizeOrder = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.6rem;

  .total {
    font-size: 1.8rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
  }
`;
