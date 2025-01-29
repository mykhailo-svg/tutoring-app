import { LANGUAGE_LEVEL } from '@/global_types';
import { type Dispatch, type SetStateAction, useCallback, useMemo } from 'react';
import styles from './LanguagesSelect.module.scss';
import { Button } from '@/shared/ui/buttons';
import { LanguagesSelectItem } from './ui';

type LanguagesSelectProps = {
  state: LanguagesSelectState;
  setLanguages: Dispatch<SetStateAction<LanguagesSelectState>>;
};

type Languages = Record<string, { level: LANGUAGE_LEVEL } | null>;

export type LanguagesSelectState = {
  languages: Languages;
  unsavedLanguage: boolean;
};

export const LanguagesSelect: React.FC<LanguagesSelectProps> = ({ state, setLanguages }) => {
  const onLanguagesStateChange = useCallback(
    (mutation: (prevValue: LanguagesSelectState) => Partial<LanguagesSelectState>) => {
      setLanguages((prevValue) => ({ ...prevValue, ...mutation(prevValue) }));
    },
    [setLanguages]
  );

  const handleAddLanguage = useCallback(() => {
    onLanguagesStateChange(() => ({ unsavedLanguage: true }));
  }, [onLanguagesStateChange]);

  const list = useMemo(() => {
    return <></>;
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.list}>
        {list}
        {state.unsavedLanguage && <LanguagesSelectItem language={null} />}
      </div>

      <div>
        <Button
          disabled={state.unsavedLanguage}
          size='small'
          onClick={handleAddLanguage}
          variant='minor'
          as='button'
          text='Add language'
        />
      </div>
    </div>
  );
};
