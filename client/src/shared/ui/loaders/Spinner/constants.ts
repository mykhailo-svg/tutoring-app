import { SpinnerSize } from './types';
import styles from './Spinner.module.scss';

export const SPINNER_SIZE_CLASSES_DEFINITION: Record<SpinnerSize, string> = {
  small: styles.small,
  large: styles.large,
};
