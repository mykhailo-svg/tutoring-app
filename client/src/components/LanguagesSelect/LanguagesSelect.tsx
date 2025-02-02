import { LANGUAGE_LEVEL } from '@/global_types';
import { type Dispatch, ReactNode, type SetStateAction, useCallback, useMemo } from 'react';
import styles from './LanguagesSelect.module.scss';
import { Button } from '@/shared/ui/buttons';
import { LanguagesSelectItem } from './ui';
import { AVAILABLE_LANGUAGE } from './ui/LanguagesList/constants';

export type ChangeLanguagesState = (
  mutation: (prevValue: LanguagesSelectState) => Partial<LanguagesSelectState>
) => void;

type LanguagesSelectProps = {
  state: LanguagesSelectState;
  setLanguages: Dispatch<SetStateAction<LanguagesSelectState>>;
};

type Languages = Record<string, LanguagesSelectLanguage | null>;

export type LanguagesSelectLanguage = { level: LANGUAGE_LEVEL | null | undefined };

export type LanguagesSelectState = {
  languages: Languages;
  unsavedLanguage: boolean;
};

export const LanguagesSelect: React.FC<LanguagesSelectProps> = ({ state, setLanguages }) => {
  const onLanguagesStateChange: ChangeLanguagesState = useCallback(
    (mutation) => {
      setLanguages((prevValue) => ({ ...prevValue, ...mutation(prevValue) }));
    },
    [setLanguages]
  );

  const handleAddLanguage = useCallback(() => {
    onLanguagesStateChange(() => ({ unsavedLanguage: true }));
  }, [onLanguagesStateChange]);

  const list = useMemo(() => {
    const elements: ReactNode[] = [];

    for (const languageKey in state.languages) {
      const language = state.languages[languageKey];

      elements.push(
        <LanguagesSelectItem
          languagesState={state.languages}
          language={{ id: languageKey as AVAILABLE_LANGUAGE, level: language?.level }}
          onLanguagesStateChange={onLanguagesStateChange}
        />
      );
    }

    return elements;
  }, [state.languages, onLanguagesStateChange]);

  return (
    <div className={styles.root}>
      <div className={styles.list}>
        {list}
        {state.unsavedLanguage && (
          <LanguagesSelectItem
            languagesState={state.languages}
            onLanguagesStateChange={onLanguagesStateChange}
            language={null}
          />
        )}
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
