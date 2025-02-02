import type { ButtonDisclosure, CommonButtonSize, CommonButtonVariant } from './types';
import styles from './Button.module.scss';
import { ReactNode } from 'react';
import { FaAngleDown as DisclosureDownIcon } from 'react-icons/fa6';

export const COMMON_BUTTON_VARIANTS_CLASSES_DEFINITIONS: Record<CommonButtonVariant, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  plain: styles.plain,
  minor: styles.minor,
};

export const COMMON_BUTTON_SIZE_CLASS_MAP: Record<CommonButtonSize, string> = {
  large: styles.large,
  medium: styles.medium,
  small: styles.small,
};

export const BUTTON_DISCLOSURES: Record<ButtonDisclosure, ReactNode> = {
  down: <DisclosureDownIcon />,
};
