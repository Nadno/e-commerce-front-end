import React, { ChangeEvent, useCallback, useState } from 'react';

export default function FormData<Props, Data extends Record<string, any>>(
  FormComponent: WrappedComponent<Data, Props>,
  initialData: Data
) {
  const FormWrapper: React.FC<PropsWithoutData<Props, Data>> = props => {
    const WrappedForm = FormComponent as WrappedComponent<Data>;
    const [data, setData] = useState(initialData);

    const handleChange = useCallback((e: ChangeEvent) => {
      const { name, value } = e.target as HTMLInputElement;

      if (typeof data[name] !== 'undefined') {
        setData(prev => ({
          ...prev,
          [name]: value,
        }));
      }
    }, []);

    return <WrappedForm data={data} handleChange={handleChange} {...props} />;
  };

  return FormWrapper;
}
