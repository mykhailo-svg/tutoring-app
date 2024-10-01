import { ReactNode, useRef } from 'react';
import styles from './TextField.module.scss';
import { UseFormRegisterReturn } from 'react-hook-form';
import classNames from 'classnames';

type TextFieldProps = {
  label: string;
  semanticId?: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  type?: 'text' | 'password' | 'email';
  error?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
};

export const TextField: React.FC<TextFieldProps> = ({
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
        <div className={styles.inputOverflow}>
          <input
            className={styles.input}
            autoFocus
            placeholder={placeholder}
            id={semanticId}
            type={type}
            {...register}
          />
        </div>
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
