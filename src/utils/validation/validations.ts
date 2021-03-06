export const validPattern = (pattern: RegExp, value: string) => (): boolean =>
  new RegExp(pattern).test(value);

export const isEqual = (
  firstValue: string,
  secondValue: string
) => (): boolean => firstValue === secondValue;

export const notNull = (value: string) => (): boolean => value.trim() !== '';