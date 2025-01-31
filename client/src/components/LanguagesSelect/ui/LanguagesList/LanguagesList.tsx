import { useMemo, useState } from 'react';
import { AVAILABLE_LANGUAGES_LIST, LANGUAGE_TRANSLATIONS } from './constants';
import { Scrollable } from '@/shared/ui/scrollable/Scrollable';
import styles from './LanguagesList.module.scss';
import { OptionList, OptionsListItem } from '@/shared/ui/lists';
import { TextField } from '@/shared/ui/inputs';

type LanguagesListProps = {};

export const LanguagesList: React.FC<LanguagesListProps> = () => {
  const [query, setQuery] = useState('');

  const options = useMemo<OptionsListItem[]>(() => {
    const languages = AVAILABLE_LANGUAGES_LIST.map((language) => ({
      label: LANGUAGE_TRANSLATIONS[language.value],
      value: language.value,
    }));

    if (query) {
      return languages.filter(
        (language) => language.label.toLowerCase().indexOf(query.toLowerCase()) > -1
      );
    } else {
      return languages;
    }
  }, [query]);

  const [language, setLanguage] = useState<string>('');

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
        <OptionList selected={language} onSelect={setLanguage} options={options} />
      </Scrollable>
    </div>
  );
};
