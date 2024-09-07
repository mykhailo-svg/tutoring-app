import styles from './CommonToast.module.scss';
import { COMMON_TOAST_TONE } from './types';

export const COMMON_TOAST_TONE_CLASS_DEFINITIONS: Record<COMMON_TOAST_TONE, string> = {
  [COMMON_TOAST_TONE.ERROR]: styles.error,
  [COMMON_TOAST_TONE.INFO]: styles.info,
  [COMMON_TOAST_TONE.SUCCESS]: styles.success,
};
