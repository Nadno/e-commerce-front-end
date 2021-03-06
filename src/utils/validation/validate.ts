import {
  Tests,
  ValidationFunction,
  ValidationMethods,
} from '../../types/validation';
import { getInputError } from '../getError';
import { isEqual, notNull, validPattern } from './validations';

const patternFor: Record<string, RegExp> = {
  email: /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/,
  password: /^[a-zA-Z-0-9]{3,30}$/,
  tel: /^[1-9]{2} (?:[2-8]|9[1-9])[0-9]{3}[0-9]{4}$/,
  VS: /^4[0-9]{12}(?:[0-9]{3})?$/,
  MS: /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/,
};

const ERROR = {
  INVALID: 'invalid',
  EMPTY: 'empty',
  DEPENDENT_EMPTY: 'dependentEmpty',
  NOT_EQUAL: 'notEqual',
};

const NO_ERRORS = '';

function validTests(name: string, tests: Tests) {
  for (let [valid, error] of tests) {
    if (!valid()) {
      return getInputError({ name, error });
    }
  }

  return NO_ERRORS;
}

function setDefaultValidation(
  optionalInputs: string[] = []
): ValidationFunction {
  return function defaultValidation(name: string, data: any) {
    const value = data[name];

    if (!optionalInputs.includes(name)) {
      const tests: any = [[notNull(value), ERROR.EMPTY]];

      if (patternFor[name])
        tests.push([validPattern(patternFor[name], value), ERROR.INVALID]);

      return validTests(name, tests);
    }

    return NO_ERRORS;
  };
}

const SIGN_UP = 'sign-up',
  SIGN_IN = 'sign-n',
  CREDIT_CARD = 'credit-card';

const validationMethods: ValidationMethods = {
  [SIGN_IN]: {
    default: setDefaultValidation(),
  },
  [SIGN_UP]: {
    default: setDefaultValidation(['avatar']),

    confirmPassword(name: string, data: any) {
      const tests: Tests = [
        [notNull(data.password), ERROR.DEPENDENT_EMPTY],
        [notNull(data.confirmPassword), ERROR.EMPTY],
        [isEqual(data.password, data.confirmPassword), ERROR.NOT_EQUAL],
      ];

      return validTests(name, tests);
    },
  },
  [CREDIT_CARD]: {
    default: setDefaultValidation(),

    cardNumber(name: string, { cardType, cardNumber }) {
      const tests: Tests = [
        [notNull(cardNumber), ERROR.EMPTY],
        [validPattern(patternFor[cardType], cardNumber), ERROR.INVALID],
      ];

      return validTests(name, tests);
    },

    cardType(name: string, { cardType }) {
      const CARDS = ['MS', 'VS'];
      return CARDS.includes(cardType)
        ? NO_ERRORS
        : getInputError({ name, error: ERROR.INVALID });
    },

    cardValidate() {
      return NO_ERRORS;
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
  [SIGN_IN]: setValidation(SIGN_IN),
  [SIGN_UP]: setValidation(SIGN_UP),
  [CREDIT_CARD]: setValidation(CREDIT_CARD),
};

export default validate;
