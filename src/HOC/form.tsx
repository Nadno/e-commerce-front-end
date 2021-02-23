import React, { ChangeEvent, useCallback, useState } from 'react';
import FormProps from '../interfaces/form';

export default function FormData<iniData extends { [prop: string]: any }>(
  FormComponent: React.FC<FormProps<iniData>>,
  initialData: iniData
): React.FC<FormProps<iniData>> {
  return function FormContext() {
    const [data, setData] = useState(initialData);

    const handleChange = useCallback(
      (e: ChangeEvent) => {
        const { name, value } = e.target as HTMLInputElement;
      
        if (typeof data[name] !== 'undefined') {
          setData(prev => ({
            ...prev,
            [name]: value,
          }));
        }
      },
      []
    );

    return <FormComponent data={data} handleChange={handleChange} />;
  };
}
