'use client';
import * as Form from '@radix-ui/react-form';
import { useUserRegister } from './hooks/useUserRegister';
import styles from './RegisterPage.module.scss';
import { RegisterPageFields } from './types';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useCallback, useState } from 'react';
import { appRoutes } from '@/shared/constants/routes';
import { ButtonCommon } from '@/shared/ui/buttons';
import { CommonTextField } from '@/shared/ui/buttons/inputs';
import * as Toast from '@radix-ui/react-toast';
import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { useToggle } from '@/shared/hooks/useToggle';

type RegisterPageProps = {};

export const RegisterPage: React.FC<RegisterPageProps> = () => {
  const { registerRequest, error: registrationError } = useUserRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterPageFields>();

  const onSubmit: SubmitHandler<RegisterPageFields> = useCallback(
    (data) => {
      registerRequest(data);
    },
    [handleSubmit]
  );

  const isPasswordVisibleState = useToggle(false);

  return (
    <Toast.Provider>
      <div className={styles.formColumn}>
        <Form.Root className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h1 className={styles.title}>Register</h1>
          <div className={styles.fields}>
            <CommonTextField
              semanticId='name'
              register={{
                ...register('name', {
                  maxLength: { value: 40, message: 'Max name length is 40 symbols' },
                  minLength: { value: 4, message: 'Min name length is 4 symbols' },
                  required: {
                    value: true,
                    message: 'Name is required',
                  },
                }),
              }}
              type='text'
              error={errors.name ? errors.name.message : ''}
              label='Name'
              placeholder='Name Surname'
            />
            <CommonTextField
              semanticId='email'
              register={{
                ...register('email', {
                  required: {
                    value: true,
                    message: 'Email is required',
                  },

                  pattern: {
                    message: 'Provide valid email!',
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  },
                }),
              }}
              error={errors.email ? errors.email.message : ''}
              label='Email'
              type='email'
              placeholder='example@mail.com'
            />

            <CommonTextField
              type={isPasswordVisibleState.isActive ? 'text' : 'password'}
              semanticId='password'
              suffix={
                <div className={styles.passwordToggler} onClick={isPasswordVisibleState.toggle}>
                  {isPasswordVisibleState.isActive ? <EyeOpenIcon /> : <EyeNoneIcon />}
                </div>
              }
              register={{
                ...register('password', {
                  required: {
                    value: true,
                    message: 'Password is required',
                  },
                  // validate: (value) => {
                  //   const validLength = value.length >= 8;
                  //   const containsNumber = value.match(/\d+/g) != null;
                  //   const containsUppercaseLetter = value.match(/\p{Lu}/u) != null;
                  //   const containsSpecialSymbols = value.match(/[!-\/:-@[-`{-~]/) != null;

                  //   console.log(`

                  //     length:${validLength}
                  //     number:${containsNumber}
                  //     uppercase:${containsUppercaseLetter}
                  //     symbol:${containsSpecialSymbols}
                  //     `);

                  //   if (
                  //     validLength &&
                  //     containsNumber &&
                  //     containsUppercaseLetter &&
                  //     containsSpecialSymbols
                  //   ) {
                  //     return '';
                  //   }
                  //   return 'Please set valid password';
                  // },
                }),
              }}
              error={errors.password ? errors.password.message : ''}
              label='Password'
              placeholder='Create password'
            />

            <ButtonCommon className={styles.submit} as='button' text='Submit' type='submit' />
          </div>
        </Form.Root>
      </div>

      <div className={styles.questionColumn}>
        <div className={styles.haveAccountQuestion}>Already have an account?</div>

        <ButtonCommon
          className={styles.signInButton}
          as='a'
          href={appRoutes.auth.login}
          text='Sign in'
        />
      </div>
    </Toast.Provider>
  );
};
