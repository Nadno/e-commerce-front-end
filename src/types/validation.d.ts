export type ValidationFunction = (
  name: string,
  data: Record<string, any>,
  optional?: boolean
) => string;
export type ValidationMethods = Record<
  string,
  Record<string, ValidationFunction>
>;

export type Tests = [() => boolean, string][];
