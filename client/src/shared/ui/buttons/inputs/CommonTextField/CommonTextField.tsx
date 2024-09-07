import { ReactNode, useRef } from 'react';
import styles from './CommonTextField.module.scss';
import { UseFormRegisterReturn } from 'react-hook-form';
import classNames from 'classnames';

type CommonTextFieldProps = {
  label: string;
  semanticId: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  type?: 'text' | 'password' | 'email';
  error?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
};

export const CommonTextField: React.FC<CommonTextFieldProps> = ({
  label,
  semanticId,
  placeholder,
  register,
  error,
  type = 'text',
  prefix,
  suffix,
}) => {
  const inputContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.root}>
      <label htmlFor={semanticId} className={styles.label}>
        {label}
      </label>

      <div
        onClick={() => {
          inputContainerRef.current?.querySelector('input')?.focus();
        }}
        ref={inputContainerRef}
        className={classNames(styles.inputContainer, { [styles.hasError]: error })}
      >
        {prefix ? <div>{prefix}</div> : null}
        <input autoFocus placeholder={placeholder} id={semanticId} type={type} {...register} />
        {suffix ? (
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {suffix}
          </div>
        ) : null}
      </div>

      <div className={styles.error}>{error}</div>
    </div>
  );
};
