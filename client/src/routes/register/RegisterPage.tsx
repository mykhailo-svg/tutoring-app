'use client';
import { AuthRow } from '@/components/AuthRow';
import * as Form from '@radix-ui/react-form';
import { useUserRegister } from './hooks/useUserRegister';
import styles from "./RegisterPage.module.scss"

type RegisterPageProps = {};

export const RegisterPage: React.FC<RegisterPageProps> = () => {
  const { registerUser } = useUserRegister();

  return (
    <AuthRow
      firstColumnContent={
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
      }
      secondColumnContent={<div className={styles.questionColumn}> sign</div>}
    />
  );
};
