import { SIGN_UP_FIELDS_CONFIG } from '@/routes/register/constants';
import { RegisterPageFields } from '@/routes/register/types';
import { useToggle } from '@/shared/hooks';
import { TextField } from '@/shared/ui/inputs';
import { EyeOpenIcon, EyeNoneIcon } from '@radix-ui/react-icons';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import styles from './RegisterPageCredentialsForm.module.scss';

type RegisterPageCredentialsFormProps = {
  hookFormRegister: UseFormRegister<RegisterPageFields>;
  errors: FieldErrors<RegisterPageFields>;
};

export const RegisterPageCredentialsForm: React.FC<RegisterPageCredentialsFormProps> = ({
  hookFormRegister: register,
  errors,
}) => {
  const isPasswordVisibleState = useToggle(false);

  return (
    <>
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
    </>
  );
};
