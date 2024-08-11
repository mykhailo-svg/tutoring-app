'use client';
import * as Form from '@radix-ui/react-form';
import { useUserRegister } from './hooks/useUserRegister';
import styles from './RegisterPage.module.scss';
import { RegisterPageFields } from './types';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useCallback } from 'react';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import { appRoutes } from '@/shared/constants/routes';
import { ButtonCommon } from '@/shared/ui/buttons';
type RegisterPageProps = {};

export const RegisterPage: React.FC<RegisterPageProps> = () => {
  const { registerRequest } = useUserRegister();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterPageFields>();

  const onSubmit: SubmitHandler<RegisterPageFields> = useCallback(
    (data) => {
      registerRequest(data);
    },
    [handleSubmit]
  );

  return (
    <>
      <div className={styles.formColumn}>
        <Form.Root className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h1 className={styles.title}>Register</h1>
          <div className={styles.fields}>
            <input
              {...register('email', {
                required: {
                  value: true,
                  message: 'Email is required',
                },
                pattern: {
                  message: 'Provide valid email!',
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                },
              })}
            />

            <input
              {...register('name', {
                max: 40,
                min: 4,
                required: {
                  value: true,
                  message: 'Name is required',
                },
              })}
            />

            <input
              {...register('password', {
                required: {
                  value: true,
                  message: 'Password is required',
                },
              })}
            />

            <Form.Submit className={styles.submit}>Submit</Form.Submit>
          </div>
        </Form.Root>
      </div>

      <div className={styles.questionColumn}>
        <div className={styles.haveAccountQuestion}>Already have an account?</div>

        <ButtonCommon
          className={styles.signInButton}
          href={appRoutes.auth.login}
          isLink={true}
          text='Sign in'
        />
        
      </div>
    </>
  );
};
