import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  border: 2px solid ${({ theme }) => theme.colors.shadow};
  background-color: ${({ theme }) => theme.colors.background};

  padding: 0.5rem 1rem;
  box-shadow: 0 8px 16px ${({ theme }) => theme.colors.shadow};

  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    outline: none;
  }
`;

const InputField = styled.div`
  label {
    display: block;
    font-size: 1.6rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  .input {
    position: relative;
    height: 4rem;
  }

  .input::after {
    content: '';

    position: absolute;
    width: calc(100% - 4px);
    height: 0.2rem;

    border-radius: 0 0 0.5rem 0.5rem;
    background-color: ${({ theme }) => theme.colors.valid};

    bottom: 0;
    left: 0;
    transform: translateX(2px);
  }

  &.invalid .input::after {
    background-color: red;
  }

  .invalid-error {
    margin-left: 1rem;
    color: tomato;

    &::before {
      content: '*';
    }
  }
`;

export { Input, InputField };
