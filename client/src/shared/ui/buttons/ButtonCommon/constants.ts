import { CommonButtonVariant } from './types';
import styles from './ButtonCommon.module.scss';

export const COMMON_BUTTON_VARIANTS_CLASSES_DEFINITIONS: Record<CommonButtonVariant, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  plain: styles.plain,
};
