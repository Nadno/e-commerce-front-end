import styled from 'styled-components';
import Container from '../Container/style';

const Form: any = styled(Container).attrs(() => ({ as: 'form' }))`
  justify-content: center;

  .input-block {
    display: grid;
    grid-template: 1fr 1fr / 1fr;
    gap: 1.5rem;

    @media screen and (min-width: 450px) {
      grid-template: 1fr / 1fr 1fr;
      align-items: flex-end;
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
    margin-bottom: 1.5rem;
  }
`;

Form.Submit = styled.button.attrs(props => ({ type: 'submit', ...props }))`
  cursor: pointer;
  width: 100%;
  height: 4rem;

  font-size: 1.4rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};

  border: none;
  margin-top: 3rem;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

export default Form;
