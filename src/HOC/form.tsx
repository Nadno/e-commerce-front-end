import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

export default function FormData<Props, Data extends Record<string, any>>(
  Component: WrappedComponent<Data, Props>,
  initialData: Data,
  validate: Function
) {
  type InputNames = keyof Data;

  const FormWrapper: React.FC<WrapperProps> = props => {
    const [data, setData] = useState(initialData);
    const [invalid, setInvalid] = useState(true);
    const [changedInput, setChangedInput] = useState<InputNames>('');
    const [inputError, setInputError] = useState<InputError<InputNames>>({});

    const handleValidate = useCallback(() => {
      if (!changedInput) return;
      const zeroDotFourSeconds = 400;

      const timeoutId = setTimeout(() => {
        const error: string = validate(changedInput, data);
        if (error) {
          setInputError(prev => ({
            ...prev,
            [changedInput]: error,
          }));
          setInvalid(() => true);
        } else {
          setInputError(prev => (delete prev[changedInput] ? prev : {}));
          setInvalid(() => false);
        }
      }, zeroDotFourSeconds);

      return () => clearTimeout(timeoutId);
    }, [data, changedInput]);

    useEffect(handleValidate, [data, changedInput]);

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      if (data[name] != null) {
        setData(prev => ({
          ...prev,
          [name]: value,
        }));
        setChangedInput(() => name);
      }
    }, []);

    const WrappedComponent = Component as WrappedComponent<Data>;
    return (
      <WrappedComponent
        data={data}
        invalid={invalid}
        inputError={inputError}
        handleChange={handleChange}
        {...props}
      />
    );
  };

  return FormWrapper;
}
