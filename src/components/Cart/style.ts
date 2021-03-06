import styled from 'styled-components';
import { Input } from '../Input/style';

const Section = styled.section`  
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
      align-items: flex-end;
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

  .input::after {
    top: 0;
    border-radius: 0.5rem 0.5rem 0 0;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

export { Section };