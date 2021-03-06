export const validPattern = (pattern: RegExp, value: string) => (): boolean =>
  new RegExp(pattern).test(value);

export const lessOrEqualThan = (
  firstValue: number,
  secondValue: number
) => (): boolean => firstValue <= secondValue;

export const biggerOrEqualThan = (
  firstValue: number,
  secondValue: number
) => (): boolean => firstValue >= secondValue;

export const isEqual = (
  firstValue: string,
  secondValue: string
) => (): boolean => firstValue === secondValue;

export const notNull = (value: string) => (): boolean => value.trim() !== '';
