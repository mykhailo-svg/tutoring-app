import * as Toast from '@radix-ui/react-toast';
import styles from './CommonToast.module.scss';
import classNames from 'classnames';
import { COMMON_TOAST_TONE } from './types';
import { COMMON_TOAST_TONE_CLASS_DEFINITIONS } from './constants';
import { ReactNode } from 'react';
import { Cross2Icon as CloseIcon } from '@radix-ui/react-icons';

type CommonToastProps = {
  active: boolean;
  tone?: COMMON_TOAST_TONE;
  prefix?: ReactNode;
  handleOpenChange: (value: boolean) => void;
};

export const CommonToast: React.FC<CommonToastProps> = ({
  active,
  tone = COMMON_TOAST_TONE.INFO,
  prefix,
  handleOpenChange,
}) => {
  return (
    <Toast.Root
      onOpenChange={handleOpenChange}
      className={classNames(styles.root, COMMON_TOAST_TONE_CLASS_DEFINITIONS[tone])}
      open={active}
    >
      <div className={styles.inner}>
        {prefix ? <div className={styles.prefix}>{prefix}</div> : null}

        <div className={styles.content}>
          <Toast.Title className={styles.title}>Scheduled: Catch up</Toast.Title>
          <Toast.Description asChild>descr</Toast.Description>
        </div>

        <Toast.Close className={styles.close}>
          <CloseIcon />
        </Toast.Close>
      </div>
    </Toast.Root>
  );
};
