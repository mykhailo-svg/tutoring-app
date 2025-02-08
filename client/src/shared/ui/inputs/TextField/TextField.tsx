import { ChangeEvent, ReactNode, useCallback, useMemo, useRef } from 'react';
import styles from './TextField.module.scss';
import { UseFormRegisterReturn } from 'react-hook-form';
import classNames from 'classnames';

export type TextFieldSize = 'huge' | 'medium' | 'small';

type TextFieldProps = {
  label: string;
  semanticId?: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  type?: 'text' | 'password' | 'email';
  error?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  size?: TextFieldSize;
  value?: string;
  onChange?: (value: string) => void;
};

const SIZE_CLASS_NAME_MAP: Record<TextFieldSize, string> = {
  huge: styles.huge,
  small: styles.small,
  medium: styles.medium,
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
  size = 'medium',
  value,
  onChange,
}) => {
  const inputContainerRef = useRef<HTMLDivElement>(null);

  const rootClassName = useMemo(() => classNames(styles.root, SIZE_CLASS_NAME_MAP[size]), [size]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (typeof onChange === 'function') {
        onChange(event.target.value);
      }
    },
    [onChange]
  );

  return (
    <div className={rootClassName}>
      {label && (
        <label htmlFor={semanticId} className={styles.label}>
          {label}
        </label>
      )}

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
            value={value}
            onChange={handleChange}
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

      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};
