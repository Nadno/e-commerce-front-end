import React, { InputHTMLAttributes } from 'react';
import { Input, InputField } from '../Input/style';

interface Props extends InputHTMLAttributes<HTMLSelectElement> {
  options: any[];
  name: string;
  label: string;
  error?: string;
  id: string;
  value: string;
}

const Select: React.FC<Props> = ({
  id,
  name,
  label,
  value,
  error,
  options,
  ...props
}) => (
  <InputField>
    <label htmlFor={id}>
      {label}
      {error && <span className="invalid-error">{error}</span>}
    </label>
    <div className="input">
      <Input name={name} id={id} {...props} as="select">
        {options.length &&
          options.map(({ value, abbr }) => (
            <option value={abbr} key={abbr}>
              {value}
            </option>
          ))}
      </Input>
    </div>
  </InputField>
);

export default Select;
