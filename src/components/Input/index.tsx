import React, { InputHTMLAttributes } from 'react';
import { Input as StyledInput, InputField as Field } from './style';
interface Props<T> extends InputHTMLAttributes<T> {
  id: string;
  name: string;
  label: string;
  value: string;
  error?: string;
}

export interface InputFieldProps <Element> extends Props<Element> {
  Input: any;
  as?: string;
}

function InputField<Element>({
  id,
  name,
  label,
  value,
  error,
  Input,
  children,
  ...props
}: InputFieldProps<Element>) {
  return (
    <Field className={error ? 'invalid' : ''}>
      <label htmlFor={id}>
        {label}
        {error && <span className="invalid-error">{error}</span>}
      </label>
      <div className="input">
        <Input type="text" id={id} name={name} value={value} {...props}>
          {children}
        </Input>
      </div>
    </Field>
  );
}


const Input: React.FC<Props<HTMLInputElement>> = props => (
  <InputField Input={StyledInput} {...props} />
);

export { Input, InputField };
