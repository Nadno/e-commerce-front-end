import styled from 'styled-components';
import Button from '../Button';
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

Form.SubmitPrimary = styled(Button.Primary).attrs(props => ({
  type: 'submit',
  ...props,
}))`
  height: 4rem;
  margin-top: 3rem;
`;

Form.SubmitSecondary = styled(Button.Secondary).attrs(props => ({
  type: 'submit',
  ...props,
}))``;

export default Form;
