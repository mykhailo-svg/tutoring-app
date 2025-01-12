import React, { type FC, type ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import styles from './Modal.module.scss';
import { ModalSize } from './types';
import classNames from 'classnames';
import { MODAL_SIZES_CLASS_MAP } from './constants';
import { AiOutlineClose as CloseIcon } from 'react-icons/ai';
import { Button } from '../../buttons';
import { Scrollable } from '../../scrollable/Scrollable';

type ModalProps = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  size?: ModalSize;
  title: string;
  children?: ReactNode;
};

export const Modal: FC<ModalProps> = ({
  children,
  open,
  title,
  size = 'medium',
  onClose,
  onOpen,
}) => (
  <Dialog.Root
    onOpenChange={(value) => {
      if (value) {
        onOpen();
      } else {
        onClose();
      }
    }}
    open={open}
  >
    <Dialog.Portal>
      <Dialog.Overlay className={styles.overlay} />
      <Dialog.Content className={classNames(styles.content, MODAL_SIZES_CLASS_MAP[size])}>
        <div className={styles.header}>
          <Dialog.Title className={styles.title}>{title}</Dialog.Title>
          <Button
            onClick={onClose}
            variant='minor'
            className={styles.close}
            icon={<CloseIcon />}
            size='medium'
            text=''
            as='button'
          >
            <CloseIcon />
          </Button>
        </div>

        <Scrollable>{children}</Scrollable>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
