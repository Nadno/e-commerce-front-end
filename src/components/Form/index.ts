import styled from 'styled-components';
import Container from '../Container/style';

const Form: any = styled(Container).attrs(() => ({ as: 'form' }))`
  height: 100%;
  min-height: 100vh;
  justify-content: center;

  @media screen and (min-width: 450px) {
    .input-block {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 1rem;
    }
  }
`;

Form.Fieldset = styled.fieldset`
  max-width: 50rem;
  width: 100%;
  padding: 0 2rem;
  border: none;

  padding-top: 2rem;
  margin-bottom: 4rem;

  legend {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
  }

  & > div {
    margin-bottom: 2rem;
  }
`;

Form.Submit = styled.button.attrs(() => ({ type: 'submit' }))`
  cursor: pointer;
  width: 100%;
  height: 4rem;

  font-size: 1.4rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};

  border: none;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

export default Form;
