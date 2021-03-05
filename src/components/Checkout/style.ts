import styled from 'styled-components';
import Form from '../Form';

export const Section = styled.section`
  margin: 4rem 0;

  @media screen and (min-width: 700px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

export const CheckoutForm = styled(Form)`
  justify-content: flex-start;
`;
