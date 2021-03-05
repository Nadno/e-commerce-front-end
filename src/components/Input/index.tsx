import React, { InputHTMLAttributes } from 'react';
import { Input, InputField } from './style';
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  label: string;
  value: string;
  error?: string;
}

const DefaultInput: React.FC<Props> = ({
  id,
  name,
  label,
  value,
  error,
  ...props
}) => {
  const isInvalid = !!error;
  const classError = isInvalid ? 'invalid' : '';

  return (
    <InputField className={classError}>
      <label htmlFor={id}>
        {label}
        {isInvalid && <span className="invalid-error">{error}</span>}
      </label>
      <div className="input">
        <Input type="text" id={id} name={name} value={value} {...props} />
      </div>
    </InputField>
  );
};

export default DefaultInput;
