'use client';
import * as Form from '@radix-ui/react-form';
import styles from './LoginPage.module.scss';

export const LoginPage = () => {
  console.log(process.env.NEXT_PUBLIC_API_URL);

  return (
    <>
      <div className={styles.formColumn}>
        <Form.Root className={styles.form}>
          <Form.Field name='name'>
            <Form.Label className='FormLabel'>Email</Form.Label>
            <Form.Control asChild>
              <input className='Input' type='email' required />
            </Form.Control>
          </Form.Field>
        </Form.Root>
      </div>
      <div className={styles.questionColumn}> sign</div>
    </>
  );
};
