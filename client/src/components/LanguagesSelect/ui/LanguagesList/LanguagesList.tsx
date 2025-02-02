import { useMemo, useState } from 'react';
import { AVAILABLE_LANGUAGE, AVAILABLE_LANGUAGES_LIST, LANGUAGE_TRANSLATIONS } from './constants';
import { Scrollable } from '@/shared/ui/scrollable/Scrollable';
import styles from './LanguagesList.module.scss';
import { OptionList, OptionsListItem } from '@/shared/ui/lists';
import { TextField } from '@/shared/ui/inputs';
import { LanguagesSelectState } from '../../LanguagesSelect';

type LanguagesListProps = {
  language: AVAILABLE_LANGUAGE | undefined;
  currentLanguagesState: LanguagesSelectState['languages'];
  onSelect: (lang: AVAILABLE_LANGUAGE) => void;
};

export const LanguagesList: React.FC<LanguagesListProps> = ({
  language: currentLang,
  onSelect,
  currentLanguagesState,
}) => {
  const [query, setQuery] = useState('');

  const options = useMemo<OptionsListItem[]>(() => {
    const languages = AVAILABLE_LANGUAGES_LIST.map((language) => ({
      label: LANGUAGE_TRANSLATIONS[language.value],
      value: language.value,
    }));

    return languages.filter((language) => {
      const matchesQuery = !query || language.label.toLowerCase().indexOf(query.toLowerCase()) > -1;

      const notDuplicated = !currentLanguagesState[language.value];

      return matchesQuery && notDuplicated;
    });
  }, [query, currentLanguagesState]);

  return (
    <div>
      <div className={styles.search}>
        <TextField
          placeholder='Search for language...'
          value={query}
          onChange={setQuery}
          size='small'
          label=''
        />
      </div>
      <Scrollable className={styles.list}>
        <OptionList
          selected={currentLang}
          onSelect={onSelect as (lang: string) => void}
          options={options}
        />
      </Scrollable>
    </div>
  );
};
