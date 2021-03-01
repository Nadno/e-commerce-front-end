import styled from 'styled-components';

const Form: any = styled.form`
  height: 100%;
  min-height: 100vh;
  padding: 4rem 2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 0 16px 4px ${({ theme }) => theme.colors.white};
  border-top: 4px solid ${({ theme }) => theme.colors.secondary};
  border-bottom: 4px solid ${({ theme }) => theme.colors.secondary};

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

Form.Submit = styled.button.attrs((_) => ({ type: 'submit' }))`
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
