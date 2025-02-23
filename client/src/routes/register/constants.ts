import { useForm } from 'react-hook-form';
import { RegisterPageFields } from './types';

type RegisterHandler = ReturnType<typeof useForm<RegisterPageFields>>['register'];

type RegisterHandlerArgs = Parameters<RegisterHandler>[1];

export const SIGN_UP_FIELDS_CONFIG: Omit<
  Record<keyof RegisterPageFields, RegisterHandlerArgs>,
  'role'
> = {
  name: {
    maxLength: { value: 40, message: 'Max name length is 40 symbols' },
    minLength: { value: 4, message: 'Min name length is 4 symbols' },
    required: {
      value: true,
      message: 'Name is required',
    },
  },
  email: {
    required: {
      value: true,
      message: 'Email is required',
    },

    pattern: {
      message: 'Provide valid email!',
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
  },
  password: {
    required: {
      value: true,
      message: 'Password is required',
    },
    validate: (value) => {
      const validators: Record<string, () => boolean | string> = {
        validLength: () => (value.length >= 8 ? true : 'Password must contain 8 symbols'),
        containsNumber: () => (value.match(/\d+/g) != null ? true : 'Password must contain number'),
        hasUppercase: () =>
          value.match(/\p{Lu}/u) != null ? true : 'Password must contain uppercase letter',
        hasLowercase: () =>
          value.match(/[a-z]/) != null ? true : 'Password must contain lowercase letter',
        hasSpecialSymbols: () =>
          value.match(/[!-\/:-@[-`{-~]/) != null ? true : 'Must contain special symbol (!,_,-)',
      };

      for (const validatorKey in validators) {
        const validator = validators[validatorKey];

        const validatorResponse = validator();

        if (typeof validatorResponse === 'string') {
          return validatorResponse;
        }
      }

      return true;
    },
  },
};
