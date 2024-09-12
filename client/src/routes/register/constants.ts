import { useForm } from 'react-hook-form';
import { RegisterPageFields } from './types';

type RegisterHandler = ReturnType<typeof useForm<RegisterPageFields>>['register'];

type RegisterHandlerArgs = Parameters<RegisterHandler>[1];

export const SIGN_UP_FIELDS_CONFIG: Record<keyof RegisterPageFields, RegisterHandlerArgs> = {
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
      const validLength = value.length >= 8;
      const containsNumber = value.match(/\d+/g) != null;
      //@ts-ignore
      const containsUppercaseLetter = value.match(/\p{Lu}/u) != null;
      const containsSpecialSymbols = value.match(/[!-\/:-@[-`{-~]/) != null;

      if (validLength && containsNumber && containsUppercaseLetter && containsSpecialSymbols) {
        return true;
      }
      return 'Please set valid password';
    },
  },
};
