import { ChangeEvent } from 'react';

declare module '../HOC/form' {
  type InputError<Names> = Partial<Record<Names, string>>;
  interface FormProps<Data> {
    data: Data;
    invalid: boolean;
    inputError: InputError<keyof Data>;
    handleChange(e: ChangeEvent): void;
  }

  export type WrappedComponent<
    Data,
    Props = {},
    T = Props & FormProps<Data>
  > = React.FC<T>;

  export type WrapperProps = Omit<Props, keyof FormProps<Data>>;
}
