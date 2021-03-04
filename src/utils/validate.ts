import { getInputError } from './getError';
import { notNull, validPattern } from './validations';

const patternFor: Record<string, RegExp> = {
  email: /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/,
  password: /^[a-zA-Z-0-9]{6,30}$/,
  phone: /\d{2}\s\9\d{4}\-\d{4}/,
};

const ERROR = {
  INVALID: 'invalid',
  EMPTY: 'empty',
};

function validTests(name: string, tests: any) {
  for (let [valid, error] of tests) {
    if (!valid()) {
      return getInputError({ name, error });
    }
  }

  return '';
}

function defaultValidation(name: string, value: any) {
  const tests: any = [[notNull(value), ERROR.EMPTY]];

  if (patternFor[name])
    tests.push([validPattern(patternFor[name], value), ERROR.INVALID]);

  return validTests(name, tests);
}

function setValidation(validation: any):
  (name: string, value: any) => string {
  return function validate(name: string, value: any) {
    if (validation[name] != null) {
      return validation[name](name, value);
    } else if (typeof value == 'string') {
      return defaultValidation(name, value);
    }
  };
}
const validation: Record<string, Function> = {};
const validate: any = {
  'sign-in': setValidation(validation['sign-in'] || {}),
};

export default validate;
