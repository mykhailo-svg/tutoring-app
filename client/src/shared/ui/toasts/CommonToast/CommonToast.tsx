import * as Toast from '@radix-ui/react-toast';
import styles from './CommonToast.module.scss';
import classNames from 'classnames';
import { COMMON_TOAST_TONE } from './types';
import { COMMON_TOAST_TONE_CLASS_DEFINITIONS } from './constants';
import { Cross2Icon as CloseIcon, CrossCircledIcon } from '@radix-ui/react-icons';

type CommonToastProps = {
  active: boolean;
  tone?: COMMON_TOAST_TONE;
  message: string;
  handleOpenChange: (value: boolean) => void;
};

export const CommonToast: React.FC<CommonToastProps> = ({
  active,
  tone = COMMON_TOAST_TONE.INFO,
  handleOpenChange,
  message,
}) => {
  return (
    <Toast.Root
      onOpenChange={handleOpenChange}
      className={classNames(styles.root, COMMON_TOAST_TONE_CLASS_DEFINITIONS[tone])}
      open={active}
    >
      <div className={styles.inner}>
        <div className={styles.prefix}>
          <CrossCircledIcon />
        </div>

        <div className={styles.content}>
          <Toast.Title className={styles.title}>{message}</Toast.Title>
          <Toast.Description asChild>descr</Toast.Description>
        </div>

        <Toast.Close className={styles.close}>
          <CloseIcon />
        </Toast.Close>
      </div>
    </Toast.Root>
  );
};
