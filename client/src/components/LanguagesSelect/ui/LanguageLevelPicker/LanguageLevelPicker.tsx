import { LANGUAGE_LEVEL } from '@/global_types';
import { useMemo } from 'react';
import styles from './LanguageLevelPicker.module.scss';

type LanguageLevelPickerProps = {};

const AVAILABLE_LEVELS = Object.values(LANGUAGE_LEVEL);

export const LanguageLevelPicker: React.FC<LanguageLevelPickerProps> = () => {
  const elements = useMemo(() => AVAILABLE_LEVELS.map((level) => <div>{level}</div>), []);

  return <div className={styles.root}>{elements}</div>;
};
