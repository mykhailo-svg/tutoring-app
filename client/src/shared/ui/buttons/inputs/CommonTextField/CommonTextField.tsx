import { ChangeEvent, useState } from 'react';
import styles from './CommonTextField.module.scss';
import { UseFormRegisterReturn } from 'react-hook-form';
import { useToggle } from '@/shared/hooks/useToggle';

type CommonTextFieldProps = {
  label: string;
  semanticId: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: string;
};

export const CommonTextField: React.FC<CommonTextFieldProps> = ({
  label,
  semanticId,
  placeholder,
  register,
  error,
}) => {
  return (
    <div className={styles.root}>
      <label htmlFor={semanticId} className={styles.label}>
        {label}
      </label>

      <input
        placeholder={placeholder}
        id={semanticId}
        className={styles.input}
        type='text'
        {...register}
      />

      <div className={styles.error}>{error}</div>
    </div>
  );
};
