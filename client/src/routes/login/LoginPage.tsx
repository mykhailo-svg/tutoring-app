'use client';
import * as Form from '@radix-ui/react-form';
import styles from './LoginPage.module.scss';
import { Button } from '@/shared/ui/buttons';
import { appRoutes } from '@/shared/constants/routes';
import { TextField } from '@/shared/ui/inputs';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RegisterPageFields } from '../register/types';
import { LoginPageFields } from './types';
import { SIGN_UP_FIELDS_CONFIG } from '../register/constants';
import { useLogin } from './hooks';
import { useCallback } from 'react';

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPageFields>();

  const { loginRequest } = useLogin();

  const onSubmit: SubmitHandler<LoginPageFields> = useCallback(
    (data) => {
      loginRequest(data);
    },
    [loginRequest]
  );

  return (
    <div className={styles.row}>
      <div className={styles.questionColumn}>
        <h2>Want to create an account?</h2>
        <Button as='a' variant='secondary' text='Sign up' href={appRoutes.auth.register} />
      </div>

      <div className={styles.formColumn}>
        <h1>Log in</h1>

        <Form.Root onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <TextField
            register={register('email')}
            semanticId='email'
            label='Email'
            placeholder='example@mail.com'
          />
          <TextField
            register={register('password')}
            semanticId='password'
            label='Password'
            placeholder='Your password'
          />

          <div className={styles.submit}>
            <div className={styles.plainQuestion}>
              Don't have an account?
              <Button as='a' href={appRoutes.auth.register} variant='plain' text='Create it!' />
            </div>
            <Button text='Submit' variant='primary' as='button' type='submit' />
          </div>
        </Form.Root>
      </div>
    </div>
  );
};
