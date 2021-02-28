import React, { ChangeEvent, useCallback, useState } from 'react';

export default function FormData<Props, Data extends Record<string, any>>(
  FormComponent: WrappedComponent<Data, Props>,
  initialData: Data
) {
  const Wrapper: React.FC<Props> = props => {
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

    return <FormComponent data={data} handleChange={handleChange} {...props} />;
  };

  return Wrapper;
}
