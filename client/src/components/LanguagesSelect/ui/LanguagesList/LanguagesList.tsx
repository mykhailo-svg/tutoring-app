import { useMemo } from 'react';
import { AVAILABLE_LANGUAGES_LIST } from './constants';
import { Scrollable } from '@/shared/ui/scrollable/Scrollable';
import styles from './LanguagesList.module.scss';

type LanguagesListProps = {};

export const LanguagesList: React.FC<LanguagesListProps> = () => {
  const elements = useMemo(
    () => AVAILABLE_LANGUAGES_LIST.map((language) => <div>{language.name}</div>),
    []
  );

  return <Scrollable className={styles.list}>{elements}</Scrollable>;
};
