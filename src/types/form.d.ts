import { ChangeEvent } from 'react';

declare module '../HOC/form' {
  type InputError<Names> = Partial<Record<Names, string>>;
  export interface FormProps<Data> {
    data: Data;
    invalid: boolean;
    inputError: InputError<keyof Data>;
    handleChange(e: ChangeEvent): void;
  }

  export type FormComponent<
    Data,
    Props = {},
    T = Props & FormProps<Data>
  > = React.FC<T>;

  export type WrapperProps<Data, Props> = Omit<Props, keyof FormProps<Data>>;
}
