import styled from 'styled-components';

const Section = styled.section`
  .list {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 2.5rem;
  }

  img {
    max-width: 300px;
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

    @media screen and (min-width: 400px) {
      .content {
        flex-direction: row;
      }

      .buttons {
        max-width: 120px;
        flex-direction: column;
      }

      @media screen and (min-width: 520px) {
        .cart {
          column-gap: 2rem;
          flex-direction: row;
          align-items: flex-start;

          img {
            max-width: 150px;
          }
        }

        @media screen and (min-width: 600px) {
        }
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
