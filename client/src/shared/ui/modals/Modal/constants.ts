import type { ModalSize } from './types';
import styles from './Modal.module.scss';

export const MODAL_SIZES_CLASS_MAP: Record<ModalSize, string> = {
  small: styles.small,
  large: styles.large,
  medium: styles.medium,
};
