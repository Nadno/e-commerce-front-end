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
`;

Form.Fieldset = styled.fieldset`
  min-width: 30rem;
  max-width: 40rem;
  padding: 0 2rem;
  border: none;

  padding-top: 4rem;

  legend {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
  }

  & > div {
    margin-bottom: 2rem;
  }
`;

export default Form;
