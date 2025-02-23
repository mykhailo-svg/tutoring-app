import React, { type FC, type ReactNode } from 'react';
import * as RadixPopover from '@radix-ui/react-popover';
import styles from './Popover.module.scss';

type PopoverProps = { activator: ReactNode; children: ReactNode };

export const Popover: FC<PopoverProps> = ({ activator, children }) => (
  <RadixPopover.Root>
    <RadixPopover.Trigger asChild>{activator}</RadixPopover.Trigger>

    <RadixPopover.Portal>
      <RadixPopover.Content style={{ width: 'var(--radix-popover-trigger-width)' }} className={styles.content} sideOffset={5}>
        <div>{children}</div>

        <RadixPopover.Arrow className={styles.arrow} />
      </RadixPopover.Content>
    </RadixPopover.Portal>
  </RadixPopover.Root>
);
