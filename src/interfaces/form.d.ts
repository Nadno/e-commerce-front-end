import { ChangeEvent } from 'react';
interface FormProps<T> {
  data: T;
  handleChange(e: ChangeEvent): void;
}

declare module '../HOC/form' {
  export type WrappedComponent<
    Data,
    Props = {},
    T = Props & FormProps<Data>
  > = React.FC<T>;
}