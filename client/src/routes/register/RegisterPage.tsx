'use client';
import * as Form from '@radix-ui/react-form';
import { useUserRegister } from './hooks/useUserRegister';
import styles from './RegisterPage.module.scss';
import { RegisterPageFields } from './types';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useCallback, useEffect, useMemo } from 'react';
import { appRoutes } from '@/shared/constants/routes';
import { Button } from '@/shared/ui/buttons';
import { TextField } from '@/shared/ui/inputs';
import * as Toast from '@radix-ui/react-toast';
import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { useToggle } from '@/shared/hooks/useToggle';
import { CommonToast } from '@/shared/ui/toasts';
import { COMMON_TOAST_TONE } from '@/shared/ui/toasts/CommonToast/types';
import { SIGN_UP_FIELDS_CONFIG } from './constants';
import { useRouter } from 'next/navigation';

type RegisterPageProps = {};

export const RegisterPage: React.FC<RegisterPageProps> = () => {
  const router = useRouter();

  const {
    registerRequest,
    isError: hasRegistrationError,
    error: registrationError,
    isLoading: pendingRegistration,
    data: registrationResponse,
  } = useUserRegister();

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
  useEffect(() => {
    if (registrationResponse) {
      router.push('/');
    }
  }, [registrationResponse]);

  const isPasswordVisibleState = useToggle(false);

  const isToastActiveState = useToggle(true);

  useEffect(() => {
    isToastActiveState.setValue(hasRegistrationError);
  }, [hasRegistrationError, isToastActiveState.setValue]);

  const toastErrorMessage = useMemo(() => {
    return hasRegistrationError
      ? registrationError.translatedErrorCode.userAlreadyExists
        ? 'User with such email already exists!'
        : 'Unknown error.Please try again'
      : '';
  }, [registrationError, hasRegistrationError]);

  return (
    <Toast.Provider>
      <CommonToast
        message={toastErrorMessage}
        tone={COMMON_TOAST_TONE.ERROR}
        handleOpenChange={isToastActiveState.setValue}
        active={isToastActiveState.isActive && toastErrorMessage.length > 0}
      />
      <Toast.Viewport className={styles.toastViewport} />

      <div className={styles.root}>
        <div className={styles.row}>
          <div className={styles.formColumn}>
            <Form.Root className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <h1 className={styles.title}>Register</h1>
              <div className={styles.fields}>
                <TextField
                  semanticId='name'
                  register={register('name', SIGN_UP_FIELDS_CONFIG.name)}
                  type='text'
                  error={errors.name ? errors.name.message : ''}
                  label='Name'
                  placeholder='Name Surname'
                />
                <TextField
                  semanticId='email'
                  register={register('email', SIGN_UP_FIELDS_CONFIG.email)}
                  error={errors.email ? errors.email.message : ''}
                  label='Email'
                  type='email'
                  placeholder='example@mail.com'
                />

                <TextField
                  type={isPasswordVisibleState.isActive ? 'text' : 'password'}
                  semanticId='password'
                  suffix={
                    <div className={styles.passwordToggler} onClick={isPasswordVisibleState.toggle}>
                      {isPasswordVisibleState.isActive ? <EyeOpenIcon /> : <EyeNoneIcon />}
                    </div>
                  }
                  register={register('password', SIGN_UP_FIELDS_CONFIG.password)}
                  error={errors.password ? errors.password.message : ''}
                  label='Password'
                  placeholder='Create password'
                />
                <div className={styles.submit}>
                  <div className={styles.inlineQuestion}>
                    Already have an account?
                    <Button variant='plain' as='a' href={appRoutes.auth.login} text='Sign in!' />
                  </div>
                  <Button
                    loading={pendingRegistration}
                    variant='primary'
                    as='button'
                    text='Submit'
                    type='submit'
                  />
                </div>
              </div>
            </Form.Root>
          </div>

          <div className={styles.questionColumn}>
            <div className={styles.haveAccountQuestion}>
              Already have an account?{'  '}
              <Button
                variant='secondary'
                className={styles.signInButton}
                as='a'
                href={appRoutes.auth.login}
                text='Sign in'
              />
            </div>
          </div>
        </div>
      </div>
    </Toast.Provider>
  );
};
