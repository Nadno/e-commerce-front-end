
export type ValidationFunction = (name: string, data: any) => string;
export type ValidationMethods = Record<
  string,
  Record<string, ValidationFunction>
>;

export type Tests = [() => boolean, string][];
