import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

export default function FormData<Props, Data extends Record<string, any>>(
  Component: FormComponent<Data, Props>,
  initialData: Data,
  validate: Function,
  optionalData: string[] = []
) {
  type InputNames = keyof Data;

  const FormWrapper: React.FC<Omit<Props, keyof FormProps<Data>>> = props => {
    const [data, setData] = useState(initialData);
    const [changedInput, setChangedInput] = useState<InputNames>('');
    const [inputError, setInputError] = useState<InputError<InputNames>>({});

    const defineRequiredInputs = useCallback(() => {
      const error = Object.keys(data).reduce(
        (acc: any, input) =>
          optionalData.includes(input) ? acc : ((acc[input] = ''), acc),
        {}
      );

      setInputError(() => error);
    }, []);

    useEffect(defineRequiredInputs, []);

    const deleteInputError = useCallback(
      (error: any) =>
        Object.keys(error).reduce(
          (acc: any, key) =>
            key !== changedInput ? ((acc[key] = ''), acc) : acc,
          {}
        ),
      [changedInput]
    );

    const handleValidate = useCallback(() => {
      if (!changedInput) return;

      const error: string = validate(
        changedInput,
        data,
        optionalData.includes(changedInput as string)
      );

      if (error) {
        setInputError(prev => ({
          ...prev,
          [changedInput]: error,
        }));
      } else {
        setInputError(deleteInputError);
      }
    }, [data, changedInput]);

    useEffect(handleValidate, [data]);

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

    const WrappedComponent = Component as FormComponent<Data>;
    return (
      <WrappedComponent
        data={data}
        inputError={inputError}
        handleChange={handleChange}
        {...props}
      />
    );
  };

  return FormWrapper;
}
