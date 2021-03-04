import React, { ChangeEvent, InputHTMLAttributes } from 'react';
import styled from 'styled-components';

export const Input: any = styled.input`
  width: 100%;
  height: 4rem;
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

Input.Field = styled.div`
  position: relative;

  label {
    display: block;
    font-size: 1.6rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  &:focus-within::after {
    content: '';

    position: absolute;
    width: calc(100% - 4px);
    height: 0.2rem;

    border-radius: 0 0 0.5rem 0.5rem;
    background-color: #83b636;

    bottom: 0.2rem;
    left: 0;
    transform: translateX(2px);
  }

  &.invalid::after {
    background-color: red;
  }

  .invalid-error {
    margin-left: 1rem;
    color: ${({ theme }) => theme.colors.primary};

    &::before {
      content: '*';
    }
  }
`;

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  label: string;
  value: string;
  error?: string;
  handleChange(e: ChangeEvent): void;
}

const DefaultInput: React.FC<Props> = ({
  id,
  name,
  label,
  value,
  error,
  handleChange,
  ...props
}) => {
  const isInvalid = !!error;
  const classError = isInvalid ? 'invalid' : '';

  return (
    <Input.Field className={classError}>
      <label htmlFor={id}>
        {label}
        {isInvalid && <span className="invalid-error">{error}</span>}
      </label>
      <Input
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        {...props}
      />
    </Input.Field>
  );
};

export default DefaultInput;
