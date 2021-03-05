import { getInputError } from './getError';
import { isEqual, notNull, validPattern } from './validations';

const patternFor: Record<string, RegExp> = {
  email: /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/,
  password: /^[a-zA-Z-0-9]{6,30}$/,
  tel: /^[1-9]{2} (?:[2-8]|9[1-9])[0-9]{3}[0-9]{4}$/,
};

const ERROR = {
  INVALID: 'invalid',
  EMPTY: 'empty',
  DEPENDENT_EMPTY: 'dependentEmpty',
  NOT_EQUAL: 'notEqual',
};

function validTests(name: string, tests: any) {
  for (let [valid, error] of tests) {
    if (!valid()) {
      return getInputError({ name, error });
    }
  }

  return '';
}

function setDefaultValidation(optionalInputs: string[] = []) {
  return function defaultValidation(name: string, data: any) {
    const value = data[name];

    if (!optionalInputs.includes(name)) {
      const tests: any = [[notNull(value), ERROR.EMPTY]];

      if (patternFor[name])
        tests.push([validPattern(patternFor[name], value), ERROR.INVALID]);
      
      return validTests(name, tests);
    }

    return '';
  };
}
const validationMethods: Record<string, any> = {
  'sign-in': {
    default: setDefaultValidation(),
  },
  'sign-up': {
    default: setDefaultValidation(['avatar']),

    confirmPassword(name: string, data: any) {
      const tests = [
        [notNull(data.password), ERROR.DEPENDENT_EMPTY],
        [notNull(data.confirmPassword), ERROR.EMPTY],
        [isEqual(data.password, data.confirmPassword), ERROR.NOT_EQUAL],
      ];
  
      return validTests(name, tests);
    },
  },
};

function setValidation(
  validationName: string
): (name: string, data: any) => string {
  const validation = validationMethods[validationName];

  return function validate(name, data) {
    if (validation[name] != null) {
      return validation[name](name, data);
    } else {
      return validation.default(name, data);
    }
  };
}

const validate: any = {
  'sign-in': setValidation('sign-in'),
  'sign-up': setValidation('sign-up'),
};

export default validate;
