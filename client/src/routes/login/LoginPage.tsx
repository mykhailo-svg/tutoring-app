'use client';
import * as Form from '@radix-ui/react-form';
import styles from './LoginPage.module.scss';
import { Button } from '@/shared/ui/buttons';
import { appRoutes } from '@/shared/constants/routes';
import { TextField } from '@/shared/ui/inputs';

export const LoginPage = () => {
  return (
    <div className={styles.row}>
      <div className={styles.questionColumn}>
        <h2>Want to create an account?</h2>
        <Button as='a' variant='secondary' text='Sign up' href={appRoutes.auth.register} />
      </div>
      <div className={styles.formColumn}>
        <h1>Log in</h1>

        <Form.Root className={styles.form}>
          <TextField semanticId='email' label='Email' placeholder='example@mail.com' />
          <TextField semanticId='password' label='Password' placeholder='Your password' />

          <Button text='Submit' variant='primary' as='button' type='submit' />
        </Form.Root>
      </div>
    </div>
  );
};
