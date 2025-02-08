import React, { useCallback, type FC, type ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import styles from './Modal.module.scss';
import { ModalActions, ModalSize } from './types';
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
  title?: string;
  children?: ReactNode;
  actions?: ModalActions;
};

export const Modal: FC<ModalProps> = ({
  children,
  open,
  title,
  size = 'medium',
  onClose,
  onOpen,
  actions,
}) => {
  const onOpenChange = useCallback(
    (value: boolean) => {
      if (value) {
        onOpen();
      } else {
        onClose();
      }
    },
    [onClose, onOpen]
  );

  return (
    <Dialog.Root onOpenChange={onOpenChange} open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content
          aria-describedby='modal'
          className={classNames(styles.content, MODAL_SIZES_CLASS_MAP[size])}
        >
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

          <Scrollable className={styles.inner}>{children}</Scrollable>

          {actions && (actions.primary || actions.secondary) && (
            <div className={styles.footer}>
              {actions.secondary && (
                <Button
                  size='small'
                  onClick={actions.secondary.onAction}
                  as='button'
                  variant='minor'
                  text={actions.secondary.text}
                />
              )}

              {actions.primary && (
                <Button
                  loading={actions.primary.loading}
                  size='small'
                  onClick={actions.primary.onAction}
                  as='button'
                  text={actions.primary.text}
                />
              )}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
