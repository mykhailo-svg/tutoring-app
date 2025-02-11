'use client';
import * as Form from '@radix-ui/react-form';
import { useUserRegister } from './hooks/useUserRegister';
import styles from './RegisterPage.module.scss';
import { RegisterPageFields } from './types';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useCallback, useEffect, useLayoutEffect, useMemo } from 'react';
import { APP_ROUTES } from '@/shared/constants/routes';
import { Button } from '@/shared/ui/buttons';
import * as Toast from '@radix-ui/react-toast';
import { useToggle } from '@/shared/hooks/useToggle';
import { CommonToast } from '@/shared/ui/toasts';
import { COMMON_TOAST_TONE } from '@/shared/ui/toasts/CommonToast/types';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { MultiStepsFormStep, useMultiStepForm } from '@/shared/hooks';
import { RegisterPageCredentialsForm, RegisterPageRolesPickerStep } from './ui/steps';
import { USER_ROLE } from '@/global_types';

type RegisterPageProps = {};

export const RegisterPage: React.FC<RegisterPageProps> = () => {
  const router = useRouter();

  const {
    data: { user },
    setAuthState,
  } = useAuth();

  const {
    registerRequest,
    isError: hasRegistrationError,
    error: registrationError,
    isLoading: pendingRegistration,
    data: registrationResponse,
  } = useUserRegister();

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterPageFields>({ defaultValues: { role: USER_ROLE.STUDENT } });

  const onSubmit: SubmitHandler<RegisterPageFields> = useCallback(
    (data) => {
      registerRequest(data);
    },
    [registerRequest]
  );

  // useLayoutEffect(() => {
  //   if (user) {
  //     router.push(APP_ROUTES.home);
  //   }
  // }, [user]);

  useEffect(() => {
    if (registrationResponse && registrationResponse.data.user) {
      setAuthState(() => ({ user: registrationResponse.data.user }));
      router.push(APP_ROUTES.home);
    }
  }, [registrationResponse]);

  const { setValue: toastActiveSetValue, isActive: isToastActive } = useToggle(true);

  useEffect(() => {
    toastActiveSetValue(hasRegistrationError);
  }, [hasRegistrationError, toastActiveSetValue]);

  const toastErrorMessage = useMemo(() => {
    return hasRegistrationError
      ? registrationError.translatedErrorCode.userAlreadyExists
        ? 'User with such email already exists!'
        : 'Unknown error.Please try again'
      : '';
  }, [registrationError, hasRegistrationError]);

  const [role] = watch(['role']);

  const steps = useMemo<MultiStepsFormStep[]>(() => {
    return [
      {
        content: <RegisterPageRolesPickerStep role={role} setFormState={setValue} />,
      },
      {
        content: <RegisterPageCredentialsForm hookFormRegister={register} errors={errors} />,
      },
    ];
  }, [register, setValue, errors, role]);

  const multiStepForm = useMultiStepForm(steps);


  
  return (
    <Toast.Provider>
      <CommonToast
        message={toastErrorMessage}
        tone={COMMON_TOAST_TONE.ERROR}
        handleOpenChange={toastActiveSetValue}
        active={isToastActive && toastErrorMessage.length > 0}
      />
      <Toast.Viewport className={styles.toastViewport} />

      <div className={styles.root}>
        <div className={styles.row}>
          <div className={styles.formColumn}>
            <Form.Root className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <h1 className={styles.title}>Register</h1>

              <div className={styles.fields}>
                <div className={styles.step}> {multiStepForm.activeStep.content}</div>
                <div className={styles.submit}>
                  <div className={styles.inlineQuestion}>
                    Already have an account?
                    <Button variant='plain' as='a' href={APP_ROUTES.auth.login} text='Sign in!' />
                  </div>

                  <div className={styles.buttonsRow}>
                    <Button
                      className={styles.previousStepButton}
                      variant='secondary'
                      as='button'
                      onClick={multiStepForm.goToPrevious}
                      disabled={!multiStepForm.hasPrevious}
                      text='Previous'
                      type='button'
                    />
                    <Button
                      loading={pendingRegistration}
                      variant='primary'
                      as='button'
                      onClick={(e) => {
                        if (multiStepForm.hasNext) {
                          e.preventDefault();
                          multiStepForm.goToNext();
                        }
                      }}
                      text={!multiStepForm.hasNext ? 'Submit' : 'Next'}
                      type={'submit'}
                    />
                  </div>
                </div>
              </div>
            </Form.Root>
          </div>

          <div className={styles.questionColumn}>
            <div className={styles.haveAccountQuestion}>
              Already have an account?
              <Button
                variant='secondary'
                className={styles.signInButton}
                as='a'
                href={APP_ROUTES.auth.login}
                text='Sign in'
              />
            </div>
          </div>
        </div>
      </div>
    </Toast.Provider>
  );
};
