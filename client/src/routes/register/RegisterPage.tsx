'use client';
import * as Form from '@radix-ui/react-form';
import { useUserRegister } from './hooks/useUserRegister';
import styles from './RegisterPage.module.scss';
import { RegisterPageFields } from './types';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useCallback, useMemo } from 'react';
import { appRoutes } from '@/shared/constants/routes';
import { ButtonCommon } from '@/shared/ui/buttons';
import { CommonTextField } from '@/shared/ui/buttons/inputs';
type RegisterPageProps = {};

export const RegisterPage: React.FC<RegisterPageProps> = () => {
  const { registerRequest } = useUserRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterPageFields>();

  const errorMessages = useMemo(() => {
    const displayedErrors: Record<keyof typeof errors, string> = {
      email: '',
      password: '',
      name: '',
      root: '',
    };
    console.log('errors');

    for (let field in displayedErrors) {
      const fieldKey = field as keyof typeof errors;

      const error = errors[fieldKey];

      if (error && error.message) {
        displayedErrors[fieldKey] = error?.message ?? '';
      } else {
        displayedErrors[fieldKey] = '';
      }
    }

    return displayedErrors;
  }, [errors]);

  const onSubmit: SubmitHandler<RegisterPageFields> = useCallback(
    (data) => {
      registerRequest(data);
    },
    [handleSubmit]
  );
  console.log(errors);

  return (
    <>
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
              error={errors.name ? errors.name.message : ''}
              label='Name'
              placeholder=''
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
              placeholder=''
            />

            <CommonTextField
              semanticId='password'
              register={{
                ...register('password', {
                  required: {
                    value: true,
                    message: 'Password is required',
                  },
            
                }),
              }}
              error={errors.password ? errors.password.message : ''}
              label='Password'
              placeholder=''
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
    </>
  );
};
