import React from 'react';
import styled from 'styled-components';
import Button from '../Button';
import Container from '../Container/style';

const Form = styled(Container).attrs(props => ({ ...props, as: 'form' }))`
  width: 100%;
  height: 100%;
  max-width: 750px;
  min-height: 100vh;
  padding: 4rem 2rem;
  justify-content: center;

  .input-block {
    display: grid;
    grid-template: 1fr 1fr / 1fr;
    gap: 1.5rem;
  }

  @media screen and (min-width: 550px) {
    margin: 0 auto;

    .input-block {
      grid-template: 1fr / 1fr 1fr;
      align-items: flex-end;
    }
  }
`;

const Fieldset = styled.fieldset`
  max-width: 50rem;
  width: 100%;
  border: none;

  padding-top: 2rem;
  margin-bottom: 4rem;

  legend {
    width: 100%;
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    padding-bottom: 0.2em;
    border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
  }

  & > div {
    margin-bottom: 1.5rem;
  }
`;

const Submit: React.FC<{ type?: 'primary' | 'secondary' }> = ({
  type = 'primary',
  children,
}) => {
  const buttonType = type === 'primary' ? 'Primary' : 'Secondary';
  const SubmitButton = Button[buttonType];

  return (
    <SubmitButton
      type="submit"
      style={{ maxWidth: '50rem', }}
    >
      {children}
    </SubmitButton>
  );
};

export { Form, Fieldset, Submit };
