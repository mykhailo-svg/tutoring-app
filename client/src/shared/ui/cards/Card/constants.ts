import styles from './Card.module.scss';
import type { CardShadow } from './types';

export const CARD_SHADOW_CLASS_MAP: Record<CardShadow, string> = {
  medium: styles.normalShadow,
  none: styles.noShadow,
};
