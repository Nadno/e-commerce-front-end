import styled from 'styled-components';
import { Input } from '../Input';

export const Section = styled.section`
  height: 100%;

  .list {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 2.5rem;
  }

  .buttons {
    width: 8rem;
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
  
`;