'use client';
import * as Form from '@radix-ui/react-form';
import styles from './LoginPage.module.scss';
import { Button } from '@/shared/ui/buttons';
import { appRoutes } from '@/shared/constants/routes';
import { TextField } from '@/shared/ui/inputs';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginPageFields } from './types';
import { useLogin } from './hooks';
import { useCallback, useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';

export const LoginPage = () => {
  const { setAuthState } = useAuth();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<LoginPageFields>();

  const { loginRequest, isLoading, data: loginResponse } = useLogin();

  const onSubmit: SubmitHandler<LoginPageFields> = useCallback(
    (data) => {
      loginRequest(data);
    },
    [loginRequest]
  );

  useEffect(() => {
    if (loginResponse?.data) {
      setAuthState(() => ({ user: loginResponse.data }));

      redirect(appRoutes.home);
    }
  }, [loginResponse]);

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
            register={register('email', {
              required: {
                message: 'Email is required!',
                value: true,
              },
            })}
            error={errors.email?.message}
            semanticId='email'
            label='Email'
            placeholder='example@mail.com'
          />
          <TextField
            register={register('password', {
              required: {
                message: 'Password is required!',
                value: true,
              },
            })}
            error={errors.password?.message}
            semanticId='password'
            label='Password'
            placeholder='Your password'
          />

          <div className={styles.submit}>
            <div className={styles.plainQuestion}>
              Don't have an account?
              <Button as='a' href={appRoutes.auth.register} variant='plain' text='Create it!' />
            </div>
            <Button loading={isLoading} text='Submit' variant='primary' as='button' type='submit' />
          </div>
        </Form.Root>
      </div>
    </div>
  );
};
