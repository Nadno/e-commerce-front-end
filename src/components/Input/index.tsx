import React, { ChangeEvent, InputHTMLAttributes } from 'react';
import styled from 'styled-components';

const StyledInput: any = styled.input`
  width: 100%;
  height: 4rem;
  border: 2px solid ${({ theme }) => theme.colors.shadow};
  border-radius: 0.5rem;
  background-color: #fff;

  padding: 0.5rem 1rem;
  box-shadow: 0 8px 16px ${({ theme }) => theme.colors.shadow};

  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    outline: none;
  }
`;

StyledInput.Field = styled.div`
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
`;

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  label: string;
  value: string;
  handleChange(e: ChangeEvent): void;
}

const Input: React.FC<Props> = ({
  id,
  name,
  label,
  value,
  handleChange,
  ...props
}) => {
  return (
    <StyledInput.Field>
      <label htmlFor={id}>{label}</label>
      <StyledInput
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        {...props}
      />
    </StyledInput.Field>
  );
};

export default Input;
