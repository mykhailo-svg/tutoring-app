import { Button } from '@/shared/ui/buttons';
import styles from './LanguagesSelectItem.module.scss';
import { Popover } from '@/shared/ui/popovers';
import { LanguagesList } from '../LanguagesList';
import { LanguageLevelPicker } from '../LanguageLevelPicker';
import classNames from 'classnames';
import { MdDelete as DeleteIcon } from 'react-icons/md';
import {
  ChangeLanguagesState,
  LanguagesSelectLanguage,
  LanguagesSelectState,
} from '../../LanguagesSelect';
import { useCallback } from 'react';
import { AVAILABLE_LANGUAGE, LANGUAGE_TRANSLATIONS } from '../LanguagesList/constants';
import { LANGUAGE_LEVEL } from '@/global_types';

type LanguagesSelectItemProps = {
  language: (LanguagesSelectLanguage & { id: AVAILABLE_LANGUAGE }) | null;
  languagesState: LanguagesSelectState['languages'];
  onLanguagesStateChange: ChangeLanguagesState;
};

export const LanguagesSelectItem: React.FC<LanguagesSelectItemProps> = ({
  onLanguagesStateChange,
  language,
  languagesState,
}) => {
  const handleLanguageChange = useCallback(
    (lang: AVAILABLE_LANGUAGE) => {
      onLanguagesStateChange((prevValue) => ({
        languages: { ...prevValue.languages, [lang]: { level: LANGUAGE_LEVEL.A1 } },
        ...(!language ? { unsavedLanguage: false } : {}),
      }));
    },
    [onLanguagesStateChange, language]
  );

  const handleLanguageLevelChange = useCallback(
    (level: LANGUAGE_LEVEL) => {
      if (language?.id) {
        onLanguagesStateChange((prevValue) => ({
          languages: {
            ...prevValue.languages,
            [language.id]: { ...prevValue.languages[language.id], level: level },
          },
        }));
      }
    },
    [onLanguagesStateChange, language?.id]
  );

  const handleDelete = useCallback(() => {
    if (language?.id) {
      onLanguagesStateChange((prevValue) => {
        const prevLanguages = { ...prevValue.languages };

        delete prevLanguages[language.id];

        return { languages: prevLanguages };
      });
    }
  }, [language?.id]);

  return (
    <div className={styles.root}>
      <Popover
        activator={
          <Button
            as='button'
            variant='secondary'
            size='small'
            text={language?.id ? LANGUAGE_TRANSLATIONS[language?.id] : 'Select'}
          />
        }
      >
        <LanguagesList
          currentLanguagesState={languagesState}
          onSelect={handleLanguageChange}
          language={language?.id}
        />
      </Popover>

      <Popover
        activator={
          <Button
            disabled={!language}
            as='button'
            variant='secondary'
            size='small'
            text={language?.level ?? 'Select'}
          />
        }
      >
        <LanguageLevelPicker onSelect={handleLanguageLevelChange} selectedLevel={language?.level} />
      </Popover>

      <div className={classNames(styles.remove, { [styles.disabledRemove]: !language })}>
        <Button onClick={handleDelete} size='small' as='button' icon={<DeleteIcon />} />
      </div>
    </div>
  );
};
